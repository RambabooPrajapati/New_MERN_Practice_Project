import 'dotenv/config'
import app  from "./app.js";
import dbConnection from "./config/db.connect.js";
const port = process.env.PORT || 8000

dbConnection();

app.listen(port, ()=>{
    console.log(`Server is runnig on port http://localhost:${port}`)
})