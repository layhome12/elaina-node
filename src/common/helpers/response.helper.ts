import { Response as ExpressResponse } from "express";

type MessageBadRequest = {
  property: string;
  message: string;
};

class Response {
  public static http(
    res: ExpressResponse,
    statusCode: number,
    message: string,
    data: any = null,
  ) {
    const response: any = {
      statusCode,
      message,
    };

    if (data) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  public static httpBadReq(
    res: ExpressResponse,
    statusCode: number,
    message: MessageBadRequest[],
  ) {
    return res.status(statusCode).json({
      statusCode,
      error: "Bad Request",
      message,
    });
  }
}

export default Response;
export {
  MessageBadRequest
}
