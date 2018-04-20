import {
  ERR_INTERNAL,
} from '../lib/const';

async function getComment(db, section) {
  const results = await db.query(`
    SELECT
      T.id AS topicID,
      T.title AS topicTitle,
      T.isOpen AS topicIsOpen,
      T.timestamp AS topicTimestamp,

      U1.id AS topicAuthorID,
      U1.username AS topicAuthorUsername,

      U2.id AS commentAuthorID,
      U2.username AS commentAuthorUsername,

      C.id AS commentID,
      C.timestamp AS commentTimestamp
    FROM Topic AS T
      JOIN Comment AS C
        ON C.topic = T.id
      JOIN Section AS S
        ON S.id = T.section
      JOIN User AS U1
        ON U1.id = T.author
      JOIN User AS U2
        ON U2.id = C.author
    WHERE S.id = ?
    ORDER BY C.timestamp DESC
    LIMIT 1
  `, [ section ]);
  const result = results[0];
  if (!result) return null;

  const results2 = await db.query('SELECT COUNT(*) AS total FROM Comment WHERE topic = ?', [ result.topicID ]);
  if (results2.length < 1) throw ERR_INTERNAL;

  return {
    id: result.topicID,
    title: result.topicTitle,
    timestamp: result.topicTimestamp,
    isOpen: result.topicIsOpen,
    totalComments: results2[0].total,
    author: { id: result.topicAuthorID, username: result.topicAuthorUsername },
    lastComment: {
      id: result.commentID,
      timestamp: result.commentTimestamp,
      author: { id: result.commentAuthorID, username: result.commentAuthorUsername }
    }
  };
}

async function getSection(db, result) {
  const [ sections, lastTopic ] = await Promise.all([ getSections(db, result.id), getComment(db, result.id) ]);
  return { id: result.id, name: result.name, isOpen: result.open, sections, lastTopic };
}

async function getSections(db, id) {
  const results = await db.query('SELECT * FROM Section WHERE section = ?', [ id ]);
  return Promise.all(results.map(result => getSection(db, result)));
}

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[GET] /api/sections');

    const results = await this.db.query('SELECT * FROM Section WHERE section IS NULL');
    const data = await Promise.all(results.map(result => getSection(this.db, result)));

    res.json(data).end();
  } catch (err) {
    res.error(err);
  }
};

// SELECT * FROM Section WHERE section IS NULL;