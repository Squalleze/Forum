import * as aux from '../lib/aux';
import {
  ERR_BADREQUEST,

  ERR_INTERNAL,
  ERR_USERNAME_TAKEN,
} from '../lib/const';
import {
  verifyUsername,
  verifyPassword,
} from '../lib/credentials';

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[POST] /api/register');

    if (!req.is('json')) throw ERR_BADREQUEST;

    const username = req.body.username.trim();
    const password = req.body.password;

    verifyUsername(username);
    verifyPassword(password);

    const results = await this.db.query('SELECT COUNT(*) AS exists FROM User WHERE LOWER(username) = LOWER(?) LIMIT 1', [ username ]);
    const result = results[0];

    if (!result) throw ERR_INTERNAL; // SQL ERRORS?
    if (result.exists) throw ERR_USERNAME_TAKEN;

    const [ crypt, salt ] = aux.reinforcePassword(password);
    const results2 = await this.db.query('INSERT INTO User (username, password, salt) VALUES (?, ?, ?)', [ username, crypt, salt ]);

    const hash = aux.randomToken();
    await this.db.query('INSERT INTO Token (hash, account) VALUES (?, ?)', [ hash, results2.insertId ]);

    res.json({ token: hash.toString('hex') }).end();
  } catch (err) {
    res.error(err);
  }
};