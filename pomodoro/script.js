import { IdManager } from './idManagerLib.js';

//DECLARANDO VARIABLES
const tiempoTarea = 25 * 60;        //duración de una tarea (25 minutos)
const tiempoBreak = 5 * 60;         //duración del descanso (5 minutos)
window.listaTareas = [];             //lista de las tareas pendientes
let timerTarea = null;              //cuenta regresiva de la tarea
let timerBreak = null;              //cuenta regresiva del descanso
let temporizador = null;            //temporizador
let ejecutando = null;              //indica si la tarea actual se está ejecutando

//REFERENCIAS A LOS ELEMENTOS DEL DOCUMENTO (DOOM)
const inputTarea = document.getElementById('inputTarea');
const btnAdd = document.getElementById('btnAdd');
const form = document.getElementById('formulario');

//ACCIÓN A REALIZAR CUANDO SE EJECUTE EL EVENTO 'submit' DEL FORM
form.addEventListener('submit', e => {
    e.preventDefault();
    
    if (inputTarea.value != '') {       //si hay algun nombre, es válido
        crearTarea(inputTarea.value);   //se crea la tarea y se pasa el nombre como parámetro
        inputTarea.value = '';          //se limpia el texto del input
        renderTarea();                  //una vez creada la tarea se la renderiza
    };
});

window.manejadorId = new IdManager();

function crearTarea(name) {
    let id = manejadorId.getId();       //función para generar un 'Id' aleatorio
    const nuevaTarea = {                //objeto de la nueva tarea
        id: id,                         //Id de la tarea
        title: name,                    //nombre de la tarea
        completed: false                //tarea completada o no
    };
    listaTareas.unshift(nuevaTarea);    //la nueva taea se añade al COMIENZO del array de tareas
}

function renderTarea() {
    console.log(listaTareas);
}


