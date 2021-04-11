import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.AUTH_AUDIENCE,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});
