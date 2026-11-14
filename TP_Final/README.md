# Retail Conversion Intelligence — TP Final Integrador

**Seminario de Actualización · Tecnicatura Superior en Ciencia de Datos e IA · IFTS N.º 18 · 2026**

Proyecto académico para estimar la probabilidad de compra de una sesión de comercio electrónico, mediante un modelo propio de clasificación entrenado con scikit-learn, servido a través de FastAPI y consumido desde HTML, CSS y JavaScript.

**Estado verificado:** entrenamiento y evaluación realizados; API y frontend probados juntos **en local**. Despliegue público y documentación de entrega **pendientes**. No se informan URLs públicas hasta verificar su funcionamiento.

## Datos y modelo

- Fuente: [UCI Online Shoppers Purchasing Intention Dataset (ID 468)](https://archive.ics.uci.edu/dataset/468/online+shoppers+purchasing+intention+dataset).
- Dataset original: 12.330 sesiones; 125 filas duplicadas exactas eliminadas para este ejercicio; 12.205 registros para el modelado.
- Objetivo: `Revenue` (compra / no compra). Ocho variables de entrada.
- División estratificada 80/20 y comparación de cuatro configuraciones mediante validación cruzada sobre entrenamiento.
- Modelo seleccionado: Random Forest con `min_samples_leaf=5`.
- Métricas del test: F1 = **0,3919**; precision = **0,3425**; recall = **0,4581**; ROC-AUC = **0,7731**.
- Exportación local: `app/modelo/modelo.joblib`, aproximadamente **12,546 MB**, con **scikit-learn 1.9.1**. **Verificar que el binario esté versionado antes de desplegar.**

Las cifras son métricas académicas y no garantizan rendimiento en producción.

## Estructura

```text
TP_Final/
├── app/
│   ├── backend/          # API FastAPI + requirements.txt
│   ├── frontend/         # HTML, CSS y JavaScript
│   └── modelo/           # modelo.joblib, después de entrenar
├── data/                 # CSV público de UCI
└── notebook/
    └── entrenamiento.ipynb
```

## Ejecución local

Desde la raíz de `TP_Final` con el entorno virtual activado:

```powershell
python -m pip install -r app/backend/requirements.txt
python -m uvicorn app.backend.main:app --reload --port 8000
```

La API requiere `app/modelo/modelo.joblib`. El notebook permite generarlo con los datos originales y el entrenamiento reproducible.

En otra terminal:

```powershell
cd app/frontend
python -m http.server 5500
```

Navegador: `http://127.0.0.1:5500`. API: `http://127.0.0.1:8000/health` y `http://127.0.0.1:8000/docs`.

## Contrato básico de API

- `GET /health` → `{"estado":"ok"}`.
- `POST /predecir` recibe un JSON con las ocho variables del formulario y devuelve `prediccion`, `probabilidad_compra`, `etiqueta` y `umbral`.
- Pydantic valida los datos y devuelve HTTP 422 si el JSON no cumple el esquema. Errores internos de predicción: HTTP 500.

**Prueba local ya observada:** una sesión de ejemplo devolvió HTTP 200, `prediccion=0` y `probabilidad_compra=0.0885`. Quedan pendientes las pruebas documentadas de errores.

## Despliegue planificado

- Backend: Render Web Service, raíz del servicio `TP_Final`; instalar `app/backend/requirements.txt`; iniciar `uvicorn app.backend.main:app --host 0.0.0.0 --port $PORT`.
- Frontend: GitHub Pages, publicando el contenido de `app/frontend/` mediante una configuración o workflow de Pages.
- Configurar `ALLOWED_ORIGINS` con el origen exacto del frontend público y establecer la URL HTTPS de la API en el frontend.

**No hay despliegue público confirmado todavía.**

## Seguridad, límites y documentación

El proyecto no requiere credenciales en el código. No subir `.env`, tokens, `.venv` ni archivos temporales. El backend carga el modelo al iniciar; evitar cargar binarios de fuentes no confiables.

La decisión de eliminar filas idénticas tiene una limitación: sin identificadores únicos no se sabe si todas las coincidencias corresponden a la misma sesión.

Se utilizó IA generativa como asistencia para organizar el notebook, revisar código y desarrollar la interfaz; las métricas se obtuvieron mediante ejecución del entrenamiento.

**Pendiente para la entrega:** despliegue y enlaces públicos, evidencia de pruebas (incluidos errores reales), informe PDF, presentación y defensa.
