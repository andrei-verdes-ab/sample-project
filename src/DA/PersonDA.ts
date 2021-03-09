import fs from 'fs';

export class PersonDA {

    public read() : string {
        return fs.readFileSync('C:\\Users\\danap\\Documents\\example.json','utf8');
    }
    
}