# Detector de expresiones  AI

Equipo: [Ximena Muñoz](https://github.com/Anemix011), [Laura Simunovic Toledo](https://github.com/simunovicla) y [Fernanda Valdés](https://github.com/fernandavl).

## Materiales:

- Laptop/Computador/Ipad con Webcam
- [Editor web de p5.js](https://editor.p5js.org/)
- Visual Studio  Code
- Notion

## Referentes:

- Facemesh de ml5 para editor p5.js

## Metas a realizar:

- Detectar los puntos de las diferentes expresiones (2 por lo menos)
- Incluir colores asociados al tipo de expresión RGB (con arduino)
- Agregar sonido en aumento al cambio de una expresión a otra

## Comenzando…

Empezamos con la idea de trabajar con el proyecto anterior (Are you smiling yet?**),** donde se trabajo con  arquetipos faciales, en el cual se basándonos en el [modelo de Facemesh](https://learn.ml5js.org/#/reference/facemesh) en [siguiente arículo de koraboo](https://www.koreaboo.com/lists/korean-face-shape-animal-puppy-cat-bunny-deer-fox-celebrities-idols/) para determinar parámetros que pudiésemos utilizar para que el programa decidiese otorgar cada arquetipo a la persona frente a la cámara.

Para poder continuar con el desarrollo de este modelo necesitamos investigar más a profundidad arquetipos faciales, para poder distinguir las diferentes tipos de expresiones. Estas las dividimos en 3 principales; alegria (sonrisa), enojo (fruncir el seño) y la expresión neutra (donde no se ve mayor cambio al estado relajado de la cara).

## **Trabajando el modelo**

Como ya teníamos la base para el desarrollo del proyecto (donde se detectaba la expresión de sonrisa), teníamos que ajustar los diferentes puntos de la cara para poder crear los otros dos modelos (en teoría).

Al comenzar el trabajo detectamos errores en el proyecto pasado, decomisos completarlo y mejorarlo los errores que teníamos eran `//textoHMTL.innerHTML= “smile”;` al estar invocando algo que no estaba planteado anteriormente.  

Recurrimos a una asesoría con un especialista en el área de la informática de la arquitectura Cloud (Oscar Muñoz), para aclarar dudas y detectar errores. Y pudimos entender con mayor claridad  las posibilidades del modelo que podíamos lograr con los datos que teníamos puesto que nos demoramos mucho en tratar de plantear las expresiones.

![ReuniónMeet](https://github.com/simunovicla/audiv027-2023-2/blob/main/clases/clase-13/estudiantes/simunovicla/Imagenes/5.png)

Ocupamos Visual Studio  Code (drawkeypoint)  para poder identificar de mejor manera los errores y determinar la forma de solucionarlos.

Trabajamos en base a los resultados de las variables más constante vs menos constante (keypoint), en donde ajustábamos las distancias entre las mejillas y las comisuras de los labios dejándolo en <70% para detectar la sonrisa o “smile”, pero este valor no era ajustable a los distintos tipos de rostros, ya que al haber medidas diferentes entre las mejillas y las comisuras de la boca era difícil de detectar al comportarse de diferente manera.

Esto era poco sensible puesto que son menos keypoint.

Añadimos distancia entre las variables y agregamos más keypoint para que la detección de la sonrisa sea mas precisa y que la predicción del calculo de la sonrisa “smile” no sea tan variable. Dejando la media en <80% 

 Luego queríamos detectar cuando no se esta sonriendo llamandolo “not smiling” en las variables, como ya existía el calculo previo fue más fácil ajustar las medidas de este dejándolo en “smile”> 80% y “not smiling”<80% (siendo la media de 80%). 

Queríamos hacer que el proyecto arrojará resultados más concretos para poder tener un mejor resultado, puesto que arrojaba el % de la sonrisa y un constante cambio de resultados. Gracias a esto comprendimos que el Facemesh realiza un análisis constante a través de los keypoint del rostro, y para poder determinar los cambios del rostro “smile” y “not smiling” entrega resultados constante, transformandolo en un bucle infinito.

Necesitábamos determinar un valor más preciso, para que entregue algo más especifico 

Tratamos de agregar `Console.clear( )` para detener este bucle y tener solo un resultado, ya que Consolo.clear() limpia la consola depues de entregar el resultado para luego iniciar el calculo nuevamente.

Esto no resulto ya que al querer detener este bucle constante, `Console.clear()` detenía completamente la acción de analizar constantemente los keypoints, por lo tanto no nos entregaba ningún resultado de “smile” y “not smiling”.

![Sonrisa y no sonrisa](https://github.com/simunovicla/audiv027-2023-2/blob/main/clases/clase-13/estudiantes/simunovicla/Imagenes/1.png)

Agregamos el `let wasSmiling=false;` este no detiene el bucle constante de resultados, sino que delimita a solo entregar un resultado actual entre los cambios de ”smile”y “not smile, ya que este actualiza el estado. Esto ayudo a que los resultados fueran mejores.

Finalmente decidimos experimentar con otros sujetos:

![Prueba 1 “gato Cato”: como resultado la consola detecta su rostro pero también determina que no esta sonriendo](https://github.com/simunovicla/audiv027-2023-2/blob/main/clases/clase-13/estudiantes/simunovicla/Imagenes/2.png)

Prueba 1 “gato Cato”: como resultado la consola detecta su rostro pero también determina que no esta sonriendo

![Prueba 2 “Stickers rostro de un Artista”: como resultado la consola detecta el rostro en el Stickers pero también determina que no esta sonriendo.](https://github.com/simunovicla/audiv027-2023-2/blob/main/clases/clase-13/estudiantes/simunovicla/Imagenes/3.png)

Prueba 2 “Stickers rostro de un Artista”: como resultado la consola detecta el rostro en el Stickers pero también determina que no esta sonriendo.

| Umbral sonrisa | Umbral no sonrisa |
| --- | --- |
| <80% | >80% |

Luego agregamos la expresión de ceño, las cuales tenían puntos de distancia de cara: 71 , 301 y los puntos variables siendo 417 y 285 determinado si el ceño esta fruncido. Agregándolo como “ceño fruncido”, para luego agregar el “ceño neutro”.

| Umbral sonrisa | Umbral no sonrisa |
| --- | --- |
| <80% | >80% |

![Modelo Final](https://github.com/simunovicla/audiv027-2023-2/blob/main/clases/clase-13/estudiantes/simunovicla/Imagenes/4.png)

## Resultados:

1. Generar otra predicción utilizando los mismos resultado de la sonrisa.
2. Logramos utilizar un comando antes desconocido, para limitar la cantidad de resultados redundantes en la consola, aumentando la eficiencia del código y que logre entregar un resultado actualizado.
3. Que el modelo interprete la imagen en tiempo real, para distinguir entre dos estados del ceño del usuario en pantalla: Fruncido y neutro.
4. Se nos presenta la posibilidad de interpretar los resultados en formato de Emojis o texto, si bien esto no se pudo realizar en forma completo debido a limitaciones técnicas de las herramientas utilizadas. 

### Posibles mejoras:

1.- Agregar distancia y más keypoint, esto ayudaría a que los cambios en los resultados de los cálculos no tengan tanta variaciones y sean resultados específicos y actualizados.

2.- Adicionalmente, se podrían limpiar más el código para lograr utilizar la funcionalidad de emojis representando las expresiones faciales. 

## **Conclusión**

El FaceMesh tiene muchas posibilidades de mejoras y puede ser transformado para ser utilizado para distintos fines, su análisis constante de los keypoint puede determinar distintos resultados, los keypoint tiene la capacidad de reconocer aspectos pequeños y tiene la capacidad de adaptarse a distintos rostros sin la necesidad de tener un banco de imágenes ya predeterminadas.

**Asesor Externo:** Oscar Muñoz

**Gerente ejecutivo:** Gato Cato
