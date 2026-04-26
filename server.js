require("dotenv").config();

const app = require("./server/app");
const connectDB = require("./server/config/db");

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});