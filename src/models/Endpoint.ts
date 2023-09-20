import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class Endpoint extends sequelize.Model {
    static associate() {
        this.hasMany(
            sequelizeInstance.models.endpoint_vs_group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'endpoint_id',
                    name: 'endpoint_id',
                },
            },
        );
    }
}

Endpoint.init(
    {
        path: {
            type: sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
        method: {
            type: sequelize.DataTypes.STRING(7),
            allowNull: false,
            validate: { notEmpty: true },
        },
        description: {
            type: sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'endpoint',
        tableName: 'endpoints',
        indexes: [
            {
                unique: true,
                fields: ['path', 'method'],
            },
            {
                unique: true,
                fields: ['description'],
            },
        ],
    },
);

export default Endpoint;
