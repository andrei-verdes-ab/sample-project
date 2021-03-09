import { DBManager } from "./DBManager";
import { ITeachers } from "../types/types";

export class TeachersDA extends DBManager {
    public async GetTeachers() {
        const query = "select * from teachers";
        try {
            const data = await this.ReadData(query);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async GetTeacher(id: number) {
        const query = "select * from teachers where id = ?";
        try {
            const data = await this.ReadData(query, [id]);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async CreateTeacher(data: ITeachers) {
        const query = "insert into teachers(id, firstname, lastname, subject, subject_optional) values(?,?,?,?,?)";
        try {
            const result = await this.InsertOrUpdateData(query, [data.firstname, data.lastname, data.subject, data.subject_optional, data.id]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateTeacher(data: ITeachers) {
        const query = "update teachers set firstname=?, lastname=?, subject=?, subject_optional=? where id = ?";
        try {
            const result = await this.InsertOrUpdateData(query, [data.firstname, data.lastname, data.subject, data.subject_optional, data.id]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async DeleteTeacher(id: number) {
        const query = "delete from teachers where id = ?";
        try {
            const result = await this.DeleteData(query, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}