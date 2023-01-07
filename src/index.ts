import express, { NextFunction, Request, Response,  } from "express";
import router from "./router";
import cors from "cors";
import { rm, sc } from './constants';
import { fail } from './constants/response';
import { globalErrorHandler } from './middlewares/error';

const app = express();
const PORT = 3000; 
const corsOptions = {
  origin: '*',
  credential: true,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use("/", router); 
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Track-1 SERVER OPEN!!");
});


app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
}); 