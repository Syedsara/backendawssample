import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
 
const app = express();
const port = 3001;
const pool = new Pool({
 user: "postgres",
 host: "database-1.cqctcaoncjfc.us-east-1.rds.amazonaws.com",
 database: "postgres",
 password: "Sara12khan",
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
app.delete("/api/patients/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
  
    try {
      const query = "DELETE FROM patients WHERE id = $1";
      const result = await pool.query(query, [id]);
  
      if (result.rowCount === 0) {
        // No rows were affected, meaning the ID doesn't exist in the database
        return res.status(404).json({ error: "Patient not found" });
      }
  
      return res.json({ message: "Patient deleted successfully" });
    } catch (error) {
      console.error("Error deleting patient:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

 
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});