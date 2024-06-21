import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
	url: "file:./db/db.sqlite",
	// url: "libsql://paddock-db-charlesbjerg.turso.io",
	// authToken:
	// "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTc1MDE4OTcsImlkIjoiYzViZGE2M2ItYTA3MS00MzU4LThmNjMtMTUyYTg2NWNhOTAxIn0.-VVtOBBvyCZY2_dNgUuYd5mHcwVLzA_-96EXnpD6m-lkFX7ni6kTHA_YfIzAzmPAH7lAF2S3ICAWzGfH9k22Bg",
});

export const db = drizzle(client, { schema });
