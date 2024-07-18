/**
 * List of public routes
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * List of private routes
 * These routes require authentication
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/registration",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/home";
