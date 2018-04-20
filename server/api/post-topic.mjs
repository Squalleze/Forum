import { ERR_BADREQUEST, ERR_INTERNAL } from '../lib/const';

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[POST] /api/topic');

    if (!req.is('json')) throw ERR_BADREQUEST;

    const title = req.body.title.trim().replace(/\s/g, ' ');
    const body = req.body.body.trimRight();

    if (title.length < 3 || title.length > 32) throw ERR_INTERNAL;
    if (body.length < 3 || body.length > 2048) throw ERR_INTERNAL;


  } catch (err) {
    res.error(err);
  }
};