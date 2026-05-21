import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(            
            id SERIAL PRIMARY KEY,

            name VARCHAR(80) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,

            role VARCHAR(20) NOT NULL DEFAULT 'contributor'
                CONSTRAINT users_role_check CHECK (role IN ('contributor', 'maintainer')),

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            
            `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(            
            id SERIAL PRIMARY KEY,

            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            type VARCHAR(20) NOT NULL
                CONSTRAINT issues_type_check CHECK (type IN ('bug', 'feature_request')),

            status VARCHAR(20) NOT NULL DEFAULT 'open'
                CONSTRAINT issues_status_check CHECK (status IN ('open', 'in_progress', 'resolved')),

            reporter_id INT NOT NULL,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            
            `);

    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};
