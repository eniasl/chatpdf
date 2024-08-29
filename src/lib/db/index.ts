import {neonConfig, neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import {config} from "dotenv";

neonConfig.fetchConnectionCache = true;

if(!process.env.DATABASE_URL){
    throw new Error("database url not found")
}

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql)