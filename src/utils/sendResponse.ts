import { Response } from "express";

/**
 * @function sendResponse
 * @description
 * Utility function to standardize HTTP JSON responses across the application.
 * It helps to keep all responses consistent by including fields like success, message, data, and error.
 *
 * @param {Response} res - Express response object to send the response.
 * @param {string | null} message - A message describing the result of the operation (e.g., "User created successfully").
 * @param {number} status - HTTP status code to be sent (e.g., 200, 400, 500).
 * @param {boolean} success - Indicates whether the operation was successful or not.
 * @param {any} [data=null] - Optional data to return to the client (e.g., user object, list of products).
 * @param {any} [err=null] - Optional error details if the request failed.
 *
 * @returns {void}
 *
 * @example
 * // Successful response
 * sendResponse(res, "User registered", 201, true, { id: 123 });
 *
 * @example
 * // Error response
 * sendResponse(res, "Validation error", 400, false, null, { field: "email", message: "Invalid format" });
 */

const sendResponse = (
  res: Response,
  message: string | null,
  status: number,
  success: boolean,
  data: any = null,
  err: any = null
) => {
  res.status(status || 500).json({
    success,
    message,
    data,
    err,
  });
};

export default sendResponse;
