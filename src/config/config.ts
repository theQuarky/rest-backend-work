import * as dotenv from 'dotenv';
dotenv.config();

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3000',

  DB_HOST: process.env.DB_HOST || "mongodb://localhost:27017/wineshop",
  DB_NAME: process.env.DB_NAME || 'books',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_USER: process.env.DB_USER || 'root',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10
};
