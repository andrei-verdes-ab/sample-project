import { SubjectsDA } from "../DA";
import { ISubjects } from "../types/types";
import { redisClient } from "../DA/RedisConnection";
import { promisify } from "util";

export class SubjectsService {

    constructor(private subjectsDA: SubjectsDA) { }
    public async GetSubjects() {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync("subjects").then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.subjectsDA.GetSubjects();
                    redisClient.set("subjects", JSON.stringify(data), 'EX', 60, undefined);
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
    public async GetSubject(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync(`${id}-subject`).then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.subjectsDA.GetSubject(id);
                    redisClient.set(`${id}-subject`, JSON.stringify(data), 'EX', 60, undefined);
                    return data;
                }
                console.log('cached');
                return JSON.parse(redisData);
            }).catch(console.error);
        } catch (error) {
            throw error;
        }
    }

    public async CreateSubject(data: ISubjects) {
        try {
            const result = await this.subjectsDA.CreateSubject({ ...data});
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateSubject(data: ISubjects) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${data.id}-subject`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${data.id}-subject`);
                }
            }).catch(console.error);
            const result = await this.subjectsDA.UpdateSubject(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async DeleteSubject(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${id}-subject`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${id}-subject`);
                }
            }).catch(console.error);
            const result = await this.subjectsDA.DeleteSubject(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}