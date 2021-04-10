import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as hpp from "hpp";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as path from "path";
import Routes from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: express.Application;
  public port: string | number;
  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.env = process.env.NODE_ENV === "production" ? true : false;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);

    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public serveUI() {
    this.app.use(express.static(path.join(__dirname, "../ui", "build")));
    this.app.get("*", (req, res, next) => {
      res.sendFile(path.resolve(__dirname, "../ui", "build", "index.html"));
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger("combined"));
      this.app.use(cors({ origin: true, credentials: true }));
    } else {
      this.app.use(logger("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/v1/api/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private localConnection() {
    mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, () =>
      console.log("connected succesfully")
    );
    mongoose.set("debug", true);
  }
  private remoteConnection() {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to remote successfully database ");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  private connectToDatabase() {
    this.env ? this.remoteConnection() : this.localConnection();
  }
}

export default App;
