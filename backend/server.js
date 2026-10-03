import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Home Supervision API is running");
});

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Home Supervision API is active"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        await prisma.$connect();

        res.json({
            success: true,
            message: "Database connected successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});