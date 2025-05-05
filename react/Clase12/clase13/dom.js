function mostrarMensaje(){
    console.log('Hola, cómo estas??')
}

document.getElementById('botonAlerta').addEventListener('click', function(){
    alert('Hola, cómo estas??')

    mostrarMensaje();
})