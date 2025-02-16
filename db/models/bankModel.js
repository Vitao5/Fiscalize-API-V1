// Used for creating the bank table in the database
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Bank = sequelize.define("Bank", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        bankName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        datePayment: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
    }, {
        tableName: 'bank',
        timestamps: false
    });

    return Bank;
};