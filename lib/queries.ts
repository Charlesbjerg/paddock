/**
 * Contains a set of queries that can be used to interact with the database.
 */

import { db } from "@/db/db";
import { SelectCircuit, SelectRace } from "@/db/schema";
import { sql } from "drizzle-orm";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

type SeasonRaceMiniResult = SelectCircuit & SelectRace & {
    id: number;
    circuit: string;
    countryCode: string;
    round: number;
    name: string;
    year: number;
    time: string;
    date: Date;
    p1: string;
    p2: string;
    p3: string;
    fastestLap: string;
    fastestLapDriver: string;
}

export async function getSeasonRaceResults(year: number | string): Promise<SeasonRaceMiniResult[]> {
    const [resultsFound]: any = await db.execute(sql`
        select
            races.*,
            circuits.*,
            (select drivers.code from results left join drivers on drivers.id = results.driverId where results.raceId = races.id and results.position = 1 limit 1) as p1,
            (select drivers.code from results left join drivers on drivers.id = results.driverId where results.raceId = races.id and results.position = 2 limit 1) as p2,
            (select drivers.code from results left join drivers on drivers.id = results.driverId where results.raceId = races.id and results.position = 3 limit 1) as p3,
            (select lap_times.time from lap_times left join drivers on drivers.id = lap_times.driverId where lap_times.raceId = races.id order by milliseconds ASC limit 1) as fastestLap,
            (select drivers.surname from lap_times left join drivers on drivers.id = lap_times.driverId where lap_times.raceId = races.id order by milliseconds ASC limit 1) as fastestLapDriver
        from
            races
        left join 
            circuits on races.circuitId = circuits.id
        where
            races.year = ${year}
        order by
            races.round asc
    `);

    // Map into results array to apply correct type
    let results: SeasonRaceMiniResult[] = resultsFound.map((row: any) => ({
        id: row.id,
        circuit: row.circuitName,
        countryCode: row.countryCode,
        round: row.round,
        name: row.name,
        year: row.year,
        time: row.time,
        date: row.date,
        p1: row.p1,
        p2: row.p2,
        p3: row.p3,
        fastestLap: row.fastestLap,
        fastestLapDriver: row.fastestLapDriver,
    }));

    return results;

}