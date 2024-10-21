import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/Student/student.route';
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
