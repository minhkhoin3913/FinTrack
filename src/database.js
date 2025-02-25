import SQLite from "react-native-sqlite-storage";
import bcrypt from "bcryptjs";

const db = SQLite.openDatabase(
  { name: "financeTracker.db", location: "default" },
  () => console.log("Database opened successfully"),
  (error) => console.error("Database error:", error)
);

export const initializeDatabase = () => {
  db.transaction((tx) => {
    // Users Table (with hashed passwords)
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );`
    );

    // Transactions Table with predefined categories
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT CHECK (type IN ('income', 'expense', 'loan/debt')),
        category TEXT,
        amount REAL,
        note TEXT,
        date TEXT
      );`
    );
  });
};

// Predefined categories for validation
export const categories = {
  expense: [
    "Bill",
    "Charity",
    "Education",
    "Entertainment",
    "Family",
    "Food",
    "Health",
    "Other",
    "Shopping",
    "Transportation",
  ],
  income: ["Salary", "Interest", "Other"],
  "loan/debt": ["Loaned", "Loan", "Pay Debt", "Collect Debt"],
};

// Function to register a user (with hashed password)
export const registerUser = (email, password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(false);

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (email, password) VALUES (?, ?);",
        [email, hash],
        (_, results) => callback(true),
        (error) => callback(false)
      );
    });
  });
};

// Function to check login credentials
export const loginUser = (email, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ?;",
      [email],
      (_, results) => {
        if (results.rows.length > 0) {
          const user = results.rows.item(0);
          bcrypt.compare(password, user.password, (err, res) => {
            callback(res); // true if password matches
          });
        } else {
          callback(false);
        }
      },
      (error) => callback(false)
    );
  });
};

// Function to add a transaction (validates category)
export const addTransaction = (
  type,
  category,
  amount,
  note,
  date,
  callback
) => {
  if (!categories[type] || !categories[type].includes(category)) {
    return callback(false, "Invalid category.");
  }

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO transactions (type, category, amount, note, date) VALUES (?, ?, ?, ?, ?);",
      [type, category, amount, note, date],
      (_, results) => callback(true),
      (error) => callback(false, "Failed to add transaction.")
    );
  });
};

// Function to get all transactions
export const getTransactions = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM transactions ORDER BY date DESC;",
      [],
      (_, results) => {
        let transactions = [];
        for (let i = 0; i < results.rows.length; i++) {
          transactions.push(results.rows.item(i));
        }
        callback(transactions);
      },
      (error) => callback([])
    );
  });
};

export default db;
