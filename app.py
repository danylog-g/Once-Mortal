from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any, Union
from bson import ObjectId
from dotenv import load_dotenv
import os

app = FastAPI()

# Allow LAN access from typical dev devices. Tighten for production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change to ["http://192.168.1.x:port"] for security
    allow_methods=["*"],
    allow_headers=["*"],
)
# Mongo client (async)
load_dotenv()  # optional .env for MONGODB_URI
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
mongo = AsyncIOMotorClient(MONGO_URI)
db = mongo["dnd"]
cyber_collection = db["cybernetics"]
compendia = db["compendia"]
gun_collection = db["guns"]
# Helper for MongoDB ObjectId
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")
# # # # # # # # # #
# # Dumb Models # #
# # # # # # # # # #
class Age(BaseModel):
    max: Optional[int] = None
    maturity: Optional[int] = None
    description: Optional[str] = None
class Senses(BaseModel):
    darkvision: Optional[int] = None
    blindsight: Optional[int] = None
    tremorsense: Optional[int] = None
    truesight: Optional[int] = None
class Size(BaseModel):
    type: str
    name: str
    entries: List[str]
class Speed(BaseModel):
    walk: Optional[int] = None
    fly: Optional[Union[bool, int]] = None
    swim: Optional[int] = None
    climb: Optional[int] = None
class Trait(BaseModel):
    name: str
    description: str
class SubclassFeature(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: str
    level: int
    source: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class Subclass(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    short_name: str
    source: str
    page: Optional[int] = None
    description: Optional[str] = None
    features: List[SubclassFeature] = []
    additional_spells: Optional[Dict[str, Any]] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class ClassFeature(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: str
    level: int
    source: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class ClassLevel(BaseModel):
    level: int
    cantrips_known: int
    spells_known: int
    spell_slots: List[int]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class AbilityChoice(BaseModel):
    choose: Dict[str, Any]
class Feat(BaseModel):
    name: str
    source: str
class SkillProficiency(BaseModel):
    skills: List[str]
class ToolProficiency(BaseModel):
    tools: List[str]
class Prerequisite(BaseModel):
    other: Optional[str] = None
class AbilityIncrease(BaseModel):
    con: Optional[int] = None
    str: Optional[int] = None
    dex: Optional[int] = None
    int: Optional[int] = None
    wis: Optional[int] = None
    cha: Optional[int] = None
class SpellChoice(BaseModel):
    choose: str
class InnateSpells(BaseModel):
    rest: Dict[str, List[SpellChoice]]
class AdditionalSpells(BaseModel):
    ability: str
    innate: Dict[str, InnateSpells]
    known: Dict[str, List[SpellChoice]]
class TableRow(BaseModel):
    cells: List[Any]
class Table(BaseModel):
    type: str = "table"
    caption: str
    colLabels: List[str]
    colStyles: List[str]
    rows: List[TableRow]
class ListItem(BaseModel):
    type: str = "list"
    items: List[str]
class Section(BaseModel):
    type: str = "section"
    entries: List[Dict[str, Any]]
class Entry(BaseModel):
    type: str
    name: Optional[str] = None
    entries: Optional[List[Any]] = None
# # # # # # # # # #
# # Cybernetics # #
# # # # # # # # # #
class CyberBuild(BaseModel):
    type: str
    name: str
    timestamp: str
    config: dict
    installedCybernetics: list
    effects: list
# POST endpoint to save a cybernetics build
@app.post("/api/cybernetics")
async def save_cybernetics(build: CyberBuild):
    existing = await cyber_collection.find_one({"name": build.name})
    if existing:
        await cyber_collection.replace_one({"_id": existing["_id"]}, build.dict())
        build_id = str(existing["_id"])
    else:
        result = await cyber_collection.insert_one(build.dict())
        build_id = str(result.inserted_id)
    return {"status": "success", "_id": build_id}
# GET endpoint to list all builds
@app.get("/api/cybernetics", response_model=List[CyberBuild])
async def get_all_cybernetics():
    builds = []
    async for build in cyber_collection.find():
        builds.append(CyberBuild(**build))
    return builds
# GET endpoint to fetch a specific build by name
@app.get("/api/cybernetics/{name}", response_model=CyberBuild)
async def get_cybernetics(name: str):
    build = await cyber_collection.find_one({"name": name})
    if not build:
        raise HTTPException(status_code=404, detail="Build not found")
    return CyberBuild(**build)
# DELETE endpoint for cybernetics
@app.delete("/api/cybernetics/{name}")
async def delete_cybernetics(name: str):
    result = await cyber_collection.delete_one({"name": name})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cybernetics build not found")
    return {"status": "success"}
# # # # # # # # # #
# #  Gun Build  # #
# # # # # # # # # #
class GunBuild(BaseModel):
    type: str
    name: str
    timestamp: str
    config: dict
    stats: dict
# POST endpoint to save a gun build
@app.post("/api/guns")
async def save_gun(build: GunBuild):
    existing = await gun_collection.find_one({"name": build.name})
    if existing:
        await gun_collection.replace_one({"_id": existing["_id"]}, build.dict())
        build_id = str(existing["_id"])
    else:
        result = await gun_collection.insert_one(build.dict())
        build_id = str(result.inserted_id)
    return {"status": "success", "_id": build_id}
# GET endpoint to list all gun builds
@app.get("/api/guns", response_model=List[GunBuild])
async def get_all_guns():
    builds = []
    async for build in gun_collection.find():
        builds.append(GunBuild(**build))
    return builds
# GET endpoint to fetch a specific gun build by name
@app.get("/api/guns/{name}", response_model=GunBuild)
async def get_gun(name: str):
    build = await gun_collection.find_one({"name": name})
    if not build:
        raise HTTPException(status_code=404, detail="Gun build not found")
    return GunBuild(**build)
# DELETE endpoint for guns
@app.delete("/api/guns/{name}")
async def delete_gun(name: str):
    result = await gun_collection.delete_one({"name": name})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gun not found")
    return {"status": "success"}
# # # # # # # # # #
# # #  Races  # # #
# # # # # # # # # #
class Race(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    source: str
    size: str
    speed: Union[int, Speed]
    ability_score_increases: Optional[Dict[str, int]] = None
    age: Optional[Age] = None
    senses: Optional[Senses] = None
    resistances: Optional[List[str]] = None
    proficiencies: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    traits: List[Trait]
    spells: Optional[List[Dict[str, Any]]] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
# Transform raw race data from database to simplified model
def transform_race_data(db_race: Dict) -> Race:
    """Transform raw race data from database to simplified model"""
    raw = db_race.get("raw", {})
    # get traits from entries
    traits = []
    for entry in raw.get("entries", []):
        if entry.get("type") == "entries" and "name" in entry:
            description = " ".join([
                e for e in entry.get("entries", []) 
                if isinstance(e, str)
            ])
            traits.append(Trait(name=entry["name"], description=description))
    # get size as string (take first element from array)
    size = raw.get("size", ["M"])[0] if raw.get("size") else "M"
    # get speed
    speed_data = raw.get("speed", {})
    if isinstance(speed_data, dict):
        speed = Speed(**speed_data)
    else:
        speed = speed_data  # assuming int
    # get age information
    age_data = {}
    if "age" in raw:
        if isinstance(raw["age"], dict):
            age_data = raw["age"]
        # might need more logic here based on how age is represented
    # get senses
    senses_data = {}
    if "darkvision" in raw: # will optimize
        senses_data["darkvision"] = raw["darkvision"]
    if "blindsight" in raw:
        senses_data["blindsight"] = raw["blindsight"]
    if "tremorsense" in raw:
        senses_data["tremorsense"] = raw["tremorsense"]
    if "truesight" in raw:
        senses_data["truesight"] = raw["truesight"]
    # return race obj
    return Race(
        _id=db_race["_id"],
        name=raw.get("name", ""),
        source=raw.get("source", ""),
        size=size,
        speed=speed,
        age=Age(**age_data) if age_data else None,
        senses=Senses(**senses_data) if senses_data else None,
        resistances=raw.get("resist", []),
        proficiencies=raw.get("skillProficiencies", []),
        languages=[],  # Would need to extract from raw data
        traits=traits,
        spells=raw.get("additionalSpells", [])
    )
# GET endpoint to list all races
@app.get("/api/races", response_model=List[Race])
async def get_races(
    skip: int = 0,
    limit: int = 1000,
    name: Optional[str] = None,
    source: Optional[str] = None
):
    query = {"key": "races"}
    
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query["raw.source"] = {"$regex": source, "$options": "i"}
    
    races_cursor = compendia.find(query).skip(skip).limit(limit)
    races = []
    
    async for race in races_cursor:
        races.append(transform_race_data(race))
    
    return races
# GET endpoint to get specific race from id
@app.get("/api/races/{race_id}", response_model=Race)
async def get_race(race_id: str):
    if not ObjectId.is_valid(race_id):
        raise HTTPException(status_code=400, detail="Invalid race ID")
    
    race = await compendia.find_one({"_id": ObjectId(race_id), "key": "races"})
    if not race:
        raise HTTPException(status_code=404, detail="Race not found")
    
    return transform_race_data(race)
# # # # # # # # # #
# # # Classes # # #
# # # # # # # # # #
class DnDClass(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    source: str
    hit_dice: str
    primary_ability: List[str]
    proficiencies: List[str]
    saving_throws: List[str]
    spellcasting_ability: Optional[str] = None
    levels: List[ClassLevel]
    features: List[ClassFeature]
    subclasses: List[Subclass]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
# GET endpoint to list all classes
@app.get("/api/classes", response_model=List[DnDClass])
async def get_classes(
    skip: int = 0,
    limit: int = 1000,
    name: Optional[str] = None,
    source: Optional[str] = None
):
    query = {"key": "class"}
    
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query["raw.source"] = {"$regex": source, "$options": "i"}
    
    classes_cursor = compendia.find(query).skip(skip).limit(limit)
    classes = []
    
    async for classez in classes_cursor:
        classes.append(classez)
    
    return classes
# GET endpoint to fetch class from id
@app.get("/api/classes/{class_id}", response_model=DnDClass)
async def get_class(class_id: str):
    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")
    
    classes = await compendia.find_one({"_id": ObjectId(class_id), "key": "class"})
    if not classes:
        raise HTTPException(status_code=404, detail="Class not found")
    
    return classes
# GET endpoint to list all subclasses from class id
@app.get("/api/classes/{class_id}/subclasses", response_model=List[Subclass])
async def get_classes_subclasses(
    skip: int = 0,
    limit: int = 1000,
    name: Optional[str] = None,
    source: Optional[str] = None
):
    query = {"key": "class"}
    
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query["raw.source"] = {"$regex": source, "$options": "i"}
    
    classes_cursor = compendia.find(query).skip(skip).limit(limit)
    subclasses = []
    
    async for classez in classes_cursor:
        subclasses.append(classez.normalized.subclasses)
    
    return subclasses
# GET endpoint to get subclass from class and subclass id
@app.get("/api/classes/{class_id}/subclasses/{subclass_id}", response_model=Subclass)
async def get_subclass(class_id: PyObjectId, subclass_id: str):
    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")
    
    classes = await compendia.find_one({"_id": ObjectId(class_id), "key": "class"})
    if not classes:
        raise HTTPException(status_code=404, detail="Class not found")
    
    if "normalized" not in classes or "subclasses" not in classes["normalized"]:
        raise HTTPException(status_code=404, detail="No subclasses found for this class")
    
    subclass = next(
        (sub for sub in classes["normalized"]["subclasses"] if sub["id"] == subclass_id),
        None
    )
    
    if not subclass:
        raise HTTPException(status_code=404, detail="Subclass not found")
    
    return subclass
# GET endpoint to list all features from class id
@app.get("/api/classes/{class_id}/features", response_model=List[ClassFeature])
async def get_class_features(class_id: PyObjectId):
    class_obj = await DnDClass.get(class_id)
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    return class_obj.features
# GET endpoint to list all features from a level and class id
@app.get("/api/classes/{class_id}/features/{level}", response_model=List[ClassFeature])
async def get_class_features_by_level(class_id: PyObjectId, level: int):
    class_obj = await DnDClass.get(class_id)
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    
    return [feature for feature in class_obj.features if feature.level == level]
# # # # # # # # # #
# # Backgrounds # #
# # # # # # # # # #
class BackgroundEntry(BaseModel):
    type: str
    name: Optional[str] = None
    entry: Optional[str] = None
class Background(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    background_id: str = Field(alias="id")
    file: str
    name: str
    source: str
    ability: List[AbilityChoice]
    feats: List[Feat]
    skillProficiencies: List[SkillProficiency]
    toolProficiencies: List[ToolProficiency]
    entries: List[BackgroundEntry]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class BackgroundResponse(BaseModel):
    id: str
    name: str
    source: str
    ability: List[Dict[str, Any]]
    feats: List[str]
    skill_proficiencies: List[str]
    tool_proficiencies: List[str]
    description: str

    class Config:
        allow_population_by_field_name = True
def transform_background(background: Dict) -> Dict:
    return {
        "id": background["id"],
        "name": background["name"],
        "source": background["source"],
        "ability": background["raw"]["ability"],
        "feats": [list(feat.keys())[0] for feat in background["raw"]["feats"]],
        "skill_proficiencies": list(background["raw"]["skillProficiencies"][0].keys()),
        "tool_proficiencies": list(background["raw"]["toolProficiencies"][0].keys()),
        "description": background["normalized"]["description"]
    }
# GET endpoint to list all backgrounds
@app.get("/api/backgrounds", response_model=List[Background])
async def get_bg(
    skip: int = 0,
    limit: int = 1000,
    name: Optional[str] = None,
    source: Optional[str] = None
):
    query = {"key": "backgrounds"}
    
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query["raw.source"] = {"$regex": source, "$options": "i"}
    
    bg_cursor = compendia.find(query).skip(skip).limit(limit)
    bg = []
    
    async for background in bg_cursor:
        bg.append(transform_background(background))
    
    return bg
# GET endpoint to get specific background from id
@app.get("/api/backgrounds/{bg_id}", response_model=Background)
async def get_bg(bg_id: str):
    if not ObjectId.is_valid(bg_id):
        raise HTTPException(status_code=400, detail="Invalid background ID")
    
    bg = await compendia.find_one({"_id": ObjectId(bg_id), "key": "backgrounds"})
    if not bg:
        raise HTTPException(status_code=404, detail="Background not found")
    
    return transform_background(bg)
# # # # # # # # # #
# # # Actions # # #
# # # # # # # # # #
class ActionTime(BaseModel):
    number: int
    unit: str
class ActionRaw(BaseModel):
    name: str
    source: str
    time: List[ActionTime]
    entries: List[str]
    seeAlsoAction: List[str]
class ActionNormalized(BaseModel):
    id: str
    name: str
    raw: ActionRaw
    description: str
class Action(BaseModel):
    id: str
    key: str
    name: str
    normalized: ActionNormalized
    raw: ActionRaw
    source: str
class ActionSummary(BaseModel):
    id: str
    name: str
    source: str
    time: List[ActionTime]
    description: str
# GET endpoint to get all actions with optional filtering
@app.get("/api/actions", response_model=List[ActionSummary])
async def get_actions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    name: Optional[str] = None,
    source: Optional[str] = None
):
    # Build query filter
    query_filter = {"key": "actions"}
    
    if name:
        query_filter["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query_filter["source"] = source
    
    # Get actions from database
    actions_cursor = compendia.find(query_filter).skip(skip).limit(limit)
    actions = await actions_cursor.to_list(length=limit)
    
    # Convert to summary models
    action_summaries = []
    for action in actions:
        # Extract time from raw data
        time_data = action.get("raw", {}).get("time", [])
        
        action_summaries.append(ActionSummary(
            id=action.get("id"),
            name=action.get("name"),
            source=action.get("raw", {}).get("source", ""),
            time=time_data,
            description=action.get("normalized", {}).get("description", "")
        ))
    
    return action_summaries
# GET endpoint to get a specific action by ID
@app.get("/api/actions/{action_id}", response_model=Action)
async def get_action(action_id: str):
    # Try to find by MongoDB ID first
    if ObjectId.is_valid(action_id):
        action = await compendia.find_one({"_id": ObjectId(action_id), "key": "actions"})
        if action:
            return action
    
    # If not found by MongoDB ID, try by action ID
    action = await compendia.find_one({"id": action_id, "key": "actions"})
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    
    return action
# # # # # # # # # #
# #  Languages  # #
# # # # # # # # # #
class LanguageSource(BaseModel):
    short: str
    long: str
class LanguageRaw(BaseModel):
    name: str
    source: LanguageSource
    speakers: str
    script: str
    rarity: str
    desc: str
class LanguageNormalized(BaseModel):
    id: str
    name: str
    raw: LanguageRaw
    description: str
class Language(BaseModel):
    id: str
    key: str
    name: str
    normalized: LanguageNormalized
    raw: LanguageRaw
    source: str
class LanguageSummary(BaseModel):
    id: str
    name: str
    script: str
    rarity: str
    description: str
    speakers: str
# GET endpoint to get all languages with optional filtering
@app.get("/api/languages", response_model=List[LanguageSummary])
async def get_languages(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    name: Optional[str] = None,
    rarity: Optional[str] = None,
    script: Optional[str] = None
):
    # Build query filter
    query_filter = {"key": "languages"}
    
    if name:
        query_filter["name"] = {"$regex": name, "$options": "i"}
    
    if rarity:
        query_filter["raw.rarity"] = rarity
    
    if script:
        query_filter["raw.script"] = script
    
    # Get languages from database
    languages_cursor = compendia.find(query_filter).skip(skip).limit(limit)
    languages = await languages_cursor.to_list(length=limit)
    
    # Convert to summary models
    language_summaries = []
    for language in languages:
        language_summaries.append(LanguageSummary(
            id=language.get("id"),
            name=language.get("name"),
            script=language.get("raw", {}).get("script", ""),
            rarity=language.get("raw", {}).get("rarity", ""),
            description=language.get("normalized", {}).get("description", ""),
            speakers=language.get("raw", {}).get("speakers", "")
        ))
    
    return language_summaries
# GET endpoint to get a specific language by ID
@app.get("/api/languages/{language_id}", response_model=Language)
async def get_language(language_id: str):
    # Try to find by MongoDB ID first
    if ObjectId.is_valid(language_id):
        language = await compendia.find_one({"_id": ObjectId(language_id), "key": "languages"})
        if language:
            return language
    
    # If not found by MongoDB ID, try by language ID
    language = await compendia.find_one({"id": language_id, "key": "languages"})
    if not language:
        raise HTTPException(status_code=404, detail="Language not found")
    
    return language
# # # # # # # # # #
# # # Deities # # #
# # # # # # # # # #
class DeityRaw(BaseModel):
    name: str
    altNames: List[str]
    source: str
    pantheon: str
    alignment: List[str]
    category: str
    domains: List[str]
    symbol: str
    entries: List[str]
class DeityNormalized(BaseModel):
    id: str
    name: str
    raw: DeityRaw
    description: str
    source: str
    alignment: List[str]
    domains: List[str]
class Deity(BaseModel):
    id: str
    key: str
    name: str
    normalized: DeityNormalized
    raw: DeityRaw
    source: str
class DeitySummary(BaseModel):
    id: str
    name: str
    pantheon: str
    alignment: List[str]
    category: str
    domains: List[str]
    symbol: str
# GET endpoint to get all deities with optional filtering
@app.get("/api/deities", response_model=List[DeitySummary])
async def get_deities(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    name: Optional[str] = None,
    pantheon: Optional[str] = None,
    alignment: Optional[str] = None,
    domain: Optional[str] = None
):
    # Build query filter
    query_filter = {"key": "deities"}
    
    if name:
        query_filter["name"] = {"$regex": name, "$options": "i"}
    
    if pantheon:
        query_filter["raw.pantheon"] = pantheon
    
    if alignment:
        query_filter["raw.alignment"] = alignment
    
    if domain:
        query_filter["raw.domains"] = domain
    
    # Get deities from database
    deities_cursor = compendia.find(query_filter).skip(skip).limit(limit)
    deities = await deities_cursor.to_list(length=limit)
    
    # Convert to summary models
    deity_summaries = []
    for deity in deities:
        deity_summaries.append(DeitySummary(
            id=deity.get("id"),
            name=deity.get("name"),
            pantheon=deity.get("raw", {}).get("pantheon", ""),
            alignment=deity.get("raw", {}).get("alignment", []),
            category=deity.get("raw", {}).get("category", ""),
            domains=deity.get("raw", {}).get("domains", []),
            symbol=deity.get("raw", {}).get("symbol", "")
        ))
    
    return deity_summaries
# GET endpoint to get a specific deity by ID
@app.get("/api/deities/{deity_id}", response_model=Deity)
async def get_deity(deity_id: str):
    # Try to find by MongoDB ID first
    if ObjectId.is_valid(deity_id):
        deity = await compendia.find_one({"_id": ObjectId(deity_id), "key": "deities"})
        if deity:
            return deity
    
    # If not found by MongoDB ID, try by deity ID
    deity = await compendia.find_one({"id": deity_id, "key": "deities"})
    if not deity:
        raise HTTPException(status_code=404, detail="Deity not found")
    
    return deity
# GET endpoint to get deities by pantheon
@app.get("/api/deities/pantheon/{pantheon}", response_model=List[DeitySummary])
async def get_deities_by_pantheon(pantheon: str, limit: int = Query(50, ge=1, le=100)):
    # Get deities by pantheon
    deities_cursor = compendia.find({
        "key": "deities",
        "raw.pantheon": pantheon
    }).limit(limit)
    
    deities = await deities_cursor.to_list(length=limit)
    
    # Convert to summary models
    deity_summaries = []
    for deity in deities:
        deity_summaries.append(DeitySummary(
            id=deity.get("id"),
            name=deity.get("name"),
            pantheon=deity.get("raw", {}).get("pantheon", ""),
            alignment=deity.get("raw", {}).get("alignment", []),
            category=deity.get("raw", {}).get("category", ""),
            domains=deity.get("raw", {}).get("domains", []),
            symbol=deity.get("raw", {}).get("symbol", "")
        ))
    
    return deity_summaries
# GET endpoint to get deities by alignment
@app.get("/api/deities/alignment/{alignment}", response_model=List[DeitySummary])
async def get_deities_by_alignment(alignment: str, limit: int = Query(50, ge=1, le=100)):
    # Get deities by alignment
    deities_cursor = compendia.find({
        "key": "deities",
        "raw.alignment": alignment
    }).limit(limit)
    
    deities = await deities_cursor.to_list(length=limit)
    
    # Convert to summary models
    deity_summaries = []
    for deity in deities:
        deity_summaries.append(DeitySummary(
            id=deity.get("id"),
            name=deity.get("name"),
            pantheon=deity.get("raw", {}).get("pantheon", ""),
            alignment=deity.get("raw", {}).get("alignment", []),
            category=deity.get("raw", {}).get("category", ""),
            domains=deity.get("raw", {}).get("domains", []),
            symbol=deity.get("raw", {}).get("symbol", "")
        ))
    
    return deity_summaries
# GET endpoint to get deities by domain
@app.get("/api/deities/domain/{domain}", response_model=List[DeitySummary])
async def get_deities_by_domain(domain: str, limit: int = Query(50, ge=1, le=100)):
    # Get deities by domain
    deities_cursor = compendia.find({
        "key": "deities",
        "raw.domains": domain
    }).limit(limit)
    
    deities = await deities_cursor.to_list(length=limit)
    
    # Convert to summary models
    deity_summaries = []
    for deity in deities:
        deity_summaries.append(DeitySummary(
            id=deity.get("id"),
            name=deity.get("name"),
            pantheon=deity.get("raw", {}).get("pantheon", ""),
            alignment=deity.get("raw", {}).get("alignment", []),
            category=deity.get("raw", {}).get("category", ""),
            domains=deity.get("raw", {}).get("domains", []),
            symbol=deity.get("raw", {}).get("symbol", "")
        ))
    
    return deity_summaries
# # # # # # # # # #
# # #  Feats  # # #
# # # # # # # # # #
class FeatRaw(BaseModel):
    name: str
    source: str
    prerequisite: List[Prerequisite]
    ability: List[AbilityIncrease]
    additionalSpells: List[AdditionalSpells]
    entries: List[Union[str, ListItem, Table, Section, Entry]]
class Feature(BaseModel):
    type: str
    text: str
class FeatNormalized(BaseModel):
    id: str
    name: str
    raw: FeatRaw
    description: str
    features: List[Feature]
class Feat(BaseModel):
    id: str
    key: str
    name: str
    normalized: FeatNormalized
    raw: FeatRaw
    source: str
class FeatSummary(BaseModel):
    id: str
    name: str
    source: str
    page: int
    description: str
    ability_increases: List[str]
    prerequisites: List[str]
# GET endpoint to get all feats with optional filtering
@app.get("/api/feats", response_model=List[FeatSummary])
async def get_feats(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    name: Optional[str] = None,
    source: Optional[str] = None
):
    # Build query filter
    query_filter = {"key": "feats"}
    
    if name:
        query_filter["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query_filter["raw.source"] = source
    
    # Get feats from database
    feats_cursor = compendia.find(query_filter).skip(skip).limit(limit)
    feats = await feats_cursor.to_list(length=limit)
    
    # Convert to summary models
    feat_summaries = []
    for feat in feats:
        # Extract ability increases
        ability_increases = []
        for ability in feat.get("raw", {}).get("ability", []):
            for attr, value in ability.items():
                if value:
                    ability_increases.append(f"{attr.upper()} +{value}")
        
        # Extract prerequisites
        prerequisites = []
        for prereq in feat.get("raw", {}).get("prerequisite", []):
            if "other" in prereq:
                prerequisites.append(prereq["other"])
        
        feat_summaries.append(FeatSummary(
            id=feat.get("id"),
            name=feat.get("name"),
            source=feat.get("raw", {}).get("source", ""),
            page=feat.get("raw", {}).get("page", 0),
            description=feat.get("normalized", {}).get("description", ""),
            ability_increases=ability_increases,
            prerequisites=prerequisites
        ))
    
    return feat_summaries
# GET endpoint to get a specific feat by ID
@app.get("/api/feats/{feat_id}", response_model=Feat)
async def get_feat(feat_id: str):
    # Try to find by MongoDB ID first
    if ObjectId.is_valid(feat_id):
        feat = await compendia.find_one({"_id": ObjectId(feat_id), "key": "feats"})
        if feat:
            return feat
    
    # If not found by MongoDB ID, try by feat ID
    feat = await compendia.find_one({"id": feat_id, "key": "feats"})
    if not feat:
        raise HTTPException(status_code=404, detail="Feat not found")
    
    return feat
# GET endpoint to search feats by name
@app.get("/api/feats/search/{name}", response_model=List[FeatSummary])
async def search_feats(name: str, limit: int = Query(10, ge=1, le=50)):
    # Search for feats with name matching the query
    feats_cursor = compendia.find({
        "key": "feats",
        "name": {"$regex": name, "$options": "i"}
    }).limit(limit)
    
    feats = await feats_cursor.to_list(length=limit)
    
    # Convert to summary models
    feat_summaries = []
    for feat in feats:
        # Extract ability increases
        ability_increases = []
        for ability in feat.get("raw", {}).get("ability", []):
            for attr, value in ability.items():
                if value:
                    ability_increases.append(f"{attr.upper()} +{value}")
        
        # Extract prerequisites
        prerequisites = []
        for prereq in feat.get("raw", {}).get("prerequisite", []):
            if "other" in prereq:
                prerequisites.append(prereq["other"])
        
        feat_summaries.append(FeatSummary(
            id=feat.get("id"),
            name=feat.get("name"),
            source=feat.get("raw", {}).get("source", ""),
            page=feat.get("raw", {}).get("page", 0),
            description=feat.get("normalized", {}).get("description", ""),
            ability_increases=ability_increases,
            prerequisites=prerequisites
        ))
    
    return feat_summaries
# GET endpoint to get feats that provide specific ability increases
@app.get("/api/feats/ability/{ability}", response_model=List[FeatSummary])
async def get_feats_by_ability(ability: str, limit: int = Query(50, ge=1, le=100)):
    # Get feats that provide a specific ability increase
    feats_cursor = compendia.find({
        "key": "feats",
        f"raw.ability.{ability}": {"$exists": True}
    }).limit(limit)
    
    feats = await feats_cursor.to_list(length=limit)
    
    # Convert to summary models
    feat_summaries = []
    for feat in feats:
        # Extract ability increases
        ability_increases = []
        for ab in feat.get("raw", {}).get("ability", []):
            for attr, value in ab.items():
                if value:
                    ability_increases.append(f"{attr.upper()} +{value}")
        
        # Extract prerequisites
        prerequisites = []
        for prereq in feat.get("raw", {}).get("prerequisite", []):
            if "other" in prereq:
                prerequisites.append(prereq["other"])
        
        feat_summaries.append(FeatSummary(
            id=feat.get("id"),
            name=feat.get("name"),
            source=feat.get("raw", {}).get("source", ""),
            page=feat.get("raw", {}).get("page", 0),
            description=feat.get("normalized", {}).get("description", ""),
            ability_increases=ability_increases,
            prerequisites=prerequisites
        ))
    
    return feat_summaries
# # # # # # # # # #
# # #  Feats  # # #
# # # # # # # # # #









@app.get("/api/test")
async def test_endpoint():
    return {"message": "API is working"}

# Mount static files
app.mount("/", StaticFiles(directory="local", html=True), name="local")

# Explicitly handle the root path
@app.get("/")
async def root():
    return FileResponse(os.path.join("local", "index.html"))