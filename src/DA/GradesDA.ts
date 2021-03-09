import { DBManager } from "./DBManager";
import { IGrades } from "../types/types";

export class GradesDA extends DBManager {
    public async GetGrades() {
        const query = "select * from grades";
        try{
            const data = await this.ReadData(query);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async GetGradeByStudentId(id: number) {
        const query = "select * from grades where student = ?";
        try {
            const data = await this.ReadData(query, [id]);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async GetGradesAndStudentInfo(studentId: number) {
        const query = "select * from grades LEFT JOIN students on grades.student = students.id WHERE students.id = ?";
        try {
            const data = await this.ReadData(query, [studentId]);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async AddStudentGrade(data: IGrades) {
        const query = "insert into grades(date, subject, comment, grade, student ) values(?,?,?,?,?)";
        try {
            let date = new Date();
            const result = await this.InsertOrUpdateData(query, [date, data.subject, data.comment, data.grade, data.student]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateStudentGrade(data: IGrades) {
        const query = "update grades set date = ?, subject = ?, comment = ?, grade = ? WHERE student = ?";
        try {
            const result = await this.InsertOrUpdateData(query, [data.date, data.subject, data.comment, data.grade, data.student]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async DeleteGrade(id: number) {
        const query = "delete from grades where id = ?";
        try {
            const result = await this.DeleteData(query, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}