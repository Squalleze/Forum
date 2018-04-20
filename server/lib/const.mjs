// CODE
// CLIENT
// 400 - BAD REQUEST
export const ERR_BADREQUEST = { error: 'ERR_BADREQUEST', code: 400 };
// 401 - UNAUTHORIZED
export const ERR_UNAUTHORIZED = { error: 'ERR_UNAUTHORIZED', code: 401 };
// 403 - FORBIDDEN
export const ERR_FORBIDDEN = { error: 'ERR_FORBIDDEN', code: 403 };
// 404 - NOT FOUND
export const ERR_NOTFOUND = { error: 'ERR_NOTFOUND', code: 404 };
// 429 - TOO MANY REQUESTS
export const ERR_TOOMANYREQUESTS = { error: 'ERR_TOOMANYREQUESTS', code: 429 };

// SERVER
// 500 - INTERNAL SERVER ERROR
export const ERR_INTERNAL = { error: 'ERR_INTERNAL', code: 500 };

// MISC
export const ERR_CONTENT_TYPE = { error: 'ERR_CONTENT_TYPE' };

// TOKEN
export const PATTERN_TOKEN = /^[0-9a-f]{64}$/;
export const ERR_TOKEN_INVALID = { error: 'ERR_TOKEN_INVALID', description: 'invalid token' };
export const ERR_TOKEN_MISSING = { error: 'ERR_TOKEN_MISSING', description: 'missing token' };

// USERNAME
export const PATTERN_USERNAME = /^[a-z]([ _-]?[a-z0-9]+)+$/i;
export const ERR_USERNAME_TAKEN = { error: 'ERR_USERNAME_TAKEN', description: 'username already taken' };
export const ERR_USERNAME_SHORT = { error: 'ERR_USRNAME_SHORT' };
export const ERR_USERNAME_LONG = { error: 'ERR_USERNAME_LONG' };
export const ERR_USERNAME_SIZE = { error: 'ERR_USERNAME_SIZE' };
export const ERR_USERNAME_INVALID = { error: 'ERR_USERNAME_INVALID' };
export const ERR_USERNAME_NOTFOUND = { error: 'ERR_USERNAME_NOTFOUND' };

// PASSWORD
export const ERR_PASSWORD_SIZE = { error: 'ERR_PASSWORD_SIZE' };
export const ERR_PASSWORD_WRONG = { error: 'ERR_PASSWORD_WRONG' };

// UNKNOWN
export const ERR_UNKNOWN = { error: 'ERR_UNKNOWN' };