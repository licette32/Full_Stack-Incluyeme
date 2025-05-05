// Funciones
// function saludar(nombre){
//     console.log("Hola, " + nombre)
// };

// saludar("Juan");

// function suma(numero1, numero2){
//     return numero1 + numero2
// }

// let resultado = suma(3, 4)
// console.log(resultado)

// const suma = (numero1, numero2) =>{
//     return numero1 + numero2
// }

// let resultado = suma(3, 4)
// console.log(resultado)


// Métodos de Array
// let frutas = ["Banana", "Manzana", "Uva"]
// // console.log(frutas)
// frutas.push("Frutilla");
// console.log(frutas)

// Objetos literales
// let persona = {
//     nombre: "Lucas",
//     Edad: 30,
//     casado: false
// }

// console.log(persona.nombre)

// let persona1 = [
//     {
//         nombre: "Lucas",
//         Edad: 30,
//         casado: false
//     }, 
//     {
//         nombre: "Lucas",
//         Edad: 30,
//         casado: false
//     }
// ]

// let numeros = [1, 2, 3, 4] // ARRAY
// numeros.forEach(numero => {
//     console.log(numero)
// })

// map
// let numerosDuplicados = numeros.map(numero => numero * 2);
// console.log(numerosDuplicados)

// Filter
// let numerosPares = numeros.filter(numero => numero % 2 === 0 )
// console.log(numerosPares)}

// reduce
// let sumaTotal = numeros.reduce((acumulador, numero) => acumulador + numero, 1500);
// console.log(sumaTotal)

// --------------------------------------------------------------------------------------------------

// CLASE 13 - SEGUIMOS CON JS

// Manipulación de DOM
// let elemento = document.getElementById('miElemento');
// let elemento1 = document.getElementsByClassName('---');
// let elemento2 = document.querySelector('.miElemento');

// elemento.innerHTML = "Nuevo contenido";
// elemento.textContent = "otro contenido";

// elemento.style.color = "red";
// elemento.style.backgroundColor = "blue";

// elemento.addEventListener('click', function(){
//     console.log("Elemento clickeado")
// });


//Asincronía y Promesas 
async function obtenerDatos() {
    try {
        let respuesta = await fetch ('https://jsonplaceholder.typicode.com/todos/1')
        let datos = await respuesta.json();
        console.log(datos)
    } catch (error) {
        console.error(error)
    }
}


obtenerDatos()