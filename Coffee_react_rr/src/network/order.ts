// order.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
//import { config } from './config';

class Order {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async createOrder(orderData: any): Promise<AxiosResponse<any>> {
    try {
      //console.log(process.env.BASE_URL,'  jdndl /////////////');
      const response = await this.axiosInstance.post('/orders', orderData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async getOrderById(orderId: string): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async getOrdersByUser(userId: string): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async updateOrder(orderId: string, orderData: any): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.put(`/orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async deleteOrder(orderId: string): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async createPayment(paymentData: any): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async getPaymentById(paymentId: string): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async updatePayment(paymentId: string, paymentData: any): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.put(`/payments/${paymentId}`, paymentData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async deletePayment(paymentId: string): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.delete(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): AxiosResponse<any> {
    if (error.response) {
      return error.response;
    }
    return { data: { message: 'An unexpected error occurred.' } } as AxiosResponse<any>;
  }
}
export const order : Order = new Order(`http://192.168.34.141:4000/api/gateway/v1/`);
