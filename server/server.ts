import "dotenv/config";
import UserRoute from "./routes/user.routes";
import ChatRoute from "./routes/chat.routes";
import App from "./app";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new UserRoute(), new ChatRoute()]);

app.listen();
