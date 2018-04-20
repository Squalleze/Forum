import {
  PATTERN_USERNAME,
  PATTERN_TOKEN,
  ERR_USERNAME_SIZE,
  ERR_USERNAME_INVALID,
  ERR_PASSWORD_SIZE,
  ERR_UNKNOWN,
} from './const';

export function verifyUsername(username) {
  if (username.length < 2 || username.length > 12) // invalid size
    throw ERR_USERNAME_SIZE;

  if (!PATTERN_USERNAME.test(username))
    throw ERR_USERNAME_INVALID;
}

export function verifyPassword(password) {
  if (password.length < 8 || password.length > 512)
    throw ERR_PASSWORD_SIZE;
}

export async function verifyToken(token, db) {
  if (!PATTERN_TOKEN.test(token))
    throw ERR_UNKNOWN;
  
  const results = await db.query('SELECT *, (expires < NOW()) AS isExpired FROM Token WHERE hash = UNHEX(?) LIMIT 1', [ token ]);
  const result = results[0];
  
  if (!result) throw ERR_UNKNOWN; // token doesn't exist
  if (result.isExpired) throw ERR_UNKNOWN; // token is expired
  if (!result.isActive) throw ERR_UNKNOWN; // token is inactive (logout)
  return result.id;
}