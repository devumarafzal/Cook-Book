import {neon} from "@neondatabase/serverless"
import  { drizzle } from "drizzle-orm/neon-http"
import "dotenv/config"
const  databaseUrl = process.env.DATABASE_URL;

const schema = {}

if (!databaseUrl) {
    throw new Error("DtabaseUrl is required for api routes.")
}

const sql = neon(databaseUrl)

export const db =  drizzle({client: sql, schema})