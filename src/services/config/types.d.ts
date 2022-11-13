// import { Request,Response } from "express"

// export interface IGetUserAuthInfoRequest extends Request {
//   users: any // or any other type
// }

// export interface IGetUserAuthInfoResponse extends Response {
//   users: any // or any other type
// }

declare namespace Express {
  export interface Request {
      user: any;
  }
  export interface Response {
      user: any;
  }
}