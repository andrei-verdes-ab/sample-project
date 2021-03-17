import { RedisClient} from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new RedisClient({
    port: process.env.REDIS_PORT, // matches with first port # after -p above
    host: process.env.REDIS_HOST
});

export {
    redisClient
};
