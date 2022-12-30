const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load',function(){
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e) {
    e.preventDefault()

    //Validacion
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if ([ciudad,pais].includes('')) {
        mostrarError('Ambos campos son obligatorios')
        return
    }

    consultarAPI(ciudad,pais)
}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta) {
        const alerta = document.createElement('div')
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center')
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 5000);
    }
}

function consultarAPI(ciudad,pais) {
    const appId = 'bc5ad6050bbaa9f2fea3dc95d77b3da4'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner()
    
    fetch(url).then(respuesta => {
        return respuesta.json()
    }).then(datos => {
        limpiarHTML()
        if(datos.cod === '404') {
            mostrarError('City not found')
            return
        }

        // Imprimir HTML
        mostrarClima(datos)

    })
}

function mostrarClima(datos) {
    const {name, main: {temp,temp_max,temp_min}} = datos

    const grados = kelvinACentigrados(temp)
    const gradosMin = kelvinACentigrados(temp_min)
    const gradosMax = kelvinACentigrados(temp_max)


    const actual = document.createElement('div')
    actual.innerHTML = `
    <p>Weather in ${name}</p>
    <p class="text-6xl">${grados} &#8451.</p>
    <p>Min: ${gradosMin} &#8451.</p>
    <p>Max: ${gradosMax} &#8451</p>
    `
    actual.classList.add('font-bold','text-2xl')
    
    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center','text-white')
    resultadoDiv.appendChild(actual)

    resultado.appendChild(resultadoDiv)
}

function kelvinACentigrados(grados) {
    grados = Number(grados - 273.15).toFixed(2)
    return grados
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {

    limpiarHTML()

    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner)
}