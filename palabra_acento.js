const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const vocales = ["a", "e", "i", "o", "u"];
const vocales_tildes = ["á", "é", "í", "ó", "ú"];

function determina_palabra(palabra) {
  const palabra_analisis = palabra.toLowerCase();
  let tilde = false;
  let posicion_tilde = 0;
  let vocales_total = 0;
  console.log(palabra_analisis);
  //se determina cuantas vocales tiene la palabra, se toman como una sola vocal si hay vocales consecutivos
  for (let i = 0; i < palabra_analisis.length; i++) {
    if (vocales.includes(palabra_analisis[i]) || vocales_tildes.includes(palabra_analisis[i])) {
      let siguiente = palabra_analisis[i + 1];
      console.log(
        i + ": " + vocales.includes(palabra_analisis[i]) ||
          vocales_tildes.includes(palabra_analisis[i])
      );
      vocales_total++;
      if (vocales_tildes.includes(palabra_analisis[i])) {
        tilde = true;
        posicion_tilde = vocales_total;
      }
      while (
        vocales.includes(siguiente) ||
        vocales_tildes.includes(siguiente)
      ) {
        if (vocales_tildes.includes(palabra_analisis[i])) {
          tilde++;
          tilde = true;
          posicion_tilde = vocales_total;
        }
        i++;
        siguiente = palabra_analisis[i];
      }
    }
  }

  //Si salio una tilde se dermina si es aguda, grave, esdrujula o sobreesdrujula
  if (tilde) {
    let key = vocales_total - posicion_tilde;
    switch (key) {
      case 0:
        console.log(`La palabra ${palabra} es aguda con acento`)
        break;
      case 1:
        console.log(`La palabra ${palabra} es grave con acento`)
        break;
      case 2:
        console.log(`La palabra ${palabra} es esdrujula`)
        break;
      default:
        console.log(`La palabra ${palabra} es sobreesdrujula`)
        break;
    }
  } else {
    if (vocales.includes(palabra_analisis[palabra_analisis.length - 1]) ||
      ["n", "s"].includes(palabra_analisis[palabra_analisis.length - 1])) {
        console.log(`La palabra ${palabra} es aguda no trae el acento`)
    }else{
      console.log(`La palabra ${palabra} es aguda sin acento`)
    }
  }
}

/*Funcion recursiva que se estara llamando a si misma mientras el usuario no escriba en la termial EXIT exactamente
Fragmento de codigo obtenido del foro stackoverflor. Fuente: https://stackoverflow.com/questions/24464404/how-to-readline-infinitely-in-node-js
*/
let recursiveAsyncReadLine = function () {
  rl.question("Ingresa una palabra (EXIT para salir): ", function (respuesta) {
    if (respuesta === "EXIT") return rl.close();
    determina_palabra(respuesta);
    recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();
