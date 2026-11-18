import "dotenv/config"
import express from "express"

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.get("/api/health", (req, res) => {
    return res.status(200).json({success: true});
})

app.listen(PORT, () => {
    console.log("Server is running at PORT: ", PORT);
    
})