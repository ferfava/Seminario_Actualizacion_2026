# Retail Conversion Intelligence

**Predicción de intención de compra en comercio electrónico mediante aprendizaje automático**

Trabajo Práctico Final Integrador · Seminario de Actualización · Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial · IFTS N.º 18 · 2026

**Autora:** Fernanda Andrea Fava  
**Tipo de proyecto:** académico y experimental · clasificación binaria supervisada

[**Abrir aplicación**](https://ferfava.github.io/Seminario_Actualizacion_2026/) · [**Documentación interactiva de la API**](https://retail-conversion-api.onrender.com/docs) · [**Estado del servicio**](https://retail-conversion-api.onrender.com/health) · [**Dataset original**](https://archive.ics.uci.edu/dataset/468/online+shoppers+purchasing+intention+dataset)

---

## 1. Descripción del proyecto

**Retail Conversion Intelligence** estima la probabilidad de que una sesión de navegación de comercio electrónico termine en una compra. El usuario ingresa ocho características de la sesión en una interfaz web y recibe una estimación del modelo, junto con una clasificación basada en un umbral del **50 %**.

El proyecto integra el ciclo completo de aprendizaje automático: análisis y preparación de datos, comparación y evaluación de modelos, persistencia mediante `joblib`, exposición de predicciones con **FastAPI** y consumo desde una interfaz propia desarrollada con **HTML, CSS y JavaScript**.

> **Alcance:** prototipo académico. Las probabilidades son estimaciones, no certezas, y el sistema **no está validado para tomar decisiones comerciales reales**.

## 2. Arquitectura y despliegue

```text
Navegador del usuario
        |
        | HTTPS · HTML/CSS/JavaScript
        v
GitHub Pages (frontend)
        |
        | fetch() · JSON · CORS
        v
Render (FastAPI)
        |
        | Pipeline cargado al iniciar
        v
scikit-learn + modelo.joblib
        |
        | JSON: predicción y probabilidad
        v
Frontend: resultado y visualización
```

| Componente | Tecnología | Ubicación |
| --- | --- | --- |
| Datos y experimentación | pandas, scikit-learn, Jupyter | `data/` y `notebook/` |
| Preprocesamiento y clasificador | `Pipeline`, `ColumnTransformer`, Random Forest | `app/modelo/modelo.joblib` |
| API REST | Python, FastAPI, Pydantic, Uvicorn | Render |
| Interfaz | HTML, CSS, JavaScript, `fetch` | GitHub Pages |
| Publicación del frontend | GitHub Actions | `.github/workflows/deploy-tp-final-pages.yml` |

El frontend y la API están alojados en **orígenes distintos**. El backend permite el origen público `https://ferfava.github.io` mediante `CORSMiddleware`, además de los orígenes de desarrollo local. El plan gratuito de Render puede suspender la instancia por inactividad, por lo que la primera solicitud puede demorar.

## 3. Dataset y preparación

**Fuente:** *Online Shoppers Purchasing Intention Dataset*, UCI Machine Learning Repository (ID 468).

| Concepto | Resultado |
| --- | ---: |
| Registros originales | 12.330 |
| Columnas originales | 18 |
| Valores faltantes detectados | 0 |
| Filas duplicadas exactas retiradas | 125 |
| Registros utilizados en el modelado | 12.205 |
| Sesiones con compra tras la limpieza | 15,63 % |
| Objetivo | `Revenue` (0: no compra; 1: compra) |

Se retiraron las filas idénticas en una copia de trabajo, preservando el CSV original. **Limitación metodológica:** el dataset no identifica de manera única cada sesión; por tanto, filas iguales podrían corresponder a sesiones reales diferentes.

### Variables de entrada

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `ProductRelated` | Entero | Páginas de productos visitadas |
| `ProductRelated_Duration` | Decimal | Tiempo en páginas de productos, en segundos |
| `BounceRates` | Decimal entre 0 y 1 | Tasa de rebote |
| `ExitRates` | Decimal entre 0 y 1 | Tasa de salida |
| `Administrative` | Entero | Páginas administrativas visitadas |
| `VisitorType` | Categoría | Visitante recurrente, nuevo u otro |
| `Weekend` | Booleano | Si la sesión ocurrió durante un fin de semana |
| `Month` | Categoría | Mes de la sesión |

El dataset utilizado no registra sesiones de **enero** ni **abril**. Por coherencia con los datos de entrenamiento, esos meses aparecen deshabilitados en el formulario y la API no los acepta en el esquema de entrada.

## 4. Entrenamiento y evaluación

Se realizó una división **80 % entrenamiento / 20 % prueba**, estratificada por la variable objetivo, y se compararon **cuatro configuraciones** mediante validación cruzada de cinco particiones sobre el entrenamiento.

El preprocesamiento se integra en el `Pipeline` para evitar aplicarlo de forma independiente al conjunto de prueba: `StandardScaler` en las variables numéricas y `OneHotEncoder(handle_unknown="ignore")` en las categóricas.

**Modelo seleccionado:** Random Forest con `n_estimators=150`, `min_samples_leaf=5`, `class_weight="balanced_subsample"` y `random_state=42`.

### Resultados en el conjunto de prueba

| Métrica (clase compra) | Resultado |
| --- | ---: |
| F1-score | **0,3919** |
| Precisión | 0,3425 |
| Recall / sensibilidad | 0,4581 |
| ROC-AUC | 0,7731 |

**Matriz de confusión** (filas: valor real; columnas: predicción):

| | Predijo no compra | Predijo compra |
| --- | ---: | ---: |
| Real: no compra | 1.723 | 336 |
| Real: compra | 207 | 175 |

El modelo identificó **175 de 382 compras reales** en el conjunto de prueba y no detectó **207**. Estos resultados justifican su uso con fines de aprendizaje y demostración, **no su despliegue como motor de decisiones comerciales**.

El artefacto `app/modelo/modelo.joblib` contiene el preprocesamiento y el clasificador. Fue exportado con **scikit-learn 1.9.1** y pesa **12.545.586 bytes (12,546 MB)**.

## 5. Estructura del repositorio

```text
TP_Final/
├── README.md
├── .gitignore
├── app/
│   ├── backend/
│   │   ├── main.py
│   │   └── requirements.txt
│   ├── frontend/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   └── modelo/
│       └── modelo.joblib
├── data/
│   └── online_shoppers_intention.csv
└── notebook/
    └── entrenamiento.ipynb

.github/workflows/
└── deploy-tp-final-pages.yml
```

El workflow de GitHub Actions está en la **raíz del repositorio**, fuera de `TP_Final/`, y publica únicamente `TP_Final/app/frontend/`.

## 6. API REST: contrato y validaciones

Base URL pública: `https://retail-conversion-api.onrender.com`

| Método | Ruta | Función | Respuestas principales |
| --- | --- | --- | --- |
| `GET` | `/health` | Comprobar que el servicio responde | 200 |
| `POST` | `/predecir` | Validar datos y obtener la predicción | 200, 422, 500 |
| `GET` | `/docs` | Documentación interactiva (Swagger UI) | 200 |

### Verificar el servicio

```http
GET /health
```

Respuesta HTTP 200:

```json
{"estado": "ok"}
```

### Realizar una predicción

```http
POST /predecir
Content-Type: application/json
```

Ejemplo de solicitud válida:

```json
{
  "ProductRelated": 10,
  "ProductRelated_Duration": 627.5,
  "BounceRates": 0.02,
  "ExitRates": 0.05,
  "Administrative": 0,
  "VisitorType": "Returning_Visitor",
  "Weekend": true,
  "Month": "Feb"
}
```

**Respuesta HTTP 200 observada en la API pública:**

```json
{
  "prediccion": 0,
  "probabilidad_compra": 0.0885,
  "etiqueta": "Compra no probable",
  "umbral": 0.5
}
```

**Errores de entrada:** Pydantic devuelve **HTTP 422** si falta un campo obligatorio o si los datos incumplen el esquema. Se verificó el caso sin `Month`: `type="missing"` y `msg="Field required"`. La API contempla **HTTP 500** ante una excepción interna durante la predicción.

La probabilidad corresponde a la **clase compra**. La clasificación utiliza el umbral 0,5; una probabilidad inferior se presenta como «Compra no probable».

## 7. Ejecución local

**Requisitos:** Python compatible con las dependencias declaradas en `app/backend/requirements.txt`, acceso al repositorio y el archivo `modelo.joblib`.

Desde la raíz `TP_Final/`, crear y activar un entorno virtual:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r app/backend/requirements.txt
```

Iniciar el backend **desde `TP_Final/`**:

```powershell
python -m uvicorn app.backend.main:app --reload --port 8000
```

Verificar `http://127.0.0.1:8000/health` y `http://127.0.0.1:8000/docs`.

En una **segunda terminal**, desde `TP_Final/`:

```powershell
cd app/frontend
python -m http.server 5500
```

Abrir `http://127.0.0.1:5500`. El frontend usa inicialmente la **API pública de Render**; para probarlo contra el backend local, abrir **Conexión API**, cambiar la URL a `http://127.0.0.1:8000` y pulsar **VERIFICAR**.

### Reproducir el entrenamiento (opcional)

Instalar adicionalmente `jupyterlab`, `ipykernel` y `ucimlrepo`; abrir `notebook/entrenamiento.ipynb` y ejecutar las celdas en orden. El notebook utiliza el CSV incluido en `data/` y genera el artefacto en `app/modelo/`. Al volver a entrenar, las métricas pueden variar si se modifican datos, dependencias o parámetros.

## 8. Pruebas realizadas y despliegue público

- **API local:** `GET /health` respondió 200; `POST /predecir` devolvió una predicción con probabilidad.
- **Validación:** solicitud sin `Month` produjo **HTTP 422** con detalle del campo faltante.
- **Render:** despliegue del backend confirmado; `GET /health` y `POST /predecir` probados públicamente. El ejemplo del apartado 6 devolvió `0.0885`, igual que en local.
- **GitHub Pages:** publicación mediante GitHub Actions confirmada; interfaz cargada y conectada a Render.
- **Prueba extremo a extremo:** el simulador público mostró una probabilidad de compra del **29,6 %** para una sesión de prueba distinta.

Enlaces de verificación:

- **Frontend:** https://ferfava.github.io/Seminario_Actualizacion_2026/
- **Swagger UI:** https://retail-conversion-api.onrender.com/docs
- **Estado:** https://retail-conversion-api.onrender.com/health

## 9. Incidentes documentados y decisiones técnicas

1. **Publicación inicial de GitHub Pages.** La primera ejecución falló durante `actions/configure-pages` porque Pages aún no estaba habilitado con GitHub Actions. Se seleccionó **Settings → Pages → Source: GitHub Actions** y la ejecución siguiente terminó correctamente. [Ejecución original fallida](https://github.com/ferfava/Seminario_Actualizacion_2026/actions/runs/43648542667).
2. **Duración decimal en el formulario.** La entrada `627.5` no superaba la validación HTML por el atributo `step="1"`. Se modificó a `step="any"` y se repitió la predicción satisfactoriamente.

El despliegue utiliza **Render (plan gratuito)** para el backend y **GitHub Pages** para el frontend. La separación requiere configurar CORS, pero permite publicar un frontend estático desde el propio repositorio.

## 10. Seguridad, límites y trabajo futuro

- No se incluyen contraseñas, tokens ni archivos `.env`. Cualquier credencial futura deberá configurarse como variable de entorno en la plataforma y mantenerse fuera de GitHub.
- Los modelos serializados con `joblib` deben cargarse **solo desde fuentes confiables**.
- La instancia gratuita de Render puede entrar en reposo y sufrir **arranques en frío**. No se garantiza capacidad para 1.000 usuarios simultáneos ni alta disponibilidad.
- La precisión y la sensibilidad observadas exigen cautela. Como próximos pasos se plantea ampliar la evaluación, estudiar la calibración y los umbrales, realizar pruebas con datos más recientes y evaluar sesgos y estabilidad.

## 11. Uso de inteligencia artificial generativa

Se utilizó IA generativa como herramienta de apoyo para organizar y documentar el notebook, revisar código, depurar problemas técnicos y diseñar el frontend. El entrenamiento, las métricas, las pruebas HTTP y el despliegue se verificaron mediante la ejecución del proyecto. Se documentaron tanto los resultados como sus limitaciones.

---

**Uso educativo · IFTS N.º 18 · 2026**  
Fuente de datos: [UCI Machine Learning Repository — Online Shoppers Purchasing Intention Dataset](https://archive.ics.uci.edu/dataset/468/online+shoppers+purchasing+intention+dataset).
