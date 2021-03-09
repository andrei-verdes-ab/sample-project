import { StudentsDA } from "../DA";
import { IStudent } from "../types/types";
import { redisClient } from "../DA/RedisConnection";
import { promisify } from "util";

export class StudentsService {

    constructor(private studentsDA: StudentsDA) { }
    public async GetStudents() {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync("students").then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.studentsDA.GetStudents();
                    redisClient.set("students", JSON.stringify(data), 'EX', 60, undefined);
                    return data;
                }
                console.log('cached');
                return JSON.parse(redisData);
            }).catch(console.error);
        }
        catch (err) {
            console.log(err);
        }
    }

    public async GetStudent(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync(`${id}-student`).then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.studentsDA.GetStudent(id);
                    redisClient.set(`${id}-student`, JSON.stringify(data), 'EX', 60, undefined);
                    return data;
                }
                console.log('cached');
                return JSON.parse(redisData);
            }).catch(console.error);
        } catch (error) {
            throw error;
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

    public async UpdateStudent(data: IStudent) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${data.id}-student`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${data.id}-student`);
                }
            }).catch(console.error);
            const result = await this.studentsDA.UpdateStudent(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async DeleteStudent(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${id}-student`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${id}-student`);
                }
            }).catch(console.error);
            const result = await this.studentsDA.DeleteStudent(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}