import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@order/config';
import {  winstonLogger } from '@theshreyashguy/coffee-shared';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    log.info('AuthService connecting to ElasticSearch...');
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`AuthService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to Elasticsearch failed. Retrying...');
      log.log('error', 'AuthService checkConnection() method:', error);
    }
  }
}

async function checkIfIndexExist(indexName: string): Promise<boolean> {
  const result: boolean = await elasticSearchClient.indices.exists({ index: indexName });
  return result;
}

async function createOrderIndex() {
  await elasticSearchClient.indices.create({
    index: 'orders',
    body: {
      mappings: {
        properties: {
          orderId: { type: 'keyword' },
          userId: { type: 'keyword' },
          items: {
            type: 'nested',
            properties: {
              coffeeId: { type: 'integer' },
              quantity: { type: 'integer' },
            },
          },
          totalAmount: { type: 'float' },
          orderDate: { type: 'date' },
        },
      },
    },
  });
}

async function createPaymentIndex() {
  await elasticSearchClient.indices.create({
    index: 'payments',
    body: {
      mappings: {
        properties: {
          paymentId: { type: 'keyword' },
          orderId: { type: 'keyword' },
          amount: { type: 'float' },
          paymentDate: { type: 'date' },
          status: { type: 'keyword' },
        },
      },
    },
  });
}



export { elasticSearchClient, checkConnection, checkIfIndexExist , createOrderIndex , createPaymentIndex };
