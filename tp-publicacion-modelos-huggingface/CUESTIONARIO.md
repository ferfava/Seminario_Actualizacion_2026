# Cuestionario — Publicación de modelos en Hugging Face

**Seminario de Actualización · IFTS N.º 18**  
**Estudiante:** Fernanda Andrea Fava

## 1. ¿De qué forma subiste los archivos? Si usaste un token de Hugging Face, ¿qué permiso le diste y dónde quedó guardado? ¿Por qué no hay que escribirlo en el código ni subirlo a GitHub?

La publicación de los cuatro modelos se realizó desde la interfaz web de Hugging Face. Creé un repositorio independiente para cada uno y cargué los archivos con **Upload files**.

No necesité generar un token porque trabajé desde mi cuenta con la sesión iniciada. Si hubiera utilizado VS Code o la terminal, habría requerido una credencial con permisos de escritura sobre los repositorios correspondientes, guardada de manera segura, por ejemplo, en un gestor de credenciales.

Un token no debe incluirse en el código ni publicarse en GitHub porque es una credencial privada. Si queda expuesto, otra persona podría realizar operaciones con los permisos que tenga asociados.

## 2. ¿Qué etiquetas aparecen en cada Model Card y de qué parte del README.md salen?

Las etiquetas identifican la tarea, la biblioteca, el idioma, el formato de almacenamiento y otras características del modelo.

| Modelo | Etiquetas observadas |
|---|---|
| Scikit-learn | Tabular Regression, Scikit-learn, Joblib, Spanish, machine-learning, regression, linear-regression, educational-example, licencia MIT |
| PyTorch | Tabular Regression, PyTorch, Safetensors, Spanish, machine-learning, regression, linear-regression, educational-example, licencia MIT |
| Keras | Tabular Regression, Keras, Spanish, machine-learning, regression, linear-regression, educational-example, licencia MIT |
| Transformers | Text Classification, Transformers, Safetensors, Spanish, bert, machine-learning, educational-example, text-embeddings-inference, licencia MIT |

La mayoría proviene del bloque de metadatos YAML ubicado al comienzo de `README.md`. Los campos `language`, `library_name`, `pipeline_tag`, `tags` y `license` describen el idioma, la biblioteca, la tarea, las etiquetas adicionales y la licencia.

Hugging Face también puede mostrar etiquetas derivadas de los archivos o de integraciones detectadas. Por ejemplo, **Joblib** en scikit-learn y **text-embeddings-inference** en Transformers no figuraban literalmente en el YAML revisado.

## 3. En cada repositorio, ¿cuál es el archivo del modelo entrenado? ¿Cuáles se necesitan para usarlo y cuáles sirven para reproducirlo?

| Modelo | Archivo entrenado | Necesario para utilizarlo |
|---|---|---|
| Scikit-learn | `model.joblib` | Modelo serializado y dependencias compatibles |
| PyTorch | `model.safetensors` | Pesos, `modelo.py` y `config.json` |
| Keras | `model.keras` | Archivo guardado y Keras compatible |
| Transformers | `model.safetensors` | Pesos, `config.json`, `tokenizer.json` y `tokenizer_config.json` |

En scikit-learn y Keras, los formatos utilizados permiten recuperar el modelo entrenado de forma directa con sus bibliotecas. PyTorch conserva los pesos separados de la definición de la red. Transformers necesita, además, su configuración y el tokenizer para transformar los textos en las entradas numéricas esperadas.

Para reproducir el entrenamiento se utiliza `train.py`, con las dependencias de `requirements.txt` y los datos o el procedimiento que los genera. Los archivos `predict.py` y, cuando está presente, `predict_hub.py` muestran cómo cargar y utilizar los modelos.

## 4. Los repositorios 02 (PyTorch) y 04 (Transformers) tienen un config.json. ¿Guardan lo mismo? ¿Qué guarda cada uno?

No guardan lo mismo. En PyTorch, `config.json` describe las entradas y la salida e incluye los valores de media y desvío estándar utilizados para normalizar las variables. Esa información es necesaria para aplicar el mismo preprocesamiento durante las predicciones.

En Transformers, `config.json` describe la arquitectura BERT: cantidad de capas, tamaño de las representaciones, cabezas de atención y correspondencia entre identificadores y etiquetas de clasificación.

Por lo tanto, en el primer caso la configuración está centrada en cómo preparar los datos; en el segundo, en cómo reconstruir la arquitectura del modelo.

## 5. ¿Por qué el repositorio de PyTorch necesita modelo.py y el de Keras no necesita ningún archivo parecido?

En el ejemplo de PyTorch, `model.safetensors` guarda los pesos aprendidos, pero no la definición de la red. Por eso es necesario `modelo.py`: permite crear la clase `RegresionLineal` antes de cargar esos pesos.

Keras utiliza `model.keras`, que guarda la arquitectura, los pesos y la configuración de las capas, incluida la normalización. Como este ejemplo usa capas estándar, se puede recuperar directamente mediante `load_model()` sin definir otro archivo de arquitectura.

## 6. En el TP usamos InferenceClient con cardiffnlp/twitter-xlm-roberta-base-sentiment. ¿Se puede usar alguno de tus cuatro modelos de la misma forma? ¿Por qué?

No de manera automática. Publicar un modelo en Hugging Face no implica que exista un servicio remoto disponible para consultarlo con `InferenceClient`.

El ejemplo más cercano es el clasificador de Transformers, porque también recibe texto y devuelve una etiqueta. Sus archivos permiten descargarlo y ejecutarlo localmente mediante `pipeline()`. Para consultarlo como en clase, tendría que estar servido por un proveedor de inferencia compatible o por un endpoint desplegado.

La diferencia es entre **tener archivos publicados para ejecutar un modelo** y **tener un servicio remoto que atiende solicitudes de inferencia**.

## 7. Tocá Use this model en cada repositorio. ¿En cuáles aparece? ¿El código que propone funcionaría con tus archivos? Si en alguno no aparece o no funciona, ¿por qué te parece que pasa?

| Repositorio | ¿Aparece? | Opciones observadas |
|---|---|---|
| Scikit-learn | Sí | Scikit-learn, Google Colab y Kaggle |
| PyTorch | No | No aparece |
| Keras | Sí | Keras, Google Colab y Kaggle |
| Transformers | Sí | Transformers, Google Colab y Kaggle |

En PyTorch no apareció la opción. Es un modelo con arquitectura personalizada y sus pesos, por sí solos, no permiten reconstruirlo automáticamente: hace falta la clase de `modelo.py`.

En los otros tres repositorios Hugging Face reconoce integraciones con las bibliotecas. De todos modos, que aparezca un ejemplo de código no garantiza que funcione sin cambios. Para scikit-learn debería cargar `model.joblib`; para Keras, `model.keras`; y para Transformers, los pesos, la configuración y el tokenizer deberían permitir el uso local mediante `pipeline()`.

Los ejemplos ofrecidos por la plataforma no se ejecutaron durante esta revisión, así que la compatibilidad indicada es una evaluación de los archivos publicados, no una prueba de ejecución.

## 8. Si una compañera o un compañero quiere usar tu modelo de PyTorch, ¿qué tiene que tener en su código además de lo que baja del Hub?

Necesita instalar las bibliotecas requeridas y escribir el procedimiento de carga. Debe importar la clase `RegresionLineal` desde `modelo.py`, crear una instancia con la misma arquitectura y cargar el `state_dict` desde `model.safetensors`.

También debe leer `config.json`, respetar el orden de las entradas (`m2`, `balcon`, `ascensor`) y aplicar la normalización con la media y el desvío del entrenamiento. Finalmente, debe poner el modelo en modo evaluación con `eval()` y realizar la inferencia sin calcular gradientes.

Si cambia la arquitectura, los pesos pueden no cargar; si omite la normalización, las predicciones pueden ser incorrectas. Los ejemplos `predict.py` y `predict_hub.py` sirven de referencia.

## 9. Además de Hugging Face, ¿dónde más se podría compartir un modelo? ¿Qué le faltaría a ese lugar comparado con el Hub?

Una alternativa es GitHub, donde pueden compartirse el código, la documentación y los artefactos del modelo. También se podrían distribuir los archivos mediante un servicio de almacenamiento como Google Drive.

Hugging Face, en cambio, está orientado específicamente a modelos de Machine Learning: organiza sus archivos con una Model Card, muestra metadatos de tareas y bibliotecas, facilita su descubrimiento y permite integrarlos con herramientas de carga e inferencia. Esas funciones no están todas disponibles de manera nativa en un repositorio de GitHub o en una carpeta compartida.

Ambas plataformas pueden complementarse: GitHub para documentar y versionar el trabajo y Hugging Face para distribuir los modelos entrenados.

---

## Repositorios de los cuatro modelos

- [01 — Scikit-learn](https://huggingface.co/FerData/regresion-casas-sklearn)
- [02 — PyTorch](https://huggingface.co/FerData/regresion-casas-pytorch)
- [03 — Keras](https://huggingface.co/FerData/regresion-casas-keras)
- [04 — Transformers](https://huggingface.co/FerData/clasificacion-texto-transformers)
