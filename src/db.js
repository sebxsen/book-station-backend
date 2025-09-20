import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db-book-station",
  password: "12122004",
  port: 5432,
});

export default pool;