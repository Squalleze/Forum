import {
  ERR_BADREQUEST,
  ERR_NOTFOUND,
} from '../lib/const';

function userInfo(row) {
  return {
    id: row.id,
    username: row.username,
  };
}

async function getParents(db, sectionID) {
  const rows = await db.query(`
    WITH RECURSIVE Path AS (
      SELECT e.id, e.section, e.name, 0 AS depth
      FROM Section AS e
      WHERE id = ?
      UNION
      SELECT e2.id, e2.section, e2.name, depth+ 1
      FROM Section AS e2
        JOIN Path ON Path.section = e2.id
    ) SELECT id, name FROM Path WHERE depth > 0 ORDER BY depth DESC`, [ sectionID ]);

  return rows.map(e => ({ id: e.id, name: e.name }));
}

async function getSectionTopics(db, sectionID) {
  const rows = await db.query({
      sql: `
        SELECT
          Topic.*,

          TopicAuthor.id,
          TopicAuthor.username,

          Comment.*,

          CommentAuthor.id,
          CommentAuthor.username

        FROM Topic JOIN Comment ON Comment.id = (
          SELECT id FROM Comment
          WHERE Comment.topic = Topic.id
          ORDER BY timestamp DESC
          LIMIT 1
        ) JOIN User AS CommentAuthor ON CommentAuthor.id = Comment.author
        JOIN User AS TopicAuthor ON TopicAuthor.id = Topic.author
        WHERE Topic.section = ? ORDER BY Comment.timestamp DESC LIMIT 100;`,
      nestTables: true,
    }, [ sectionID ]);
  return rows.map(
    (row) => ({
      id: row.Topic.id,
      title: row.Topic.title,
      isFixed: row.Topic.fixed,
      isOpen: row.Topic.open,
      timestamp: row.Topic.timestamp,
      totalComments: row.Topic.totalComments,
      author: userInfo(row.TopicAuthor),
      lastComment: {
        id: row.Comment.id,
        timestamp: row.Comment.timestamp,
        author: userInfo(row.CommentAuthor)
      }
    })
  );
}

async function getSection(db, result) {
  const [ sections, topics, parents ] = await Promise.all([
    getSections(db, result.id),
    getSectionTopics(db, result.id),
    getParents(db, result.id)
  ]);
  return { id: result.id, name: result.name, parents, isOpen: result.open, sections, topics };
}

async function getSections(db, id) {
  const rows = await db.query('SELECT id, name, isOpen FROM Section WHERE section = ?', [ id ]);
  return rows.map((row) => ({ ...row }));
}

export default async function(req, res) {
  try {
    res.type('json');
    console.log('[GET] /api/section');

    if (!req.query.id || !req.query.id.match(/^(0|[1-9]\d*)$/)) throw ERR_BADREQUEST;

    const sectionID = req.query.id;

    const results = await this.db.query('SELECT * FROM Section WHERE id = ?', [ sectionID ]);
    if (results.length < 1) throw ERR_NOTFOUND;

    const data = await getSection(this.db, results[0]);
    res.json(data).end();
  } catch (err) {
    res.error(err);
  }
};

// SELECT * FROM Section WHERE section IS NULL;