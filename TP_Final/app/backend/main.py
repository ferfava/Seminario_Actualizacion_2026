from contextlib import asynccontextmanager
from pathlib import Path
import os
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

MODEL_PATH = Path(__file__).resolve().parents[1] / "modelo" / "modelo.joblib"
state = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    if not MODEL_PATH.exists():
        raise RuntimeError(f"Falta modelo entrenado en {MODEL_PATH}. Ejecutar notebook/entrenamiento.ipynb")
    state["modelo"] = joblib.load(MODEL_PATH)  # carga una sola vez
    yield
    state.clear()

app = FastAPI(title="Retail Conversion Intelligence API", version="1.0.0", lifespan=lifespan)
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5500,http://127.0.0.1:5500,http://localhost:8000").split(",")
app.add_middleware(CORSMiddleware, allow_origins=[x.strip() for x in origins], allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

class Sesion(BaseModel):
    ProductRelated: int = Field(ge=0, le=1000)
    ProductRelated_Duration: float = Field(ge=0, le=100000)
    BounceRates: float = Field(ge=0, le=1)
    ExitRates: float = Field(ge=0, le=1)
    Administrative: int = Field(ge=0, le=1000)
    VisitorType: str = Field(pattern=r"^(Returning_Visitor|New_Visitor|Other)$")
    Weekend: bool
    Month: str = Field(pattern=r"^(Feb|Mar|May|June|Jul|Aug|Sep|Oct|Nov|Dec)$")

@app.get('/health')
def health():
    return {"estado": "ok"}

@app.post('/predecir')
def predecir(sesion: Sesion):
    try:
        import pandas as pd
        row = pd.DataFrame([sesion.model_dump()])
        modelo = state['modelo']
        prob = float(modelo.predict_proba(row)[0, 1])
        pred = int(modelo.predict(row)[0])
        return {"prediccion": pred, "probabilidad_compra": round(prob, 4), "etiqueta": "Compra probable" if pred else "Compra no probable", "umbral": 0.5}
    except Exception as exc:
        raise HTTPException(status_code=500, detail="No se pudo realizar la predicción") from exc
