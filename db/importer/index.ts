import { parse } from "csv-parse";
import { promises as fs } from "fs";
import { resolve } from "path";
import { db } from "../db";
import {
  circuits,
  constructors,
  drivers,
  qualifyingResults,
  races,
  results,
  statuses,
  lapTimes,
  pitStops,
  seasons,
  sprintResults,
  constructorResults,
  constructorStandings,
  driverStandings,
} from "../schema";
import { sql } from "drizzle-orm";

const rawDir = resolve(__dirname, "../../raw-data");

/*

  The raw-data directory contains CSV files that contain the
  raw data for the application. Each CSV maps to a database
  table with the file names matching the database name.

  This importer will read all CSV files in the raw-data
  directory and import them into the database.

*/
async function importData(): Promise<void> {
  const files: string[] = [
    "circuits.csv",
    "constructors.csv",
    "drivers.csv",
    "races.csv",
    "qualifying_results.csv",
    "status.csv",
    "results.csv",
    "constructor_results.csv",
    "constructor_standings.csv",
    "driver_standings.csv",
    "pit_stops.csv",
    "seasons.csv",
    "sprint_results.csv",
    "lap_times.csv",
  ];

  for (const file of files) {
    if (file.includes(".csv")) {
      const table: string = file.replace(".csv", "");
      const data: string = await fs.readFile(resolve(rawDir, file), "utf-8");

      const records: Array<any> = await new Promise((resolve, reject) => {
        parse(data, (err, records) => {
          if (err) {
            reject(err);
          } else {
            resolve(records);
          }
        });
      });

      const columns = records.shift();
      let rows = records.map((record) => {
        return columns.reduce(
          (acc: Array<any>, column: number, index: number) => {
            acc[column] = record[index];
            return acc;
          },
          {},
        );
      });

      rows = sanitiseData(rows);

      // console.log(`Importing ${rows.length} records into ${table}`);

      // TODO: Find a better way of handling this

      if (table === "circuits") {
        console.log("Inserting circuits");
        await db.insert(circuits).values(rows);
      } else if (table === "constructors") {
        console.log("Inserting constructors");
        await db.insert(constructors).values(rows);
      } else if (table === "drivers") {
        console.log("Inserting drivers");
        await db.insert(drivers).values(rows);
      } else if (table === "qualifying_results") {
        console.log("Inserting qualifying results");
        await db.insert(qualifyingResults).values(rows);
      } else if (table === "races") {
        console.log("Inserting races");
        await db.insert(races).values(rows);
      } else if (table === "results") {
        console.log("Inserting results");

        // chunk results into smaller arrays to avoid memory issues
        const chunkSize = 250;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(results).values(chunk);
        }
      } else if (table === "status") {
        console.log("Inserting status");
        await db.insert(statuses).values(rows);
      } else if (table === "lap_times") {
        const chunkSize = 200;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(lapTimes).values(chunk);
        }
      } else if (table === "pit_stops") {
        const chunkSize = 1000;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(pitStops).values(chunk);
        }
      } else if (table === "qualifying_results") {
        const chunkSize = 1000;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(qualifyingResults).values(chunk);
        }
      } else if (table === "seasons") {
        await db.insert(seasons).values(rows);
      } else if (table === "sprint_results") {
        await db.insert(sprintResults).values(rows);
      } else if (table === "constructor_results") {
        const chunkSize = 200;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(constructorResults).values(chunk);
        }
      } else if (table === "constructor_standings") {
        const chunkSize = 200;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(constructorStandings).values(chunk);
        }
      } else if (table === "driver_standings") {
        const chunkSize = 200;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await db.insert(driverStandings).values(chunk);
        }
      }
    }
  }
}

function sanitiseData(rows: Array<any>): Array<any> {
  return rows.map((row: Object, index) => {
    let formattedRow: any = {};
    Object.entries(row).forEach((column) => {
      let [key, value] = column;

      // Check for \\N values and convert to null
      if (value === "\\N" || value === "NULL") {
        value = null;
      }

      // Check value is in the format 1:00.000
      const lapTimeRegex = /^\d+:\d{2}\.\d{3}$/;
      if (lapTimeRegex.test(value)) {
        value = convertToMySQLTime(value);
      }

      formattedRow[key] = value;
    });
    return formattedRow;
  });
}

function convertToMySQLTime(lapTimeStr: string): string {
  // Split the lap time string by ':' and '.' to extract minutes, seconds, and milliseconds
  let [minutes, secondsAndMilliseconds]: Array<string | number> =
    lapTimeStr.split(":");
  const [seconds, milliseconds] = secondsAndMilliseconds
    .split(".")
    .map(parseFloat);
  minutes = parseFloat(minutes);

  // Convert milliseconds to microseconds
  const microseconds = milliseconds * 1000;

  // Create a new Date object and set minutes, seconds, and milliseconds
  const lapTime = new Date();
  // lapTime.setUTCHours(0);
  lapTime.setHours(0);
  lapTime.setMinutes(minutes);
  lapTime.setSeconds(seconds);

  // Format the Date object to MySQL TIME format (HH:MM:SS)
  // console.log(lapTimeStr, minutes, seconds, microseconds);
  // const mysqlTime = lapTime.toISOString().substr(11, 12);
  const mysqlTime = `00:${lapTime.getMinutes()}:${seconds}.${microseconds}`;

  return mysqlTime;
}

/*
  Run the importer.
*/
importData().then(() => {
  console.log("🚀 Data import complete");
  process.exit();
});
