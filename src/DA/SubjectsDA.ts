import { DBManager } from "./DBManager";
import { ISubjects } from "../types/types";

export class SubjectsDA extends DBManager {
    public async GetSubjects() {
        const query = "select * from subjects";
        try {
            const data = await this.ReadData(query);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async GetSubject(id: number) {
        const query = "select * from subjects where id = ?";
        try {
            const data = await this.ReadData(query, [id]);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async CreateSubject(data: ISubjects) {
        const query = "insert into subjects(id, name, description) values(?,?,?)";
        try {
            const result = await this.InsertOrUpdateData(query, [data.id, data.name, data.description]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateSubject(data: ISubjects) {
        const query = "update subjects set name=?, description=? where id = ?";
        try {
            const result = await this.InsertOrUpdateData(query, [data.name, data.description, data.id]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async DeleteSubject(id: number) {
        const query = "delete from subjects where id = ?";
        try {
            const result = await this.DeleteData(query, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}