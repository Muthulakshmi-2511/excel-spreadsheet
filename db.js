const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('excelData', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define the model
const ExcelEntry = sequelize.define('ExcelEntry', {
    data: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'excel_entries',
    timestamps: false
});

// Sync the model with the database
sequelize.sync();

module.exports = {
    sequelize,
    ExcelEntry
};
