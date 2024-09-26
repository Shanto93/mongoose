import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { clear } from "console";
const app: Application = express();
const port = 3000;

//Parser
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello worlds!");
});

export default app;
