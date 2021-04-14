import { cleanEnv, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    DB_NAME: str(),
    AUTH_DOMAIN: str(),
    AUTH_AUDIENCE: str(),
  });
}

export default validateEnv;
