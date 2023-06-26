import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
 
const app = express();
const port = 3001;
const pool = new Pool({
 user: "postgres",
 host: "localhost",
 database: "sql_demo",
 password: "sara",
 port: 5432,
});
 
app.use(cors());
 
app.get("/api/patients", async (req: Request, res: Response) => {
 try {
 const query = "SELECT * FROM patients";
 console.log(query);
 const result = await pool.query(query);
 res.json(result.rows);
 } catch (error) {
 console.error("Error fetching patients:", error);
 res.status(500).json({ error: "Internal server error" });
 }
});
 
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});