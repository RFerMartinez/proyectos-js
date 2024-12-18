

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