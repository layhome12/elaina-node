import { Request, Response as ExResponse, NextFunction } from "express";
import { ZodSchema } from "zod";
import Response, {
  MessageBadRequest,
} from "../../common/helpers/response.helper";

export const ZodValidator =
  (schema: ZodSchema) =>
  async (req: Request, res: ExResponse, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const error = result.error.flatten();

      // -- error map
      const message: MessageBadRequest[] = Object.entries(
        error.fieldErrors,
      ).map(([field, messages]) => ({
        property: field,
        message: (messages as string[])?.[0] ?? "",
      }));

      return Response.httpBadReq(res, 400, message);
    }

    req.body = result.data;
    next();
  };
