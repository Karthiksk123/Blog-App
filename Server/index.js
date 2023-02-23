import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./Database/db.js";
import route from "./Routes/route.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

connection();

const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  filename: (req, file, callb) => {
    callb(null, "file.png");
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
   res.status(200).json("File has been uploaded");
});

app.use(route);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port : ${port}`));
