import { RedisClient} from 'redis';

const redisClient = new RedisClient({
    port: 6379, // matches with first port # after -p above
    host: '127.0.0.1'
});

export {
    redisClient
};