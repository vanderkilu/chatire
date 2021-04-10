import "dotenv/config";
import UserRoute from "./routes/user.routes";
import App from "./app";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new UserRoute()]);

app.listen();
