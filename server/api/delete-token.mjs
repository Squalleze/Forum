import {
  ERR_UNAUTHORIZED,
  ERR_BADREQUEST,
  ERR_FORBIDDEN,
  ERR_UNKNOWN,

  PATTERN_TOKEN,
} from '../lib/const';

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[DELETE] /api/token');

    const token = req.get('Token');

    if (!token) throw ERR_UNAUTHORIZED;
    if (!PATTERN_TOKEN.test(token)) throw ERR_BADREQUEST;

    const results = await this.db.query('SELECT isActive, (expires < NOW()) AS isExpired FROM Token WHERE hash = UNHEX(?) LIMIT 1', [ token ]);
    const result = results[0];

    if (!result) throw ERR_UNKNOWN; // doesn't exists
    if (!result.isActive) throw ERR_UNKNOWN; // inactived (already deleted)
    if (result.isExpired) throw ERR_UNKNOWN; // expired
  
    await this.db.query('UPDATE Token SET isActive = 0 WHERE hash = UNHEX(?) LIMIT 1', [ token ]);

    res.json({}).end();
  } catch (err) {
    res.error(err);
  }
};