// auth.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
//import { config } from './config';
class Auth {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    console.log('done');
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async signUp(userData: any): Promise<AxiosResponse<any>> {
    try {
     // console.log(userData , process.env.BASE_URL);
      const response = await this.axiosInstance.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async signIn(credentials: { username: string; password: string}): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.post('/auth/signin', credentials);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async currentUser(currentuserid: String ): Promise<AxiosResponse<any>> {
    try {
      const response = await this.axiosInstance.get('/auth/currentuser',
        {
          params: {
              currentuser: currentuserid
          }
      }
      );
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


export const auth : Auth = new Auth(`http://192.168.34.141:4000/api/gateway/v1/`);