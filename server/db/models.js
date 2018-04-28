const crypto = require('crypto')
const Sequelize = require('sequelize')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${sudoku}`,
  {
    logging: false
  }
)

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  losses: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

const Puzzle = db.define('puzzle', {
  start: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  solution: {
    type: Sequelize.STRING,
    allowNull: false
  },
  starts: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  losses: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})
