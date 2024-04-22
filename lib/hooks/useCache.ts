import { db } from "@/db/db";
import { cache } from "@/db/schema";

export const useCache = () => {

    const get = async (key: string) => {
        const result = await db.query.cache.findFirst({
            where: (cache, { eq }) => eq(cache.key, key),
        });
        return result?.value;
    };

    const set = async (key: string, value: string) => {
        await db.insert(cache).values({ key, value });
    };

    return { get, set };
};