import { GradesDA } from "../DA";
import { IGrades } from "../types/types";
import { redisClient } from "../DA/RedisConnection";
import { promisify } from "util";

export class GradesService {

    constructor(private gradesDA: GradesDA) { }
    public async GetGrades() {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync("grades").then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.gradesDA.GetGrades();
                    redisClient.set("grades", JSON.stringify(data), 'EX', 60, undefined);
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

    public async GetGradeByStudentId(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync(`${id}-grades`).then(async redisData => {
                if(!redisData){
                    console.log('not cached');
                    const data = await this.gradesDA.GetGradeByStudentId(id);
                    redisClient.set(`${id}-grades`, JSON.stringify(data), 'EX', 60, undefined);
                    return data;
                }
                console.log('cached');
                return JSON.parse(redisData);
            }).catch(console.error);
        } catch (error) {
            throw error;
        }
    }

    public async GetGradesAndStudentInfo(id: number, sort: string, order = 'ASC') {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            return getAsync(`${id}-info`)
                .then(async redisData => {
                    let data : [];
                    if(!redisData){
                        console.log('not cached');
                        data = await this.gradesDA.GetGradesAndStudentInfo(id);
                        redisClient.set(`${id}-info`, JSON.stringify(data));
                    } else {
                        console.log('cached');
                        data = JSON.parse(redisData);
                    }

                    return data;
                }).then(data => {
                    const getAsyncSort = promisify(redisClient.get).bind(redisClient);
                    return getAsyncSort(`${id}-grades-${sort}-${order}`).then(async redisData => {
                        if(!redisData){
                            console.log('not cached');
                            const sortedArray: IGrades[] = data.sort((grade1: IGrades, grade2: IGrades) => {
                                const sortKey = sort as keyof IGrades;
                                const grade1Key = grade1[sortKey];
                                const grade2Key = grade2[sortKey];
                                if (grade1Key && grade2Key) {
                                    if (order === 'DESC') {
                                        if (grade1Key > grade2Key) {
                                            return -1;
                                        }
                                        if (grade1Key < grade2Key) {
                                            return 1;
                                        }
                                    } else {
                                        if (grade1Key > grade2Key) {
                                            return 1;
                                        }
                                        if (grade1Key < grade2Key) {
                                            return -1;
                                        }
                                    }
                                }
                                return 0;
                            });
                            redisClient.set(`${id}-grades-${sort}-${order}`, JSON.stringify(sortedArray));
                            return sortedArray;
                        }
                        console.log('cached');
                        return JSON.parse(redisData);
                    }).catch(console.error);
                }).catch(console.error);
        } catch (error) {
            throw error;
        }
    }

    public async AddStudentGrade(data: IGrades) {
        try {
            const result = await this.gradesDA.AddStudentGrade({ ...data});
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    public async UpdateStudentGrade(data: IGrades) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${data.id}-grades`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${data.id}-grades`);
                }
            }).catch(console.error);
            const result = await this.gradesDA.UpdateStudentGrade(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async DeleteGrade(id: number) {
        try {
            const getAsync = promisify(redisClient.get).bind(redisClient);
            getAsync(`${id}-grades`).then(async redisData => {
                if(redisData){
                    redisClient.del(`${id}-grades`);
                }
            }).catch(console.error);
            const result = await this.gradesDA.DeleteGrade(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}