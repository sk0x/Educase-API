import dotenv from 'dotenv';
import app from './app.js'
import { initializeDb } from './db/index.js';

dotenv.config();
const port = process.env.PORT

initializeDb()
.then(
        app.listen(port, () => {
            console.log(`http://localhost:${port}/api/v1`)
        })
    )
.catch((err) => (
    console.log("INDEX ERROR")
))


