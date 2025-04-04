import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'ActionsDB.db', location: 'default' },
  () => console.log('Database opened'),
  error => console.error('Database error:', error)
);

// Initialize the database and create the table
export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS actions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        createdAt INTEGER ,
        finishedAt INTEGER 
      );`
    );
  });
};


export function RemoveActionTable() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE IF EXISTS actions;`,
        [],
        () => resolve('Table deleted successfully'),
        (_, error) => reject(`error deleting table: ${error.message}`))
    });
  });
}

// CRUD Operations
export const addAction = (title, description, createdAt) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO actions (title, description, createdAt) VALUES (?, ?,?)`,
        [title, description, createdAt],
        (_, result) => {
          const insertedId = result.insertId;

          // Fetch the newly created action
          tx.executeSql(
            `SELECT * FROM actions WHERE id = ?`,
            [insertedId],
            (_, res) => resolve(res.rows.item(0)),
            error => reject(error)
          );
        },
        error => reject(error)
      );
    });
  });
};



export const getActions = (date = null) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      if (!date) {
        // Fetch all actions if no date is provided
        tx.executeSql(
          `SELECT * FROM actions 
          ORDER BY createdAt DESC`,
          [],
          (_, result) => resolve(result.rows.raw()),
          error => reject(error)
        );
      } else {
        // Calculate the start and end of the selected day
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(date).setHours(23, 59, 59, 999);

        tx.executeSql(
          `SELECT * FROM actions WHERE createdAt >= ? AND createdAt <= ?
          ORDER BY createdAt DESC`,
          [startOfDay, endOfDay],
          (_, result) => resolve(result.rows.raw()),
          error => reject(error)
        );
      }
    });
  });
};




export const getAction = (id) =>{
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Actions WHERE id = ?`,
        [id],
        (_,res)=> resolve(res.rows.item(0)),
        error =>reject(error)
      );
    });
  });
};

export const updateAction = (id, title, description, createdAt, finishedAt) => {
  console.log(finishedAt);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE actions SET title = ?, description = ?, createdAt = ?, finishedAt = ? WHERE id = ?`,
        [title, description,createdAt, finishedAt, id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            // Fetch the updated action
            tx.executeSql(
              `SELECT * FROM actions WHERE id = ?`,
              [id],
              (_, res) => resolve(res.rows.item(0)),
              error => reject(error)
            );
          } else {
            reject(new Error(`No action found with id ${id}`));
          }
        },
        error => reject(error)
      );
    });
  });
};

export const deleteAction = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM actions WHERE id = ?`,
      [id],
      (_, result) => console.log('Action deleted:', result),
      error => console.error('Delete error:', error)
    );
  });
};
