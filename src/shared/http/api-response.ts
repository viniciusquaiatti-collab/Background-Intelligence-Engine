import type { FastifyRequest } from "fastify";

type ApiMeta = {
  requestId: string;
  correlationId: string;
  timestamp: string;
};

type ApiError = {
  code: string;
  message: string;
};

export type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
  meta: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
  meta: ApiMeta;
};

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function getCorrelationId(request: FastifyRequest) {
  return getHeaderValue(request.headers["x-correlation-id"]) || request.id;
}

export function buildApiMeta(request: FastifyRequest): ApiMeta {
  return {
    requestId: request.id,
    correlationId: getCorrelationId(request),
    timestamp: new Date().toISOString(),
  };
}

export function apiSuccess<TData>(request: FastifyRequest, data: TData): ApiSuccessResponse<TData> {
  return {
    success: true,
    data,
    meta: buildApiMeta(request),
  };
}

export function apiError(request: FastifyRequest, error: ApiError): ApiErrorResponse {
  return {
    success: false,
    error,
    meta: buildApiMeta(request),
  };
}
