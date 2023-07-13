"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 3001;
const pool = new pg_1.Pool({
    user: "postgres",
    host: "database-1.cqctcaoncjfc.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "Sara12khan",
    port: 5432,
});
app.use((0, cors_1.default)());
app.get("/api/patients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT * FROM patients";
        console.log(query);
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.delete("/api/patients/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const query = "DELETE FROM patients WHERE id = $1";
        const result = yield pool.query(query, [id]);
        if (result.rowCount === 0) {
            // No rows were affected, meaning the ID doesn't exist in the database
            return res.status(404).json({ error: "Patient not found" });
        }
        return res.json({ message: "Patient deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting patient:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
