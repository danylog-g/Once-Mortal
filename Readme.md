# ReadMe

You can either download this or to use the static stuff go [here](https://danylog-g.github.io/Once-Mortal).

## Windows Installation
### In the root folder do the following:
> Open Powershell and do things
- python -m venv venv
- venv\Scripts\activate
- pip install fastapi uvicorn[standard] motor python-dotenv
- uvicorn app:app --host 0.0.0.0 --port 8000