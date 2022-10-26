import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function incrementThoughtView(ip, thought) {
    const ipHasSeenKey = `SaiPraneeth:${thought}:${ip}`;
    if ((await redis.get(ipHasSeenKey)) === null) {
        await redis.setex(ipHasSeenKey, 360, 1);
        await redis.incr(`SaiPraneeth:${thought}`);
    }
}
