import { StudentsDA } from "../DA";
import { IStudent } from "../types/types";

export class StudentsService {

    constructor(private studentsDA: StudentsDA) { }
    public async GetStudents() {
        try {
            const data = await this.studentsDA.GetStudents();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    public async CreateStudent(data: IStudent) {
        try {
            const result = await this.studentsDA.CreateStudent({ ...data});
            return result;
        }
        catch (err) {
            throw err;
        }
    }
}