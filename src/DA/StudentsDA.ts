import { DBManager } from "./DBManager";
import { IStudent } from "../types/types";

export class StudentsDA extends DBManager {
    public async GetStudents() {
        const query = "select * from students";
        try {
            const data = await this.ReadData(query);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async GetStudent(id: number) {
        const query = "select * from students where id = ?";
        try {
            const data = await this.ReadData(query, [id]);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async CreateStudent(data: IStudent) {
        const query = "insert into students(id, name, email, age) values(?,?,?,?)";
        try {
            const result = await this.InsertOrUpdateData(query, [data.id, data.name, data.email, data.age]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateStudent(data: IStudent) {
        const query = "update students set name=?, email=?, age=? where id = ?";
        try {
            const result = await this.InsertOrUpdateData(query, [data.name, data.email, data.age, data.id]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async DeleteStudent(id: number) {
        const query = "delete from students where id = ?";
        try {
            const result = await this.DeleteData(query, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}