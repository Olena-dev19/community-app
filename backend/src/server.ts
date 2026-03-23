import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./db/connectMongoDB.js";
import postsRoutes from "./routes/postsRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api", postsRoutes);
app.use("/api", commentsRoutes);

await connectMongoDB().then(() => {
  app.get("/", (req, res) => {
    res.send("Backend works 🚀");
  });
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
