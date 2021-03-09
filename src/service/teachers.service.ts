import { TeachersDA } from "../DA";
import { ITeachers } from "../types/types";
import { redisClient } from "../DA/RedisConnection";
import { promisify } from "util";

export class TeachersService {

    constructor(private teachersDA: TeachersDA) { }
    public async GetTeachers() {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync("teachers").then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.teachersDA.GetTeachers();
                    redisClient.set("teachers", JSON.stringify(data), 'EX', 60, undefined);
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

    public async GetTeacher(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync(`${id}-teacher`).then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.teachersDA.GetTeacher(id);
                    redisClient.set(`${id}-teacher`, JSON.stringify(data), 'EX', 60, undefined);
                    return data;
                }
                console.log('cached');
                return JSON.parse(redisData);
            }).catch(console.error);
        } catch (error) {
            throw error;
        }
    }

    public async CreateTeacher(data: ITeachers) {
        try {
            const result = await this.teachersDA.CreateTeacher({ ...data});
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateTeacher(data: ITeachers) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${data.id}-teacher`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${data.id}-teacher`);
                }
            }).catch(console.error);
            const result = await this.teachersDA.UpdateTeacher(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async DeleteTeacher(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${id}-teacher`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${id}-teacher`);
                }
            }).catch(console.error);
            const result = await this.teachersDA.DeleteTeacher(id);
            return result;
        } catch (error) {
            
            throw error;
        }
    }
}