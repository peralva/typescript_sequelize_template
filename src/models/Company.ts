import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class Company extends sequelize.Model {
    static associate = () => {
        this.hasMany(
            sequelizeInstance.models.branch,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'company_id',
                    name: 'company_id',
                },
            },
        );

        this.hasMany(
            sequelizeInstance.models.group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'company_id',
                    name: 'company_id',
                },
            },
        );

        this.hasMany(
            sequelizeInstance.models.user,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'company_id',
                    name: 'company_id',
                },
            },
        );
    };
}

Company.init(
    {
        name: {
            type: sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelizeInstance,
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
