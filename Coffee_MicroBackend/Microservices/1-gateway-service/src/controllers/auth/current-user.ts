import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
   // console.log(req.query.currentuser);
    const user : string | undefined = req.query.currentuser?.toString();
    if(user != undefined){
      const response: AxiosResponse = await authService.getCurrentUser(user);
      res.status(StatusCodes.OK).json(response.data );
    }
    else{
      res.status(StatusCodes.BAD_REQUEST);
    }
  }
}
