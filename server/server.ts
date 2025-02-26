import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Routes
app.get('/api', (req, res) => {
    res.json({message: 'API connected'})
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})