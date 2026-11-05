# Publicación de modelos en Hugging Face

**Materia:** Seminario de Actualización · IFTS N.º 18  
**Estudiante:** Fernanda Andrea Fava  
**Actividad:** Publicación y documentación de cuatro modelos exportados  
**Fecha de entrega:** 6 de noviembre de 2026

## Objetivo

Publicar en Hugging Face cuatro modelos entrenados con diferentes bibliotecas, revisar la documentación de cada repositorio y comparar sus requisitos de carga, reproducción y uso.

## Modelos publicados

| Ejemplo | Biblioteca | Modelo / tarea | Repositorio en Hugging Face |
|---|---|---|---|
| 01 | scikit-learn | Regresión tabular | [regresion-casas-sklearn](https://huggingface.co/FerData/regresion-casas-sklearn) |
| 02 | PyTorch | Regresión tabular | [regresion-casas-pytorch](https://huggingface.co/FerData/regresion-casas-pytorch) |
| 03 | Keras | Regresión tabular | [regresion-casas-keras](https://huggingface.co/FerData/regresion-casas-keras) |
| 04 | Transformers | Clasificación de texto | [clasificacion-texto-transformers](https://huggingface.co/FerData/clasificacion-texto-transformers) |

Cada modelo se publicó **en un repositorio propio**, con sus archivos originales y su `README.md` como Model Card. La subida se realizó desde la interfaz web de Hugging Face; no se generaron tokens para esta actividad.

## Entrega escrita

➡️ **[Cuestionario resuelto (9 preguntas)](CUESTIONARIO.md)**

## Comparación de los archivos principales

| Modelo | Artefacto entrenado | Otros archivos clave |
|---|---|---|
| scikit-learn | `model.joblib` | `requirements.txt`, `predict.py` |
| PyTorch | `model.safetensors` | `modelo.py`, `config.json` |
| Keras | `model.keras` | `requirements.txt`, `predict.py` |
| Transformers | `model.safetensors` | `config.json`, `tokenizer.json`, `tokenizer_config.json` |

## Alcance y verificaciones

- Se verificó la publicación de los cuatro repositorios y la visualización de las Model Cards.
- Se revisaron las etiquetas y los metadatos YAML al inicio de los cuatro `README.md`.
- Se comprobó visualmente la disponibilidad de **Use this model**: aparece en scikit-learn, Keras y Transformers; no apareció en el ejemplo personalizado de PyTorch.
- No se ejecutaron todos los fragmentos de código ofrecidos automáticamente por Hugging Face; por eso no se presentan como pruebas de ejecución.
- Los archivos del modelo se consultan y descargan desde sus respectivos repositorios en Hugging Face. Este directorio de GitHub reúne la **documentación de entrega**, evitando duplicar los artefactos entrenados.

## Referencia

Repositorio de ejemplos de la cátedra: [cynthiavillagra/ifts18-practica-model-cards](https://github.com/cynthiavillagra/ifts18-practica-model-cards).

**Nota:** Los ejemplos son pedagógicos y usan datos sintéticos. No representan modelos validados para aplicaciones reales.
