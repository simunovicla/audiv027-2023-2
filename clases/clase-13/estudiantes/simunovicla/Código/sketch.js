let facemesh;
let video;
let predictions = [];
let sonrisa = [];
//let textoHTML;
// para que se pare el bucle, se utiliza la siguiente variable
let wasSmiling = false;
let cejas = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  //textoHTML = document.getElementById("smile");
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);
  

  // We can call both functions to draw all keypoints

  drawKeypoint();

  //textoHTML.innerHTML = "smile";
}

// A function to draw ellipses over the detected keypoints
function drawKeypoint() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    const [x_61, y_61] = keypoints[61];
    const [x_291, y_291] = keypoints[291];

    //para determinar la sonrisa, comenzamos por determinar la distancia entre dos puntos ubicados en la boca. Esta distancia, se guarda en la variable distanciaBoca
    let distanciaBoca = x_291 - x_61;
    //console.log(distanciaBoca);

    const [x_454, y_454] = keypoints[454];
    const [x_134, y_134] = keypoints[134];
    const [x_417, y_417] = keypoints[417];
    const [x_285, y_285] = keypoints[285];
    
    //obtener un punto de referencia, para poder comparar con las diferencias de distancia entre los puntos de sonrisa. Esta info se guarda en distanciaCaraB
    let distanciaCaraB = x_454 - x_134;
    //console.log("Distancia Cara "+distanciaCara);

    //para obtener un porcentaje que pudise determinar si se está sonriendo o no, se realiza una división, establecer una relación entre los valores anteriormente obtenidos. 
    let porcentajeBoca = distanciaBoca / distanciaCaraB;
    //console.log("Distancia Boca "+porcentaje);

    //Se determina si es que la persona esta sonriendo actualmente, en base la comparación entre el valor del porcentaje obtenido con un valor determinado por nosotrxs. 
    let isSmilingNow = porcentajeBoca > 0.8;

    //Tras determinar si se esta sonriendo o no, se ingresa el resultado a la consola. 
    if (isSmilingNow !== wasSmiling) {
      if (isSmilingNow) {
        console.log("sonriendo");
      } else {
        console.log("no sonriendo");
      }
      wasSmiling = isSmilingNow; // Actualiza el estado de la sonrisa
    }
    //determinar la psición del ceño (ceño es referido como ceno por universalidad)
let posiciónCeno = x_417 - x_285;
    //console.log(distanciaBoca);

    const [x_71, y_71] = keypoints[71];
    const [x_301, y_301] = keypoints[301];

    //obtener un punto de referencia, para poder comparar con las diferencias de distancia entre los puntos de ceño. Esta info se guarda en distanciaCaraC
    let distanciaCaraC = x_71 - x_301;
    //console.log("Distancia Cara "+distanciaCara);

    //para obtener un porcentaje que pudise determinar si el ceño se encuentra neutro o fruncido, establecer una relación entre los valores anteriormente obtenidos. 
    let porcentajeCeno = posiciónCeno / distanciaCaraC;
    //obtener resultado de cálculo, para poder tener valores de referencia
    //console.log("porcentajeceño "+porcentajeCeno);
        //Se determina el estado del ceño de la persona, en base la comparación entre el valor del porcentaje obtenido con un valor determinado por nosotrxs. 
    let CenoFruncido = porcentajeCeno > 0.045;

    //Tras determinar si se esta sonriendo o no, se ingresa el resultado a la consola. 
    if (CenoFruncido !== cejas) {
      if (CenoFruncido) {
        console.log("Ceño Fruncido");
      } else {
        console.log("Ceño neutro");
      }
      cejas = CenoFruncido; // Actualiza el estado del ceño
    }

    // Draw facial keypoints. Esto nos ayuda a referenciar la posición de cada keypoint en un rostro real, en tiempo real. 
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      if (j == 61 || j == 13 || j == 291 || j == 285 || j == 417) {
        fill(0, 255, 0);
        ellipse(x, y, 5, 5);
      }
            
    }
  }

//console.log(keypoints.lips);


  }

