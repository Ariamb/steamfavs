const sqlite3 = require('sqlite3').verbose();
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "src/database/favorite.db"
  },
  useNullAsDefault: true
});

//I decided to keep an open 'connection' on purpose.
//I probably wouldn't have done that on a web db.
//Also, I didn't used Sequelize or other ORM on purpose: the database is too small to justify it.
//decided on knex because it reduces callback hell, and abstracts the SQL 
//I've made this entire project using querries before getting knex in here lol

module.exports = knex

/*
SQL for the table:

CREATE TABLE "favorite" (
	"user"	TEXT,
	"appid"	INTEGER,
	"rating"	INTEGER NOT NULL,
	PRIMARY KEY("user","appid")
) WITHOUT ROWID;

yeah, i know i shouldn't have put it here, but that's a way to show the database to you all.
*/