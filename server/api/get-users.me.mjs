import { ERR_BADREQUEST } from '../lib/const.mjs';
import { ERR_UNKNOWN } from '../lib/const.mjs';
import { PATTERN_TOKEN } from '../lib/const.mjs';

const SQL_GETTOKEN = `
SELECT
  T.isActive,
  (T.expires < NOW()) AS isExpired,

  U.id,
  U.username,
  U.permLevel,
  U.isBanned

  FROM Token AS T
  JOIN User AS U
    ON U.id = T.account
  WHERE T.hash = UNHEX(?) LIMIT 1
`;

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[GET] /api/users/@me');

    const token = req.get('Token');

    if (!token) throw ERR_BADREQUEST;
    if (!PATTERN_TOKEN.test(token)) throw ERR_BADREQUEST;

    const results = await this.db.query(SQL_GETTOKEN, [ token ]);
    const result = results[0];

    if (!result) throw ERR_UNKNOWN;
    if (!result.isActive) throw ERR_UNKNOWN;
    if (result.isExpired) throw ERR_UNKNOWN;

    const data =  { id: result.id, username: result.username, isBanned: result.isBanned, permLevel: result.permLevel, avatar: 'https://cdn.discordapp.com/avatars/309887425826521088/ed6319a263e3288b0cfd9ac89b3329a2.png' };
    res.json(data).end();
  } catch (err) {
    res.error(err);
  }
};