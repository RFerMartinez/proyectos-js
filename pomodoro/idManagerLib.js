// export class idManager {
//     //FUNCION PARA OBTENER UN NUEVO ID
//     getId = () => {
//         if (IdsDisponibles.length > 0) {    //verifica si hay un id disponible
//             return IdsDisponibles.pop();    //quita de la lista el id disponible y lo utiliza
//         } else {
//             return contadorIds++;           //genera un id nuevo creciente
//         };
//     };
//     //FUNCION PARA ELIMINAR UN ID
//     popId = (id) => {
//         if (id <= contadorIds && !IdsDisponibles.includes(id)) {    //verifica que sea factible eliminar
//             IdsDisponibles.push(id);                                //agrega a la lista de id disponibles
//         };
//     };
// };

//MANEJADOR DE IDs
export class IdManager {
    constructor() {
        this.contador = 0;
        this.IdDisponibles = [];
    }

    getId() {
        return this.IdDisponibles.length > 0
            ? this.IdDisponibles.pop()
            : this.contador++;
    }

    popId(id) {
        if (id <= this.contador && !this.IdDisponibles.includes(id)) {
            this.IdDisponibles.push(id);
        };
    }
}