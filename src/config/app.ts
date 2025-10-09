import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { HttpException } from '../exceptions/HttpException';
import routes from '../routes';

export class App {
  public app: Application;
  
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }
  
  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  
  private initializeRoutes(): void {
    this.app.use('/api', routes);
  }
  
  private initializeErrorHandling(): void {
    this.app.use((err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const status = err.status || 500;
      const message = err.message || 'Something went wrong';
      
      res.status(status).json({
        status,
        message
      });
    });
  }
}