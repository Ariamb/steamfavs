const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('src/database/favorite.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
        console.log('connected to database')
    }
});

//I decided to keep an open 'connection' on purpose.
//I probably wouldn't have done that on a web db.
//Also, I didn't used Sequelize as an ORM on purpose to keep it simple and tight.
//Looking back now, i realize how much easier it'd have been if I used knex.
//TODO: migrate to Knex.

module.exports = db

/*
SQL for the table:

CREATE TABLE "favorite" (
	"user"	TEXT,
	"appid"	INTEGER,
	"rating"	INTEGER NOT NULL,
	PRIMARY KEY("user","appid")
) WITHOUT ROWID;
*/