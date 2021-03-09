import { PersonDA } from "../DA";

export class PersonService {

    constructor(private personDA: PersonDA) { }

    public getData() {
        return this.personDA.read();
    }

}