import type { FastifyInstance } from "fastify";

import { apiError, getCorrelationId } from "../../../shared/http/api-response";

function getErrorStatusCode(error: unknown) {
  if (typeof error === "object" && error !== null && "statusCode" in error) {
    const statusCode = Number(error.statusCode);

    return statusCode >= 400 ? statusCode : 500;
  }

  return 500;
}

function getErrorCode(statusCode: number) {
  if (statusCode === 400) {
    return "VALIDATION_ERROR";
  }

  if (statusCode === 404) {
    return "NOT_FOUND";
  }

  return "INTERNAL_SERVER_ERROR";
}

function getErrorMessage(error: unknown, statusCode: number) {
  if (statusCode >= 500) {
    return "Internal server error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed";
}

export function errorHandlerPlugin(app: FastifyInstance) {
  app.setNotFoundHandler(async (request, reply) => {
    request.log.warn(
      {
        requestId: request.id,
        correlationId: getCorrelationId(request),
        method: request.method,
        url: request.url,
      },
      "[WARN] Route not found",
    );

    return reply.status(404).send(
      apiError(request, {
        code: "NOT_FOUND",
        message: "Route not found",
      }),
    );
  });

  app.setErrorHandler(async (error, request, reply) => {
    const statusCode = getErrorStatusCode(error);
    const code = getErrorCode(statusCode);
    const message = getErrorMessage(error, statusCode);

    request.log.error(
      {
        err: error,
        requestId: request.id,
        correlationId: getCorrelationId(request),
        method: request.method,
        url: request.url,
        statusCode,
      },
      "[ERROR] Request failed",
    );

    return reply.status(statusCode).send(
      apiError(request, {
        code,
        message,
      }),
    );
  });
}
