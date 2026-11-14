# Retail Conversion Intelligence · FerDataTech

Proyecto académico — Seminario de Actualización (IFTS 18, 2026).

**Estado:** código inicial listo; modelo pendiente de entrenamiento local y despliegue pendiente. No reportar métricas ni URLs hasta comprobarlas.

## Dataset
UCI Online Shoppers Purchasing Intention Dataset (ID 468; Sakar & Kastro, 2018; CC BY 4.0): https://archive.ics.uci.edu/dataset/468/online+shoppers+purchasing+intention+dataset

## Preparación
1. Crear un entorno virtual en la raíz de `TP_Final`.
2. Instalar `pip install -r app/backend/requirements.txt jupyterlab ipykernel ucimlrepo matplotlib seaborn`.
3. Abrir `notebook/entrenamiento.ipynb` y ejecutar **todas** las celdas. Usa el CSV local si está disponible (o lo descarga desde UCI) y genera `app/modelo/modelo.joblib`.
4. Iniciar API desde `TP_Final`: `uvicorn app.backend.main:app --reload --port 8000`.
5. Iniciar web desde `TP_Final/app/frontend`: `python -m http.server 5500`.
6. Abrir `http://localhost:5500` y verificar conexión API.

## API
- `GET /health` → `{"estado":"ok"}` (200)
- `POST /predecir` → `{"prediccion":0,"probabilidad_compra":0.1234,"etiqueta":"Compra no probable","umbral":0.5}` **solo ejemplo de estructura, no predicción real** (200, 422 o 500)
- `/docs` → documentación Swagger de FastAPI.

## Despliegue previsto
Backend Render: Root Directory `TP_Final`, Build Command `pip install -r app/backend/requirements.txt`, Start Command `uvicorn app.backend.main:app --host 0.0.0.0 --port $PORT`. Agregar `ALLOWED_ORIGINS=https://<usuario>.github.io` (dominio exacto, sin barra final). Frontend GitHub Pages: alojar `app/frontend` mediante un workflow de Pages o carpeta publicada; cambiar campo API URL por la URL de Render. No hay deploy todavía.

**Importante:** sin `modelo.joblib`, FastAPI fallará al iniciar por diseño. No se incluyen credenciales ni archivos `.env`.

## Organización del notebook
El notebook está ordenado por: librerías, carga, exploración, selección de variables, entrenamiento, evaluación, exportación y conclusiones. Contiene resultados reales del diagnóstico inicial y celdas de entrenamiento todavía sin ejecutar.

## Notas para GitHub
El CSV original está en la carpeta `data/` del ZIP local. Se puede volver a descargar desde UCI al ejecutar el notebook, por lo que no es obligatorio versionar el CSV. No subir `.venv/`, `__pycache__/`, `.env` ni credenciales.
