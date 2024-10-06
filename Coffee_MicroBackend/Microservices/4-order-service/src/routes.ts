import { Application } from 'express';
import { verifyGatewayRequest } from '@theshreyashguy/coffee-shared';
import { healthRoutes } from '@order/routes/health';
import orderRoutes from '@order/routes/order';
import router from './routes/payment';

const BASE_PATH = '/api/v1/order';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, orderRoutes);
  app.use(BASE_PATH, verifyGatewayRequest, router);
};
