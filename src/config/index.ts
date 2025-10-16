import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

// Charger le fichier correspondant à l'environnement
dotenv.config({ path: path.resolve(__dirname, `${env}.env`) });

export interface IConfig {
  port: number;
  dbUri: string;
  jwtSecret: string;
  nodeEnv: string;
}

export const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  dbUri: process.env.DB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  nodeEnv: env,
};
