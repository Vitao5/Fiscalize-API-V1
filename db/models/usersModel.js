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
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    return User;
};