import { table } from "console";
import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  text,
  date,
  time,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const circuits = mysqlTable("circuits", {
  id: int("id").primaryKey(),
  circuitRef: varchar("circuitRef", { length: 256 }),
  name: varchar("name", { length: 256 }),
  location: varchar("location", { length: 256 }),
  country: varchar("country", { length: 256 }),
  lat: varchar("lat", { length: 256 }),
  lng: varchar("lng", { length: 256 }),
  alt: varchar("alt", { length: 256 }),
  url: text("url"),
});
export type SelectCircuit = typeof circuits.$inferSelect;
export type NewCircuit = typeof circuits.$inferSelect;

export const races = mysqlTable("races", {
  id: int("id").primaryKey(),
  year: int("year"),
  round: int("round"),
  circuitId: int("circuitId").references(() => circuits.id),
  name: varchar("name", { length: 256 }),
  date: date("date"),
  time: time("time"),
  url: text("url"),
  fp1_date: date("fp1_date"),
  fp1_time: time("fp1_time"),
  fp2_date: date("fp2_date"),
  fp2_time: time("fp2_time"),
  fp3_date: date("fp3_date"),
  fp3_time: time("fp3_time"),
  quali_date: date("quali_date"),
  quali_time: time("quali_time"),
  sprint_date: date("sprint_date"),
  sprint_time: time("sprint_time"),
});

export const constructors = mysqlTable("constructors", {
  id: int("id").primaryKey(),
  constructorRef: varchar("constructorRef", { length: 256 }),
  name: varchar("name", { length: 256 }),
  nationality: varchar("nationality", { length: 256 }),
  url: text("url"),
});

export const drivers = mysqlTable("drivers", {
  id: int("id").primaryKey(),
  driverRef: varchar("driverRef", { length: 256 }),
  number: int("number").default(0),
  code: varchar("code", { length: 256 }),
  forename: varchar("forename", { length: 256 }),
  surname: varchar("surname", { length: 256 }),
  dob: date("dob"),
  nationality: varchar("nationality", { length: 256 }),
  url: text("url"),
});

export type SelectDrivers = typeof drivers.$inferSelect;

export const qualifyingResults = mysqlTable("qualifying_results", {
  id: int("id").primaryKey(),
  raceId: int("raceId").references(() => races.id),
  driverId: int("driverId").references(() => drivers.id),
  constructorId: int("constructorId").references(() => constructors.id),
  number: int("number"),
  position: int("position"),
  q1: time("q1"),
  q2: time("q2"),
  q3: time("q3"),
});

export const statuses = mysqlTable("statuses", {
  id: int("id").primaryKey(),
  status: varchar("status", { length: 256 }),
});

export const results = mysqlTable("results", {
  id: int("id").primaryKey(),
  raceId: int("raceId"),
  driverId: int("driverId"),
  constructorId: int("constructorId"),
  number: int("number"),
  grid: int("grid"),
  position: int("position"),
  positionText: varchar("positionText", { length: 256 }),
  positionOrder: int("positionOrder"),
  points: int("points"),
  laps: int("laps"),
  time: varchar("time", { length: 256 }),
  milliseconds: int("milliseconds"),
  fastestLap: int("fastestLap"),
  rank: int("rank"),
  fastestLapTime: time("fastestLapTime"),
  fastestLapSpeed: varchar("fastestLapSpeed", { length: 256 }),
  statusId: int("statusId"),
});

export const constructorStandings = mysqlTable("constructor_standings", {
  id: int("id").primaryKey(),
  raceId: int("raceId"),
  constructorId: int("constructorId"),
  points: int("points"),
  position: int("position"),
  positionText: varchar("positionText", { length: 256 }),
  wins: int("wins"),
});

export const constructorResults = mysqlTable("constructor_results", {
  id: int("id").primaryKey(),
  raceId: int("raceId"),
  constructorId: int("constructorId"),
  points: int("points"),
  status: varchar("status", { length: 256 }),
});

export const seasons = mysqlTable("seasons", {
  id: int("id").primaryKey().autoincrement(),
  year: int("year"),
  url: text("url"),
});

export const driverStandings = mysqlTable("driver_standings", {
  id: int("id").primaryKey(),
  raceId: int("raceId"),
  driverId: int("driverId"),
  points: int("points"),
  position: int("position"),
  positionText: varchar("positionText", { length: 256 }),
  wins: int("wins"),
});

export const lapTimes = mysqlTable("lap_times", {
  raceId: int("raceId"),
  driverId: int("driverId"),
  lap: int("lap"),
  position: int("position"),
  time: varchar("time", { length: 256 }),
  milliseconds: int("milliseconds"),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.raceId, table.driverId, table.lap] })
  }
});
export type SelectLapTimes = typeof lapTimes.$inferSelect;

export const pitStops = mysqlTable("pit_stops", {
  raceId: int("raceId"),
  driverId: int("driverId"),
  stop: int("stop"),
  lap: int("lap"),
  time: varchar("time", { length: 256 }),
  duration: varchar("duration", { length: 256 }),
  milliseconds: int("milliseconds"),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.raceId, table.driverId, table.stop] })
  }
});
export type SelectPitStops = typeof pitStops.$inferSelect;

export const sprintResults = mysqlTable("sprint_results", {
  id: int("id").primaryKey(),
  raceId: int("raceId"),
  driverId: int("driverId"),
  constructorId: int("constructorId"),
  number: int("number"),
  grid: int("grid"),
  position: int("position"),
  positionText: varchar("positionText", { length: 256 }),
  positionOrder: int("positionOrder"),
  points: int("points"),
  laps: int("laps"),
  time: varchar("time", { length: 256 }),
  milliseconds: int("milliseconds"),
  fastestLap: int("fastestLap"),
  fastestLapTime: time("fastestLapTime"),
  statusId: int("statusId"),
});

export const cache = mysqlTable("cache", {
  id: int("id").primaryKey().autoincrement(),
  key: varchar("key", { length: 256 }),
  value: varchar("value", { length: 256 }),
});

/*
  Relationships
*/
export const circuitRelations = relations(circuits, ({ many }) => ({
  races: many(races),
}));

export const racesRelations = relations(races, ({ one, many }) => ({
  circuit: one(circuits, {
    fields: [races.circuitId],
    references: [circuits.id],
  }),
  results: many(results),
  lapTimes: many(lapTimes),
  pitStops: many(pitStops),
}));

export const lapTimesRelations = relations(lapTimes, ({ one }) => ({
  driver: one(drivers, {
    fields: [lapTimes.driverId],
    references: [drivers.id],
  }),
  race: one(races, {
    fields: [lapTimes.raceId],
    references: [races.id],
  })
}));

export const pitStopsRelations = relations(pitStops, ({ one }) => ({
  driver: one(drivers, {
    fields: [pitStops.driverId],
    references: [drivers.id],
  }),
  race: one(races, {
    fields: [pitStops.raceId],
    references: [races.id],
  })
}));


export const driverRelations = relations(drivers, ({ many }) => ({
  results: many(results),
}));

export const resultsRelations = relations(results, ({ one }) => ({
  race: one(races, {
    fields: [results.raceId],
    references: [races.id],
  }),
  driver: one(drivers, {
    fields: [results.driverId],
    references: [drivers.id],
  }),
  constructor: one(constructors, {
    fields: [results.constructorId],
    references: [constructors.id],
  }),
  status: one(statuses, {
    fields: [results.statusId],
    references: [statuses.id],
  }),
}));

// export const qualiRelations = relations(qualifyingResults, ({ one }) => ({
//   races: one(races, {
//     fields: [qualifyingResults.raceId],
//     references: [races.id],
//   }),
// }));

