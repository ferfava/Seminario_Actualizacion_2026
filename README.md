# Seminario de Actualización · 2026

**Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial · IFTS N.º 18**

Repositorio académico de **Fernanda Andrea Fava**, organizado por clases y proyectos integradores. Documenta el aprendizaje y la aplicación práctica de Python, aprendizaje automático, interfaces interactivas, APIs y despliegue de aplicaciones de inteligencia artificial.

Cada actividad conserva su propia estructura, código y documentación para facilitar su revisión y reproducción.

---

## Proyecto destacado · Trabajo Práctico Final Integrador

### [Retail Conversion Intelligence](TP_Final/)

**De cada clic, una predicción.** Aplicación web que estima la probabilidad de compra de una sesión de comercio electrónico a partir de un modelo de clasificación entrenado con datos públicos.

El proyecto recorre el flujo completo de ciencia de datos: preparación del dataset, comparación de modelos, evaluación, exportación con `joblib`, publicación de una API FastAPI y consumo mediante un frontend propio con HTML, CSS y JavaScript.

| Componente | Enlace |
| --- | --- |
| **Aplicación interactiva** | [Abrir Retail Conversion Intelligence](https://ferfava.github.io/Seminario_Actualizacion_2026/) |
| **API y documentación Swagger** | [Consultar endpoints en Render](https://retail-conversion-api.onrender.com/docs) |
| **Estado de la API** | [GET /health](https://retail-conversion-api.onrender.com/health) |
| **Código, notebook y modelo** | [Carpeta `TP_Final/`](TP_Final/) |
| **Documentación técnica completa** | [README del Trabajo Práctico Final](TP_Final/README.md) |

**Resumen técnico:** dataset UCI *Online Shoppers Purchasing Intention* · **12.205** registros después de retirar duplicados exactos · **Random Forest** · **F1: 0,3919** · **ROC-AUC: 0,7731** en el conjunto de prueba.

> Proyecto **académico y experimental**. Las estimaciones no se encuentran validadas para tomar decisiones comerciales en producción. El servicio gratuito de Render puede requerir un tiempo adicional para responder después de un período de inactividad.

---

## Recorrido de aprendizaje

| Etapa | Actividad | Documentación y entregables |
| --- | --- | --- |
| Clase 1 | Encuesta inicial | Sin entregable técnico |
| [Clase 2](clase-02/proyecto_integrador/) | Entorno de desarrollo y Git | Proyecto Python, entorno virtual y dependencias |
| [Clase 3](clase-03/) | Control de versiones | Git, repositorio, resolución de situaciones y ticket de salida |
| [Clase 4](clase-04/) | Interfaces con Gradio | Aplicación con `Blocks`, controles y funciones conectadas |
| [Clase 5](clase-05/) | Despliegue y documentación | Aplicaciones publicadas en Render y Streamlit Community Cloud |
| [Clase 6](clase-06/) | Revisión de pares | Evaluación técnica y propuesta de mejora de un repositorio |
| [Clase 7](Clase_07/) | Inferencia local y remota | `pipeline` vs. `InferenceClient` en aplicaciones Gradio y Streamlit |
| [Clase 10](clase_10/) | Entrenamiento de modelos | scikit-learn, PyTorch, Keras, exportación y exploración de skops |
| [Clase 11](clase-11/) | Publicación de modelos | Modelos en Hugging Face, Model Cards y [cuestionario](clase-11/CUESTIONARIO.md) |
| [TP Integrador](TP_Integrador/) | Clasificación de mensajes | Clasificación multilingüe *zero-shot*, evaluación y aplicación Gradio |
| **[TP Final Integrador](TP_Final/)** | **Modelo propio, API y web pública** | **Entrenamiento con scikit-learn, FastAPI, frontend y despliegue** |

El índice refleja las carpetas efectivamente presentes en el repositorio; no implica que todas las clases del programa hayan tenido una entrega publicada.

## Aplicaciones y demostraciones

| Proyecto | Plataforma | Enlace |
| --- | --- | --- |
| **Retail Conversion Intelligence (TP Final)** | GitHub Pages + Render | [Abrir aplicación](https://ferfava.github.io/Seminario_Actualizacion_2026/) |
| Aplicación Gradio (clase 5) | Render | [Abrir Gradio](https://seminario-actualizacion-gradio.onrender.com/) |
| Aplicación Streamlit (clase 5) | Streamlit Community Cloud | [Abrir Streamlit](https://seminarioactualizaci-n2026-4jnqjkm8rq9pkcf6onb4yl.streamlit.app/) |

Los enlaces se incluyen como registro de las publicaciones realizadas. Los servicios gratuitos pueden suspenderse por inactividad o cambiar su disponibilidad.

## Herramientas y competencias trabajadas

- **Programación y datos:** Python, pandas, Jupyter Notebook y scikit-learn.
- **Modelos de IA:** aprendizaje supervisado, transformers, clasificación *zero-shot*, PyTorch y Keras.
- **Interfaces y servicios:** Gradio, Streamlit, HTML, CSS, JavaScript, FastAPI, Pydantic y JSON.
- **Publicación y colaboración:** Git, GitHub, GitHub Actions, Hugging Face Hub, Render y GitHub Pages.
- **Prácticas de ingeniería:** entornos virtuales, dependencias, validación de entradas, documentación, evaluación y análisis de limitaciones.

## Cómo utilizar el repositorio

1. Entrar en la carpeta de la clase o proyecto de interés.
2. Leer su `README.md` para conocer los objetivos, archivos y pasos de ejecución.
3. Crear un entorno virtual independiente e instalar las dependencias indicadas para esa actividad.
4. Consultar los notebooks, el código y, cuando corresponda, las aplicaciones publicadas.

**Para el TP Final**, la guía completa de instalación, el contrato de la API, las métricas, las pruebas y las limitaciones están documentados en [`TP_Final/README.md`](TP_Final/README.md). El archivo `requirements.txt` de su backend se encuentra en [`TP_Final/app/backend/requirements.txt`](TP_Final/app/backend/requirements.txt).

No deben subirse claves, tokens, archivos `.env`, entornos virtuales ni información sensible. Los modelos serializados se deben cargar únicamente desde fuentes confiables.

## Transparencia académica

En distintas actividades se utilizó IA generativa como apoyo para explorar alternativas, revisar código, depurar errores y mejorar documentación. Las implementaciones, pruebas y resultados presentados se describen en los archivos correspondientes. Se distinguen los experimentos académicos de las aplicaciones validadas para producción.

---

**Fernanda Andrea Fava** · Seminario de Actualización · **IFTS N.º 18 · 2026**
