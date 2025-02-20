const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        inativeUser: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
    return User;
};