import { table } from "console";
import { relations } from "drizzle-orm";
import { int, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

export const circuits = sqliteTable("circuits", {
	id: int("id").primaryKey(),
	circuitRef: text("circuitRef"),
	name: text("name"),
	location: text("location"),
	country: text("country"),
	lat: text("lat"),
	lng: text("lng"),
	alt: text("alt"),
	url: text("url"),
	countryCode: text("countryCode", { length: 2 }),
});
export type SelectCircuit = typeof circuits.$inferSelect;
export type NewCircuit = typeof circuits.$inferSelect;

export const races = sqliteTable("races", {
	id: int("id").primaryKey(),
	year: int("year"),
	round: int("round"),
	circuitId: int("circuitId").references(() => circuits.id),
	name: text("name"),
	date: text("date"),
	time: text("time"),
	url: text("url"),
	fp1_date: text("fp1_date"),
	fp1_time: text("fp1_time"),
	fp2_date: text("fp2_date"),
	fp2_time: text("fp2_time"),
	fp3_date: text("fp3_date"),
	fp3_time: text("fp3_time"),
	quali_date: text("quali_date"),
	quali_time: text("quali_time"),
	sprint_date: text("sprint_date"),
	sprint_time: text("sprint_time"),
});
export type SelectRace = typeof races.$inferSelect;

export const constructors = sqliteTable("constructors", {
	id: int("id").primaryKey(),
	constructorRef: text("constructorRef"),
	name: text("name"),
	nationality: text("nationality"),
	url: text("url"),
});

export const drivers = sqliteTable("drivers", {
	id: int("id").primaryKey(),
	driverRef: text("driverRef"),
	number: int("number").default(0),
	code: text("code"),
	forename: text("forename"),
	surname: text("surname"),
	dob: text("dob"),
	nationality: text("nationality"),
	url: text("url"),
});

export type SelectDrivers = typeof drivers.$inferSelect;

export const qualifyingResults = sqliteTable("qualifying_results", {
	id: int("id").primaryKey(),
	raceId: int("raceId").references(() => races.id),
	driverId: int("driverId").references(() => drivers.id),
	constructorId: int("constructorId").references(() => constructors.id),
	number: int("number"),
	position: int("position"),
	q1: text("q1"),
	q2: text("q2"),
	q3: text("q3"),
});

export const statuses = sqliteTable("statuses", {
	id: int("id").primaryKey(),
	status: text("status"),
});

export const results = sqliteTable("results", {
	id: int("id").primaryKey(),
	raceId: int("raceId"),
	driverId: int("driverId"),
	constructorId: int("constructorId"),
	number: int("number"),
	grid: int("grid"),
	position: int("position"),
	positionText: text("positionText"),
	positionOrder: int("positionOrder"),
	points: int("points"),
	laps: int("laps"),
	time: text("time"),
	milliseconds: int("milliseconds"),
	fastestLap: int("fastestLap"),
	rank: int("rank"),
	fastestLapTime: text("fastestLapTime"),
	fastestLapSpeed: text("fastestLapSpeed"),
	statusId: int("statusId"),
});

export const constructorStandings = sqliteTable("constructor_standings", {
	id: int("id").primaryKey(),
	raceId: int("raceId"),
	constructorId: int("constructorId"),
	points: int("points"),
	position: int("position"),
	positionText: text("positionText"),
	wins: int("wins"),
});

export const constructorResults = sqliteTable("constructor_results", {
	id: int("id").primaryKey(),
	raceId: int("raceId"),
	constructorId: int("constructorId"),
	points: int("points"),
	status: text("status"),
});

export const seasons = sqliteTable("seasons", {
	id: int("id").primaryKey(),
	year: int("year"),
	url: text("url"),
});

export const driverStandings = sqliteTable("driver_standings", {
	id: int("id").primaryKey(),
	raceId: int("raceId"),
	driverId: int("driverId"),
	points: int("points"),
	position: int("position"),
	positionText: text("positionText"),
	wins: int("wins"),
});

export const lapTimes = sqliteTable(
	"lap_times",
	{
		raceId: int("raceId"),
		driverId: int("driverId"),
		lap: int("lap"),
		position: int("position"),
		time: text("time"),
		milliseconds: int("milliseconds"),
	},
	(table) => {
		return {
			pk: primaryKey({
				columns: [table.raceId, table.driverId, table.lap],
			}),
		};
	},
);
export type SelectLapTimes = typeof lapTimes.$inferSelect;

export const pitStops = sqliteTable(
	"pit_stops",
	{
		raceId: int("raceId"),
		driverId: int("driverId"),
		stop: int("stop"),
		lap: int("lap"),
		time: text("time"),
		duration: text("duration"),
		milliseconds: int("milliseconds"),
	},
	(table) => {
		return {
			pk: primaryKey({
				columns: [table.raceId, table.driverId, table.stop],
			}),
		};
	},
);
export type SelectPitStops = typeof pitStops.$inferSelect;

export const sprintResults = sqliteTable("sprint_results", {
	id: int("id").primaryKey(),
	raceId: int("raceId"),
	driverId: int("driverId"),
	constructorId: int("constructorId"),
	number: int("number"),
	grid: int("grid"),
	position: int("position"),
	positionText: text("positionText"),
	positionOrder: int("positionOrder"),
	points: int("points"),
	laps: int("laps"),
	time: text("time"),
	milliseconds: int("milliseconds"),
	fastestLap: int("fastestLap"),
	fastestLapTime: text("fastestLapTime"),
	statusId: int("statusId"),
});

export const cache = sqliteTable("cache", {
	id: int("id").primaryKey(),
	key: text("key"),
	value: text("value"),
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
	qualifyingResults: many(qualifyingResults),
}));

export const lapTimesRelations = relations(lapTimes, ({ one }) => ({
	driver: one(drivers, {
		fields: [lapTimes.driverId],
		references: [drivers.id],
	}),
	race: one(races, {
		fields: [lapTimes.raceId],
		references: [races.id],
	}),
}));

export const pitStopsRelations = relations(pitStops, ({ one }) => ({
	driver: one(drivers, {
		fields: [pitStops.driverId],
		references: [drivers.id],
	}),
	race: one(races, {
		fields: [pitStops.raceId],
		references: [races.id],
	}),
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

export const qualiRelations = relations(qualifyingResults, ({ one }) => ({
	races: one(races, {
		fields: [qualifyingResults.raceId],
		references: [races.id],
	}),
	driver: one(drivers, {
		fields: [qualifyingResults.driverId],
		references: [drivers.id],
	}),
	constructor: one(constructors, {
		fields: [qualifyingResults.constructorId],
		references: [constructors.id],
	}),
}));

export const constructorRelations = relations(constructors, ({ many }) => ({
	results: many(constructorResults),
}));

export const constructorResultsRelations = relations(
	constructorResults,
	({ one }) => ({
		constructor: one(constructors, {
			fields: [constructorResults.constructorId],
			references: [constructors.id],
		}),
	}),
);
