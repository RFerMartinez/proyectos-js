
let eventsList = [];
let arr = [];           //Cargar información

const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const btnAdd = document.querySelector('#btnAdd');
const eventsContainer = document.querySelector('#eventsContainer');

const json = load();

try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}
eventsList = arr ? [...arr] : [];

renderEvents();

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addEvent();
})

function addEvent() {
    if (eventName.value == '' || eventDate.value == '') {
        return;
    }
    if (dateDiff(eventDate.value) < 0) {
        return;
    }
    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value
    }
    eventsList.unshift(newEvent);

    save(JSON.stringify(eventsList));
    eventName.value = '';
    renderEvents();
}
// 'Ceil' para redondear hacia arriba

function dateDiff(d) {
    const targetDate = new Date(d);
    const today = new Date();
    const difference = targetDate.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24))
    return days;
}

function renderEvents() {
    const eventsHTML = eventsList.map( event => {
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text">días</span>
                </div>

                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>
                <div class="actions">
                    <button class="btnDelete" data-id="${event.id}">Eliminar</button>
                </div>
            </div>
        `;
    });

    eventsContainer.innerHTML = eventsHTML.join('');

    document.querySelectorAll('.btnDelete').forEach( btn => {
        btn.addEventListener('click', e => {
            const id = btn.getAttribute('data-id');

            eventsList = eventsList.filter( event => event.id != id);
            save(JSON.stringify(eventsList));
            renderEvents();
        });
    });
}

function save(data) {
    localStorage.setItem('items', data);
}

function load() {
    return localStorage.getItem('items');
}



















// btnAdd.addEventListener('click', (e) => {
//     e.preventDefault();

//     console.log(`Nombre del evento: ${eventName.value}`);

//     const html = `
//         <div class="evento">
//             ${eventName.value}
//         </div>
//     `;

//     eventsContainer.innerHTML = html;
// })