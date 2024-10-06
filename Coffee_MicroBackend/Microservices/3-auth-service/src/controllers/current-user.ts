import {  getUserByUsernameOrEmail, } from '@auth/services/auth.service';
import {  IAuthDocument } from '@theshreyashguy/coffee-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function read(req: Request, res: Response): Promise<void> {
  let user = null;
  const id : string | undefined = req.query.currentuser?.toString();
  if(id !== undefined){
    const existingUser: IAuthDocument | undefined = await getUserByUsernameOrEmail(id,id);
    if (Object.keys(existingUser!).length) {
      user = existingUser;
    }
    res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
  }
  res.status(StatusCodes.BAD_REQUEST);

}


