import { IdManager } from './idManagerLib.js';

//DECLARANDO VARIABLES
const tiempoTarea = 25 * 60;              //duración de una tarea (25 minutos)
const tiempoBreak = 5 * 60;              //duración del descanso (5 minutos)
const listaTareas = [];             //lista de las tareas pendientes
let timerTarea = null;              //cuenta regresiva de la tarea
let timerBreak = null;              //cuenta regresiva del descanso
let temporizador = null;            //temporizador
let ejecutando = null;              //indica si la tarea actual se está ejecutando

//REFERENCIAS A LOS ELEMENTOS DEL DOCUMENTO (DOOM)
const inputTarea = document.getElementById('inputTarea');
const form = document.getElementById('formulario');
const contenedorTareas = document.getElementById('tareas');

renderTiempo();

//ACCIÓN A REALIZAR CUANDO SE EJECUTE EL EVENTO 'submit' DEL FORM
form.addEventListener('submit', e => {
    e.preventDefault();
    
    if (inputTarea.value != '') {       //si hay algun nombre, es válido
        crearTarea(inputTarea.value);   //se crea la tarea y se pasa el nombre como parámetro
        inputTarea.value = '';          //se limpia el texto del input
        renderTarea();                  //una vez creada la tarea se la renderiza
    };
});

const manejadorId = new IdManager();

function crearTarea(name) {
    let id = manejadorId.getId();       //función para generar un 'Id' aleatorio
    const nuevaTarea = {                //objeto de la nueva tarea
        id: id,                         //Id de la tarea
        titulo: name,                   //nombre de la tarea
        completado: false               //tarea completada o no
    };
    listaTareas.unshift(nuevaTarea);    //la nueva taea se añade al COMIENZO del array de tareas
}

function renderTarea() {
    //CREANDO CONTENEDOR 'div' PARA CADA TAREA
    const html = listaTareas.map( tarea => {
        return `
            <div class="tarea">
                <div class="completado">
                    ${
                        tarea.completado 
                        ? `<span class="done">Done</span>`
                        : `<button class="btn-comenzar" data-id="${tarea.id}">Comenzar</button>`
                    }
                </div>
                <div class="titulo">${tarea.titulo}</div>
            </div>
        `;
    });

    //INYECTANDO EL CONTENEDOR EN EL HTML
    contenedorTareas.innerHTML = html.join('');

    //SELECCIONANDO EL CONTENEDOR DE UNA TAREA Y EL BOTON DE 'comenzar' (2 ELEMENTOS DEL DOOM)
    const btnComenzarCont = document.querySelectorAll('#tareas .btn-comenzar');

    btnComenzarCont.forEach( btn => {
        btn.addEventListener('click', () => {
            if (!temporizador) {
                const id = btn.getAttribute('data-id');
                btn.textContent = 'En progreso...';
                manejadorBtnComenzar(id);
            }
        });
    });
}

function manejadorBtnComenzar(id) {
    temporizador = tiempoTarea;
    ejecutando = id;

    const indexTarea = listaTareas.findIndex( t => t.id == id);
    const nombreTarea = document.querySelector('#nombreTarea')
    nombreTarea.textContent = listaTareas[indexTarea].titulo;

    renderTiempo();

    timerTarea = setInterval( () => {
        manejTiempoTarea(id);
    }, 1000);
    console.log(timerTarea);
}

//FUNCION PARA MANEJAR EL TEMPORIZADOR DE LA TAREA (LOS 25 MINUTOS)
function manejTiempoTarea (id) {
    temporizador--;
    renderTiempo();

    if (temporizador == 0) {
        clearInterval(timerTarea);
        // completarTarea(id);
        timerTarea = null;
        renderTarea();
        startDescanzo();
    }
}

function startDescanzo() {
    temporizador = tiempoBreak;

    const nombreTarea = document.querySelector('#nombreTarea');
    nombreTarea.textContent = 'Descanzo';

    renderTiempo();

    timerBreak = setInterval( () => {
        manejadorTiempoBreak();
    }, 1000);
}

function manejadorTiempoBreak() {
    temporizador--;
    renderTiempo();

    if (temporizador == 0) {
        clearInterval(timerBreak);
        timerBreak = null;
        ejecutando = null;

        //QUITAR EL TEMPORIZADOR
        const nombreTarea = document.querySelector('#nombreTarea');
        nombreTarea.textContent = '';
        renderTarea();
    }
}

function renderTiempo() {
    const timerDiv = document.querySelector('#valor');
    const minutos = parseInt(temporizador / 60);
    const segundos = parseInt(temporizador % 60);

    timerDiv.textContent = `
        ${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}
    `;
}
