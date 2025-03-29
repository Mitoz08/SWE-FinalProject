import express, { Request, Response } from 'express';
import { userRouter } from './routes/userRoutes';
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json())
app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
