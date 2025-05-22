import mysql from 'mysql2';


export const initializeDb = async () => {
    try{
        const pool = await connectDatabase()
        await pool.query(`CREATE TABLE IF NOT EXISTS schools (id integer PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, address TEXT NOT NULL, longitude FLOAT NOT NULL, latitude FLOAT NOT NULL)`)
    }catch(err){
        console.log("DB ERROR: Initialization error \n", err)
        process.exit(1);
    }
}

const connectDatabase = async() => {
    try{
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            // port: process.env.PORT
        }).promise()
        return pool;
    }catch(err){
        console.log("DB ERROR: Connection error \n", err)
        process.exit(1);
    }
}
export default connectDatabase;
