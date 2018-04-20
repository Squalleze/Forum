import * as aux from '../lib/aux';
import {
  ERR_BADREQUEST,


  ERR_CONTENT_TYPE,
  ERR_USERNAME_NOTFOUND,
  ERR_PASSWORD_WRONG,
} from '../lib/const';
import {
  verifyUsername,
  verifyPassword,
} from '../lib/credentials';

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[POST] /api/token');

    if (!req.is('json')) throw ERR_BADREQUEST;

    const username = req.body.username.trim();
    const password = req.body.password;

    verifyUsername(username);
    verifyPassword(password);

    const results = await this.db.query('SELECT * FROM User WHERE username = ? LIMIT 1', [ username ]);
    const result = results[0];
    if (!result) throw ERR_USERNAME_NOTFOUND;

    const [ crypt ] = aux.reinforcePassword(password, result.salt);

    if (result.password.compare(crypt) !== 0) throw ERR_PASSWORD_WRONG;

    const hash = aux.randomToken();
    await this.db.query('INSERT INTO Token (hash, account) VALUES (?, ?)', [ hash, result.id ]);

    res.json({ token: hash.toString('hex') }).end();
  } catch (err) {
    res.error(err);
  }
};