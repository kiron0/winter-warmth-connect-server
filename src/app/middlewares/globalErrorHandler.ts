/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import AppError from '../errors/AppError';
import CastError from '../errors/CastError';
import DuplicateError from '../errors/DuplicateError';
import ValidationError from '../errors/ValidationError';
import AppZodError from '../errors/ZodError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
          let statusCode = 500;
          let message = 'Something went wrong!';
          let errorSources: TErrorSources = [
                    {
                              path: '',
                              message: 'Something went wrong',
                    },
          ];

          if (err instanceof ZodError) {
                    const simplifiedError = AppZodError(err);
                    statusCode = simplifiedError?.statusCode;
                    message = simplifiedError?.message;
                    errorSources = simplifiedError?.errorSources;
          } else if (err?.name === 'ValidationError') {
                    const simplifiedError = ValidationError(err);
                    statusCode = simplifiedError?.statusCode;
                    message = simplifiedError?.message;
                    errorSources = simplifiedError?.errorSources;
          } else if (err?.name === 'CastError') {
                    const simplifiedError = CastError(err);
                    statusCode = simplifiedError?.statusCode;
                    message = simplifiedError?.message;
                    errorSources = simplifiedError?.errorSources;
          } else if (err?.code === 11000) {
                    const simplifiedError = DuplicateError(err);
                    statusCode = simplifiedError?.statusCode;
                    message = simplifiedError?.message;
                    errorSources = simplifiedError?.errorSources;
          } else if (err instanceof AppError) {
                    statusCode = err?.statusCode;
                    message = err.message;
                    errorSources = [
                              {
                                        path: '',
                                        message: err?.message,
                              },
                    ];
          } else if (err instanceof Error) {
                    message = err.message;
                    errorSources = [
                              {
                                        path: '',
                                        message: err?.message,
                              },
                    ];
          }

          return res.status(statusCode).json({
                    success: false,
                    message,
                    errorSources,
                    err,
                    stack: config.node_env === 'development' ? err?.stack : null,
          });
};

export default globalErrorHandler;