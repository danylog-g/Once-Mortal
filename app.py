from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any, Union
from bson import ObjectId
from dotenv import load_dotenv
from collections import defaultdict
import os

app = FastAPI()

# Allow LAN access from typical dev devices. Tighten for production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change to ["http://192.168.1.x:port"] for security
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
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
    def validate(cls, v, field=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
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
    constitution: Optional[int] = None
    strength: Optional[int] = None
    dexterity: Optional[int] = None
    intelligence: Optional[int] = None
    wisdom: Optional[int] = None
    charisma: Optional[int] = None
class SpellChoice(BaseModel):
    choose: str
class InnateSpells(BaseModel):
    rest: Dict[str, List[SpellChoice]]
class AdditionalSpells(BaseModel):
    ability: str
    innate: Dict[str, InnateSpells]
    known: Dict[str, List[SpellChoice]]
class Table(BaseModel):
    type: str = "table"
    caption: str
    colLabels: List[str]
    colStyles: List[str]
    rows: List[List[str]]
class ListItem(BaseModel):
    type: str = "list"
    items: List[str]
class Section(BaseModel):
    type: str = "section"
    name: str
    entries: List[Any]
class Entry(BaseModel):
    type: str = "entries"
    name: Optional[str] = None
    entries: Optional[List[Any]] = None
class Consumes(BaseModel):
    name: str
    amount: Optional[int] = None
class SkillProficiencies(BaseModel):
    acrobatics: Optional[bool] = False
    athletics: Optional[bool] = False
    deception: Optional[bool] = False
    persuasion: Optional[bool] = False
    intimidation: Optional[bool] = False
    performance: Optional[bool] = False
    # Add other skills as needed
class Sense(BaseModel):
    blindsight: Optional[int] = None
    darkvision: Optional[int] = None
    tremorsense: Optional[int] = None
    truesight: Optional[int] = None
class Cost(BaseModel):
    min: int
    max: int
class Concentration(BaseModel):
    duration: int
    unit: str
class Mode(BaseModel):
    cost: Optional[Cost] = None
    name: str
    entries: List[str]
    concentration: Optional[Concentration] = None
    submodes: Optional[List['Mode']] = None  # For nested modes
# Helper function to extract text from entries
def extract_text_from_entries(entries):
    text_parts = []
    for entry in entries:
        if isinstance(entry, str):
            text_parts.append(entry)
        elif isinstance(entry, dict):
            if entry.get("type") == "list" and "items" in entry:
                for item in entry["items"]:
                    if isinstance(item, str):
                        text_parts.append(item)
                    elif isinstance(item, dict) and "entries" in item:
                        for sub_entry in item["entries"]:
                            if isinstance(sub_entry, str):
                                text_parts.append(sub_entry)
    return " ".join(text_parts)
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
        if isinstance(entry, dict) and entry.get("type") == "entries" and "name" in entry:
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
    
    # Handle proficiencies - convert dict format to list of strings
    proficiencies = []
    skill_proficiencies = raw.get("skillProficiencies", [])
    if skill_proficiencies and isinstance(skill_proficiencies, list):
        for item in skill_proficiencies:
            if isinstance(item, dict):
                # Extract skill names from dict format like {"intimidation": True}
                proficiencies.extend(item.keys())
            elif isinstance(item, str):
                proficiencies.append(item)
    
    # Handle resistances
    resistances = []
    resist_data = raw.get("resist", [])
    if resist_data and isinstance(resist_data, list):
        for item in resist_data:
            if isinstance(item, str):
                resistances.append(item)
    
    # Handle languages
    languages = []
    languages_data = raw.get("languages", [])
    if languages_data and isinstance(languages_data, list):
        for item in languages_data:
            if isinstance(item, str):
                languages.append(item)
    
    # return race obj
    return Race(
        _id=db_race["_id"],
        name=raw.get("name", ""),
        source=raw.get("source", ""),
        size=size,
        speed=speed,
        age=Age(**age_data) if age_data else None,
        senses=Senses(**senses_data) if senses_data else None,
        resistances=resistances,
        proficiencies=proficiencies,
        languages=languages,
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
class SubclassFeature(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
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
    features: List[SubclassFeature] = []
    additional_spells: Optional[Dict[str, Any]] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class ClassFeature(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    level: int
    source: str
    is_subclass_feature: bool = False

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
# Helper function to parse feature strings
def parse_feature_string(feature_str):
    """Parse feature string in format: Name|Class|Source|Level"""
    parts = feature_str.split("|")
    if len(parts) >= 4:
        return {
            "name": parts[0],
            "class_name": parts[1],
            "source": parts[2],
            "level": int(parts[3]) if parts[3].isdigit() else 0
        }
    return None
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
    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")
    
    class_obj = await compendia.find_one({"_id": ObjectId(class_id), "key": "class"})
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # Extract features from normalized data
    if "normalized" in class_obj and "classFeatures" in class_obj["normalized"]:
        return class_obj["normalized"]["classFeatures"]
    return []
# GET endpoint to list all features from a level and class id
@app.get("/api/classes/{class_id}/features/{level}", response_model=List[ClassFeature])
async def get_class_features_by_level(class_id: PyObjectId, level: int):
    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")
    
    class_obj = await compendia.find_one({"_id": ObjectId(class_id), "key": "class"})
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # Extract class features from the raw data
    class_features = []
    raw_features = class_obj.get("raw", {}).get("classFeatures", [])
    
    for feature in raw_features:
        feature_data = {}
        is_subclass = False
        
        # Handle both string and object formats
        if isinstance(feature, str):
            parsed = parse_feature_string(feature)
            if parsed and parsed["level"] == level:
                feature_data = parsed
        elif isinstance(feature, dict):
            if "classFeature" in feature:
                parsed = parse_feature_string(feature["classFeature"])
                if parsed and parsed["level"] == level:
                    feature_data = parsed
                    is_subclass = feature.get("gainSubclassFeature", False)
        
        # Create ClassFeature object if we found a matching feature
        if feature_data:
            # In a real implementation, you'd fetch the full feature description from another collection
            class_features.append(ClassFeature(
                _id=ObjectId(),
                name=feature_data["name"],
                description=f"Description for {feature_data['name']}",
                level=feature_data["level"],
                source=feature_data["source"],
                is_subclass_feature=is_subclass
            ))
    
    return class_features
# # # # # # # # # #
# # Backgrounds # #
# # # # # # # # # #
class Background(BaseModel):
    id_: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    id: str
    name: str
    source: str
    ability: Optional[List[Dict[str, Any]]] = None
    feats: Optional[List[Any]] = None
    skill_proficiencies: Optional[List[str]] = None
    tool_proficiencies: Optional[List[str]] = None
    language_proficiencies: Optional[List[str]] = None
    description: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
def transform_background(bg: Union[Dict, List[Dict]]) -> Union[Dict, List[Dict]]:
    """Transform background document(s) to response format"""
    def transform_single_bg(background: Dict) -> Dict:
        """Helper function to transform a single background obj"""
        raw = background.get("raw", {})
        # Extract ability increases
        ability = raw.get("ability", [])
        # Extract all feats
        feats = []
        for i in range(min(4, len(raw.get("entries", [])))):
            if (isinstance(raw["entries"][i], dict) and 
                "name" in raw["entries"][i] and 
                "Feature: " in raw["entries"][i]["name"]):
                feats.append(raw["entries"][i])
        for i in range(min(1, len(raw.get("feats", [])))):
            if isinstance(raw["feats"][i], dict):
                feats.append(raw["feats"][i])
        if raw.get("_copy", []):
            if isinstance(raw["_copy"], dict):
                if isinstance(raw["_copy"]["_mod"], dict):
                    if isinstance(raw["_copy"]["_mod"]["entries"], dict):
                        if isinstance(raw["_copy"]["_mod"]["entries"]["items"], dict):
                           feats.append(raw["_copy"]["_mod"]["entries"]["items"])
                    if isinstance(raw["_copy"]["_mod"]["entries"], list):
                        if len(raw["_copy"]["_mod"]["entries"]) > 1 and isinstance(raw["_copy"]["_mod"]["entries"][0], dict):
                            if isinstance(raw["_copy"]["_mod"]["entries"][0]["mode"], dict) and "Feature: " in raw["_copy"]["_mod"]["entries"][0]["mode"]:
                                if isinstance(raw["_copy"]["_mod"]["entries"][0]["items"], dict):
                                    feats.append(raw["_copy"]["_mod"]["entries"][0]["items"])
                        if len(raw["_copy"]["_mod"]["entries"]) > 2 and isinstance(raw["_copy"]["_mod"]["entries"][1], dict):
                            if isinstance(raw["_copy"]["_mod"]["entries"][1]["items"], dict):
                                feats.append(raw["_copy"]["_mod"]["entries"][1]["items"])
        # Extract skill proficiencies
        skill_proficiencies = []
        for skill_prof in raw.get("skillProficiencies", []):
            if isinstance(skill_prof, dict):
                skill_proficiencies.extend(list(skill_prof.keys()))
        # Extract tool proficiencies
        tool_proficiencies = []
        for tool_prof in raw.get("toolProficiencies", []):
            if isinstance(tool_prof, dict):
                tool_proficiencies.extend(list(tool_prof.keys()))
        # Extract language proficiencies
        language_proficiencies = []
        for lang_prof in raw.get("languageProficiencies", []):
            if isinstance(lang_prof, dict):
                if "anyStandard" in lang_prof:
                    language_proficiencies.append(f"Any {lang_prof['anyStandard']}")
                else:
                    language_proficiencies.extend(list(lang_prof.keys()))
        # Extract proper description from raw entries using the specific logic provided
        description = ""
        if raw.get("entries", []):
            # Check if entries is a list with at least 2 elements
            if isinstance(raw["entries"], list) and len(raw["entries"]) > 1:
                # entries 1
                if isinstance(raw["entries"][1], dict) and "entries" in raw["entries"][1]:
                    entries1 = raw["entries"][1]["entries"]
                    if len(entries1) > 0 and isinstance(entries1[0], str):
                        description += entries1[0] + "\n\n"
                    if len(entries1) > 1 and isinstance(entries1[1], str):
                        description += entries1[1] + "\n\n"
                # entries 2
                if len(raw["entries"]) > 2 and isinstance(raw["entries"][2], dict) and "entries" in raw["entries"][2]:
                    entries2 = raw["entries"][2]["entries"]
                    for i in range(min(4, len(entries2))):
                        if isinstance(entries2[i], str):
                            description += entries2[i] + "\n\n"
                # entries 3
                if len(raw["entries"]) > 3 and isinstance(raw["entries"][3], dict) and "entries" in raw["entries"][3]:
                    entries3 = raw["entries"][3]["entries"]
                    if len(entries3) > 0 and isinstance(entries3[0], str):
                        description += entries3[0] + "\n\n"
                # entries 4
                if len(raw["entries"]) > 4 and isinstance(raw["entries"][4], dict) and "entries" in raw["entries"][4]:
                    entries4 = raw["entries"][4]["entries"]
                    for i in range(min(2, len(entries4))):
                        if isinstance(entries4[i], str):
                            description += entries4[i] + "\n\n"
                # entries 5
                if len(raw["entries"]) > 5 and isinstance(raw["entries"][5], dict) and "entries" in raw["entries"][5]:
                    entries5 = raw["entries"][5]["entries"]
                    for i in range(min(2, len(entries5))):
                        if isinstance(entries5[i], str):
                            description += entries5[i] + "\n\n"
            
        if description == "":
            description = "No description available."
        return {
            "id": background.get("id"),
            "name": background.get("name"),
            "source": raw.get("source"),
            "ability": ability,
            "feats": feats,
            "skill_proficiencies": skill_proficiencies,
            "tool_proficiencies": tool_proficiencies,
            "language_proficiencies": language_proficiencies,
            "description": description.strip()
        }
    # Handle both single background and array cases
    if isinstance(bg, list):
        return [transform_single_bg(background) for background in bg]
    return transform_single_bg(bg)
def merge_bgs(base_doc: Dict[str, Any], new_doc: Dict[str, Any]) -> Dict[str, Any]:
    """Merge two backgrounds, using base document's valid fields where new document's are broken"""
    merged_doc = new_doc.copy()
    base_raw = base_doc.get("raw", {})
    new_raw = new_doc.get("raw", {})
    
    # Merge language proficiencies
    if not new_raw.get("languageProficiencies") and base_raw.get("languageProficiencies"):
        merged_doc["raw"]["languageProficiencies"] = base_raw["languageProficiencies"]
    
    # Merge description if new doc has invalid description
    merged_doc["raw"]["entries"] = base_raw.get("entries")
    
    # Merge reprintedAs array
    if base_raw.get("reprintedAs"):
        merged_doc["raw"].setdefault("reprintedAs", []).extend(base_raw["reprintedAs"])
        # Remove duplicates while preserving order
        seen = set()
        merged_doc["raw"]["reprintedAs"] = [
            x for x in merged_doc["raw"]["reprintedAs"] 
            if not (x in seen or seen.add(x))
        ]
    
    return merged_doc
# GET endpoint to list all backgrounds (merged by name)
@app.get("/api/backgrounds", response_model=List[Background])
async def get_bgs(
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
    
    # Fetch all matching backgrounds
    bg_cursor = compendia.find(query).skip(skip).limit(limit)
    
    # Group backgrounds by name for merging
    backgrounds_by_name = defaultdict(list)
    async for bg in bg_cursor:
        backgrounds_by_name[bg["name"].lower()].append(bg)
    
    # Merge backgrounds with the same name
    merged_backgrounds = []
    for name_key, bg_list in backgrounds_by_name.items():
        if len(bg_list) == 1:
            # Single background, no need to merge
            merged_backgrounds.append(transform_background(bg_list[0]))
        else:
            # Multiple backgrounds with same name, merge them
            # Identify base document (has reprintedAs)
            base_doc = None
            other_docs = []
            
            for bg in bg_list:
                if bg.get("raw", {}).get("reprintedAs"):
                    base_doc = bg
                else:
                    other_docs.append(bg)
            
            # If we found a base document, merge all others into it
            if base_doc:
                merged_doc = base_doc
                for other_doc in other_docs:
                    merged_doc = merge_bgs(merged_doc, other_doc)
                merged_backgrounds.append(transform_background(merged_doc))
            else:
                # No base document found, just transform the first one
                merged_backgrounds.append(transform_background(bg_list[0]))
    
    return merged_backgrounds
# GET endpoint to get specific background by name (merged)
@app.get("/api/backgrounds/name/{name}", response_model=Background)
async def get_bg_by_name(name: str):
    query = {"key": "backgrounds", "name": name}
    
    backgrounds = []
    async for background in compendia.find(query):
        if background.get("raw", {}).get("reprintedAs"):
            continue
        backgrounds.append(background)
    
    if not backgrounds:
        raise HTTPException(status_code=404, detail="Background not found")
    
    return merge_backgrounds(backgrounds)
# GET endpoint to get specific background by str id
@app.get("/api/backgrounds/id/{sid}", response_model=Background)
async def get_bg_by_id(sid: str):
    bg = await compendia.find_one({"key": "backgrounds", "id": sid})
    
    if not bg:
        raise HTTPException(status_code=404, detail="Background not found")
    
    return transform_background(bg)
# GET endpoint to get specific background from obj id
@app.get("/api/backgrounds/{bg_id}", response_model=Background)
async def get_bg_by_objid(bg_id: str):
    if not ObjectId.is_valid(bg_id):
        raise HTTPException(status_code=400, detail="Invalid background ID")
    
    bg = await compendia.find_one({"_id": ObjectId(bg_id), "key": "backgrounds"})
    if not bg:
        raise HTTPException(status_code=404, detail="Background not found")
    
    return bg
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
class OptionalFeatureRaw(BaseModel):
    name: str
    source: str
    isClassFeatureVariant: Optional[bool] = False
    featureType: List[str]
    prerequisite: List[Prerequisite] = []
    additionalSpells: List[AdditionalSpells] = []
    consumes: Optional[Consumes] = None
    skillProficiencies: Optional[SkillProficiencies] = None
    senses: Optional[Sense] = None
    entries: List[Union[str, ListItem, Table, Section, Entry]]
    otherSources: Optional[List[Dict[str, Any]]] = None
class OptionalFeatureNormalized(BaseModel):
    id: str
    name: str
    raw: OptionalFeatureRaw
    description: str
    features: List[Feature]
class OptionalFeature(BaseModel):
    id: str
    key: str
    name: str
    normalized: OptionalFeatureNormalized
    raw: OptionalFeatureRaw
    source: str
class OptionalFeatureSummary(BaseModel):
    id: str
    name: str
    source: str
    description: str
    feature_types: List[str]
    prerequisites: List[str]
# GET endpoint to get all optional features with optional filtering
@app.get("/api/optional-features", response_model=List[OptionalFeatureSummary])
async def get_optional_features(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    name: Optional[str] = None,
    source: Optional[str] = None,
    feature_type: Optional[str] = None
):
    # Build query filter
    query_filter = {"key": "optionalfeatures"}
    
    if name:
        query_filter["name"] = {"$regex": name, "$options": "i"}
    
    if source:
        query_filter["raw.source"] = source
    
    if feature_type:
        query_filter["raw.featureType"] = {"$in": [feature_type]}
    
    # Get optional features from database
    features_cursor = compendia.find(query_filter).skip(skip).limit(limit)
    features = await features_cursor.to_list(length=limit)
    
    # Convert to summary models
    feature_summaries = []
    for feature in features:
        # Extract prerequisites
        prerequisites = []
        for prereq in feature.get("raw", {}).get("prerequisite", []):
            if "level" in prereq:
                level_info = prereq["level"]
                class_info = level_info.get("class", {})
                class_name = class_info.get("name", "Unknown Class")
                level_num = level_info.get("level", 0)
                prerequisites.append(f"Level {level_num} {class_name}")
            
            if "spell" in prereq:
                spells = prereq["spell"]
                if isinstance(spells, list):
                    prerequisites.append(f"Spell: {', '.join(spells)}")
                else:
                    prerequisites.append(f"Spell: {spells}")
            
            if "pact" in prereq:
                prerequisites.append(f"Pact: {prereq['pact']}")
            
            if "item" in prereq:
                items = prereq["item"]
                prerequisites.append(f"Item: {', '.join(items)}")
            
            if "optionalfeature" in prereq:
                features = prereq["optionalfeature"]
                prerequisites.append(f"Requires: {', '.join(features)}")
        
        feature_summaries.append(OptionalFeatureSummary(
            id=feature.get("id"),
            name=feature.get("name"),
            source=feature.get("raw", {}).get("source", ""),
            page=feature.get("raw", {}).get("page", 0),
            description=feature.get("normalized", {}).get("description", ""),
            feature_types=feature.get("raw", {}).get("featureType", []),
            prerequisites=prerequisites
        ))
    
    return feature_summaries
# GET endpoint to get a specific optional feature by ID
@app.get("/api/optional-features/{feature_id}", response_model=OptionalFeature)
async def get_optional_feature(feature_id: str):
    # Try to find by MongoDB ID first
    if ObjectId.is_valid(feature_id):
        feature = await compendia.find_one({"_id": ObjectId(feature_id), "key": "optionalfeatures"})
        if feature:
            return feature
    
    # If not found by MongoDB ID, try by feature ID
    feature = await compendia.find_one({"id": feature_id, "key": "optionalfeatures"})
    if not feature:
        raise HTTPException(status_code=404, detail="Optional feature not found")
    
    return feature
# GET endpoint to search optional features by name
@app.get("/api/optional-features/search/{name}", response_model=List[OptionalFeatureSummary])
async def search_optional_features(name: str, limit: int = Query(10, ge=1, le=50)):
    # Search for optional features with name matching the query
    features_cursor = compendia.find({
        "key": "optionalfeatures",
        "name": {"$regex": name, "$options": "i"}
    }).limit(limit)
    
    features = await features_cursor.to_list(length=limit)
    
    # Convert to summary models
    feature_summaries = []
    for feature in features:
        # Extract prerequisites
        prerequisites = []
        for prereq in feature.get("raw", {}).get("prerequisite", []):
            if "level" in prereq:
                level_info = prereq["level"]
                class_info = level_info.get("class", {})
                class_name = class_info.get("name", "Unknown Class")
                level_num = level_info.get("level", 0)
                prerequisites.append(f"Level {level_num} {class_name}")
            
            if "spell" in prereq:
                spells = prereq["spell"]
                if isinstance(spells, list):
                    prerequisites.append(f"Spell: {', '.join(spells)}")
                else:
                    prerequisites.append(f"Spell: {spells}")
            
            if "pact" in prereq:
                prerequisites.append(f"Pact: {prereq['pact']}")
            
            if "item" in prereq:
                items = prereq["item"]
                prerequisites.append(f"Item: {', '.join(items)}")
            
            if "optionalfeature" in prereq:
                features = prereq["optionalfeature"]
                prerequisites.append(f"Requires: {', '.join(features)}")
        
        feature_summaries.append(OptionalFeatureSummary(
            id=feature.get("id"),
            name=feature.get("name"),
            source=feature.get("raw", {}).get("source", ""),
            page=feature.get("raw", {}).get("page", 0),
            description=feature.get("normalized", {}).get("description", ""),
            feature_types=feature.get("raw", {}).get("featureType", []),
            prerequisites=prerequisites
        ))
    
    return feature_summaries
# GET endpoint to get optional features by type
@app.get("/api/optional-features/type/{feature_type}", response_model=List[OptionalFeatureSummary])
async def get_optional_features_by_type(feature_type: str, limit: int = Query(50, ge=1, le=100)):
    # Get optional features of a specific type
    features_cursor = compendia.find({
        "key": "optionalfeatures",
        "raw.featureType": {"$in": [feature_type]}
    }).limit(limit)
    
    features = await features_cursor.to_list(length=limit)
    
    # Convert to summary models
    feature_summaries = []
    for feature in features:
        # Extract prerequisites
        prerequisites = []
        for prereq in feature.get("raw", {}).get("prerequisite", []):
            if "level" in prereq:
                level_info = prereq["level"]
                class_info = level_info.get("class", {})
                class_name = class_info.get("name", "Unknown Class")
                level_num = level_info.get("level", 0)
                prerequisites.append(f"Level {level_num} {class_name}")
            
            if "spell" in prereq:
                spells = prereq["spell"]
                if isinstance(spells, list):
                    prerequisites.append(f"Spell: {', '.join(spells)}")
                else:
                    prerequisites.append(f"Spell: {spells}")
            
            if "pact" in prereq:
                prerequisites.append(f"Pact: {prereq['pact']}")
            
            if "item" in prereq:
                items = prereq["item"]
                prerequisites.append(f"Item: {', '.join(items)}")
            
            if "optionalfeature" in prereq:
                features = prereq["optionalfeature"]
                prerequisites.append(f"Requires: {', '.join(features)}")
        
        feature_summaries.append(OptionalFeatureSummary(
            id=feature.get("id"),
            name=feature.get("name"),
            source=feature.get("raw", {}).get("source", ""),
            page=feature.get("raw", {}).get("page", 0),
            description=feature.get("normalized", {}).get("description", ""),
            feature_types=feature.get("raw", {}).get("featureType", []),
            prerequisites=prerequisites
        ))
    
    return feature_summaries
# GET endpoint to get all available feature types
@app.get("/api/optional-features/types")
async def get_optional_feature_types():
    # Get distinct feature types
    feature_types = await compendia.distinct(
        "raw.featureType", 
        {"key": "optionalfeatures"}
    )
    
    # Flatten the list of lists
    flattened_types = []
    for type_list in feature_types:
        if isinstance(type_list, list):
            flattened_types.extend(type_list)
        else:
            flattened_types.append(type_list)
    
    # Remove duplicates
    unique_types = list(set(flattened_types))
    
    return {"feature_types": unique_types}
# # # # # # # # # #
# # # Psionic # # #
# # # # # # # # # #
class PsionicBase(BaseModel):
    name: str
    source: str
    type: str  # "D" for discipline, "T" for talent
    order: Optional[str] = None  # Only for disciplines
    entries: List[str]
    focus: Optional[str] = None  # Only for disciplines
    modes: Optional[List[Mode]] = None  # Only for disciplines
class PsionicInDB(PsionicBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
class Psionic(PsionicBase):
    class Settings:
        name = "psionics"
        use_state_management = True
    class Config:
        schema_extra = {
            "example": {
                "name": "Adaptive Body",
                "source": "UATheMysticClass",
                "type": "D",
                "order": "Immortal",
                "entries": ["You can alter your body..."],
                "focus": "While focused on this discipline...",
                "modes": [],
            }
        }
# GET endpoint to list all psionics
@app.get("/api/psionics", response_model=List[Psionic])
async def get_psionics(
    skip: int = 0,
    limit: int = 100,
    type: Optional[str] = None,
    order: Optional[str] = None,
    source: Optional[str] = None
):
    query = {"key": "psionics"}
    if type:
        query["type"] = type
    if order:
        query["order"] = order
    if source:
        query["source"] = source
        
    psionics = await compendia.find(query).skip(skip).limit(limit).to_list()
    return psionics
# GET endpoint to find psionic by id
@app.get("/api/psionics/{psionic_id}", response_model=Psionic)
async def get_psionic(psionic_id: str):
    psionic = await compendia.get(psionic_id)
    if not psionic:
        raise HTTPException(status_code=404, detail="Psionic not found")
    return psionic
# GET endpoint to get psionic by name
@app.get("/api/psionics/name/{name}", response_model=Psionic)
async def get_psionic_by_name(name: str):
    psionic = await compendia.find_one(compendia.name == name)
    if not psionic:
        raise HTTPException(status_code=404, detail="Psionic not found")
    return psionic
# # # # # # # # # #
# # #  Sense  # # #
# # # # # # # # # #
class SenseVersion(BaseModel):
    source: str
    entries: List[Any]
    reprintedAs: Optional[List[str]] = None
class Sense(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    versions: List[SenseVersion]
    description: str  # Merged description from all versions
    source: Optional[str] = None
    key: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
# GET endpoint to list all senses
@app.get("/api/senses", response_model=List[Sense])
async def get_all_senses():
    """Get all senses, merging entries for senses with the same name"""
    senses_map = {}
    
    # Query all sense documents from MongoDB
    query = {"key": "senses"}
    cursor = compendia.find(query)
    
    async for doc in cursor:
        name = doc["name"]
        
        # Create sense version from the document
        version = SenseVersion(
            source=doc["raw"]["source"],
            entries=doc["raw"]["entries"],
            reprintedAs=doc["raw"].get("reprintedAs")
        )
        
        if name not in senses_map:
            # Create new sense entry
            merged_description = " ".join([
                entry if isinstance(entry, str) else 
                " ".join([item for item in entry.get("items", []) if isinstance(item, dict)])
                for entry in doc["raw"]["entries"]
            ])
            
            senses_map[name] = Sense(
                _id=doc["_id"],
                name=name,
                versions=[version],
                description=merged_description,
                source=doc.get("source"),
                key=doc.get("key")
            )
        else:
            # Add version to existing sense and update description
            senses_map[name].versions.append(version)
            
            # Update description with new entries
            new_entries = []
            for entry in doc["raw"]["entries"]:
                if isinstance(entry, str):
                    new_entries.append(entry)
                elif isinstance(entry, dict) and "items" in entry:
                    for item in entry["items"]:
                        if isinstance(item, dict) and "entries" in item:
                            for sub_entry in item["entries"]:
                                if isinstance(sub_entry, str):
                                    new_entries.append(sub_entry)
            
            senses_map[name].description += " " + " ".join(new_entries)
    
    return list(senses_map.values())
# GET endpoint to get sense from name
@app.get("/api/senses/{name}", response_model=Sense)
async def get_sense_by_name(name: str):
    """Get a specific sense by name, merging all versions"""
    senses = []
    query = {"key": "senses", "name": name}
    cursor = compendia.find(query)
    
    async for doc in cursor:
        senses.append(doc)
    
    if not senses:
        raise HTTPException(status_code=404, detail="Sense not found")
    
    # Create merged sense
    merged_versions = []
    merged_description_parts = []
    
    for doc in senses:
        version = SenseVersion(
            source=doc["raw"]["source"],
            entries=doc["raw"]["entries"],
            reprintedAs=doc["raw"].get("reprintedAs")
        )
        merged_versions.append(version)
        
        # Add to description
        for entry in doc["raw"]["entries"]:
            if isinstance(entry, str):
                merged_description_parts.append(entry)
            elif isinstance(entry, dict) and "items" in entry:
                for item in entry["items"]:
                    if isinstance(item, dict) and "entries" in item:
                        for sub_entry in item["entries"]:
                            if isinstance(sub_entry, str):
                                merged_description_parts.append(sub_entry)
    
    # Use the first document as the base
    base_doc = senses[0]
    
    return Sense(
        _id=base_doc["_id"],
        name=name,
        versions=merged_versions,
        description=" ".join(merged_description_parts),
        source=base_doc.get("source"),
        key=base_doc.get("key")
    )
# # # # # # # # # #
# # #  Skill  # # #
# # # # # # # # # #
class SkillVersion(BaseModel):
    source: str
    ability: str
    entries: List[Any]
    reprintedAs: Optional[List[str]] = None
class Skill(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    ability: str
    versions: List[SkillVersion]
    description: str  # Merged description from all versions
    source: Optional[str] = None
    key: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
# GET endpoint to list all skills
@app.get("/api/skills", response_model=List[Skill])
async def get_all_skills():
    """Get all skills, merging entries for skills with the same name"""
    skills_map = {}
    
    # Query all skill documents from MongoDB
    query = {"key": "skills"}
    cursor = compendia.find(query)
    
    async for doc in cursor:
        name = doc["name"]
        
        # Create skill version from the document
        version = SkillVersion(
            source=doc["raw"]["source"],
            ability=doc["raw"]["ability"],
            entries=doc["raw"]["entries"],
            reprintedAs=doc["raw"].get("reprintedAs")
        )
        
        if name not in skills_map:
            # Create new skill entry
            merged_description = extract_text_from_entries(doc["raw"]["entries"])
            
            skills_map[name] = Skill(
                _id=doc["_id"],
                name=name,
                ability=doc["raw"]["ability"],
                versions=[version],
                description=merged_description,
                source=doc.get("source"),
                key=doc.get("key")
            )
        else:
            # Add version to existing skill and update description
            skills_map[name].versions.append(version)
            
            # Update description with new entries
            new_description = extract_text_from_entries(doc["raw"]["entries"])
            skills_map[name].description += " " + new_description
    
    return list(skills_map.values())
# GET endpoint to get skill from name
@app.get("/api/skills/{name}", response_model=Skill)
async def get_skill_by_name(name: str):
    """Get a specific skill by name, merging all versions"""
    skills = []
    query = {"key": "skills", "name": name}
    cursor = compendia.find(query)
    
    async for doc in cursor:
        skills.append(doc)
    
    if not skills:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    # Create merged skill
    merged_versions = []
    merged_description_parts = []
    
    for doc in skills:
        version = SkillVersion(
            source=doc["raw"]["source"],
            ability=doc["raw"]["ability"],
            entries=doc["raw"]["entries"],
            reprintedAs=doc["raw"].get("reprintedAs")
        )
        merged_versions.append(version)
        
        # Add to description
        description_part = extract_text_from_entries(doc["raw"]["entries"])
        merged_description_parts.append(description_part)
    
    # Use the first document as the base
    base_doc = skills[0]
    
    return Skill(
        _id=base_doc["_id"],
        name=name,
        ability=base_doc["raw"]["ability"],
        versions=merged_versions,
        description=" ".join(merged_description_parts),
        source=base_doc.get("source"),
        key=base_doc.get("key")
    )
# GET endpoint to list all skills by ability
@app.get("/api/skills/ability/{ability}", response_model=List[Skill])
async def get_skills_by_ability(ability: str):
    """Get all skills for a specific ability score"""
    skills = []
    
    query = {"key": "senses", "raw.ability": ability}
    cursor = compendia.find(query)
    
    skills_map = {}
    
    async for doc in cursor:
        skills.append(doc)

    if not skills:
        raise HTTPException(status_code=404, detail="Skill not found")
        
    for doc in skills:
        name = doc["name"]
        
        # Create skill version from the document
        version = SkillVersion(
            source=doc["raw"]["source"],
            ability=doc["raw"]["ability"],
            entries=doc["raw"]["entries"],
            reprintedAs=doc["raw"].get("reprintedAs")
        )
        
        if name not in skills_map:
            # Create new skill entry
            merged_description = extract_text_from_entries(doc["raw"]["entries"])
            
            skills_map[name] = Skill(
                _id=doc["_id"],
                name=name,
                ability=doc["raw"]["ability"],
                versions=[version],
                description=merged_description,
                source=doc.get("source"),
                key=doc.get("key")
            )
        else:
            # Add version to existing skill and update description
            skills_map[name].versions.append(version)
            
            # Update description with new entries
            new_description = extract_text_from_entries(doc["raw"]["entries"])
            skills_map[name].description += " " + new_description
    
    return list(skills_map.values())
# # # # # # # # # #
#  Variant Rules  #
# # # # # # # # # #
class RuleEntry(BaseModel):
    type: Optional[str] = None
    name: Optional[str] = None
    source: Optional[str] = None
    entries: Optional[List[Any]] = None
class RawRule(BaseModel):
    name: str
    source: str
    ruleType: str
    entries: List[Union[str, RuleEntry]]
    reprintedAs: Optional[List[str]] = None
    additionalSources: Optional[List[Any]] = None
class VariantRule(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    rule_id: str = Field(alias="id")
    key: str
    v: int = Field(alias="__v")
    name: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
# GET endpoint to list all rules
@app.get("/api/variant-rules", response_model=VariantRule)
async def get_all_rules():
    if (rules := await compendia.find({"key": "variantrules"}).to_list()) is not None:
        return rules
    raise HTTPException(status_code=404, detail="Variant rules not found")
# GET endpoint to get a rule obj from its name
@app.get("/api/variant-rules/{name}", response_model=VariantRule)
async def get_variant_rule(name: str):
    if (rule := await compendia.find_one({"key": "variantrules", "name": name})) is not None:
        return rule
    raise HTTPException(status_code=404, detail="Variant rule not found")
# GET endpoint to list all rules by source
@app.get("/api/variant-rules/source/{source}", response_model=List[VariantRule])
async def get_rules_by_source(source: str):
    rules = await compendia.find({"key": "variantrules", "normalized.raw.source": source}).to_list()
    return rules
# GET endpoint to list all rules by type
@app.get("/api/variant-rules/type/{rule_type}", response_model=List[VariantRule])
async def get_rules_by_type(rule_type: str):
    rules = await compendia.find({"key": "variantrules", "normalized.raw.ruleType": rule_type}).to_list()
    return rules



@app.get("/api/test")
async def test_endpoint():
    return {"message": "API is working"}

# Mount static files
app.mount("/", StaticFiles(directory="local", html=True), name="local")

# Explicitly handle the root path
@app.get("/")
async def root():
    return FileResponse(os.path.join("local", "index.html"))