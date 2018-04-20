import mysql from 'mysql';
import util from 'util';

export default class MySQLConnection {
  constructor(config) {
    this.db = mysql.createConnection(config);
    this.connect = util.promisify(this.db.connect.bind(this.db));
    this.query = util.promisify(this.db.query.bind(this.db));
  }
}