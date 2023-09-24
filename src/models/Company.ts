import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import Branch from './Branch.js';
import Group from './Group.js';
import User from './User.js';

class Company extends Sequelize.Model {
    static associate = () => {
        this.hasMany(
            Branch,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'company_id',
                },
            },
        );

        this.hasMany(
            Group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'company_id',
                },
            },
        );

        this.hasMany(
            User,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'company_id',
                },
            },
        );
    };
}

Company.init(
    {
        name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelize,
        modelName: 'company',
        tableName: 'companies',
        indexes: [
            {
                unique: true,
                fields: ['name'],
            },
        ],
    },
);

export default Company;
