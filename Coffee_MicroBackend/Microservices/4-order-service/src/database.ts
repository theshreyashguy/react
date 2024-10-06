import { winstonLogger } from '@theshreyashguy/coffee-shared';
import { Logger } from 'winston';
import { config } from '@order/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authDatabaseServer', 'debug');


export async function databaseConnection(): Promise<void> {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    log.info('Order service successfully connected to database.');
  } catch (error) {
    log.log('error', 'OrderService databaseConnection() method error:', error);
  }
}
