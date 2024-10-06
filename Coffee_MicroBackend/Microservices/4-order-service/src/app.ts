import express, { Express } from 'express';
import { start } from '@order/server';
import { databaseConnection } from '@order/database';
import { config } from '@order/config';

const initialize = (): void => {
  config.cloudinaryConfig();
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
