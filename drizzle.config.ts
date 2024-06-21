import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./drizzle",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		// url: process.env.TR_DB_URL ?? "",
		// authToken: process.env.TR_DB_TOKEN,
		url: "file:./db/db.sqlite",
		authToken:
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTc1MDE4OTcsImlkIjoiYzViZGE2M2ItYTA3MS00MzU4LThmNjMtMTUyYTg2NWNhOTAxIn0.-VVtOBBvyCZY2_dNgUuYd5mHcwVLzA_-96EXnpD6m-lkFX7ni6kTHA_YfIzAzmPAH7lAF2S3ICAWzGfH9k22Bg",
	},
	verbose: true,
	strict: true,
});
