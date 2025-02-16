module.exports = (sequelize, DataTypes) => {
    const purchasesInstallmentSchema = sequelize.define('PurchasesInstallment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        purchaseId: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        installmentNumber: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        installmentValue: {
            type: DataTypes.FLOAT,
            required: true,
            allowNull: false
        },
        installmentDate: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        installmentPaid: {
            type: DataTypes.BOOLEAN,
            required: true,
            allowNull: false
        },
    });

    return purchasesInstallmentSchema
}

// used to create table in database