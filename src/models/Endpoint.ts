import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import EndpointVsGroup from './EndpointVsGroup.js';

class Endpoint extends Sequelize.Model {
    static associate() {
        this.hasMany(
            EndpointVsGroup,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'endpoint_id',
                },
            },
        );
    }
}

Endpoint.init(
    {
        path: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
        method: {
            type: Sequelize.DataTypes.STRING(7),
            allowNull: false,
            validate: { notEmpty: true },
        },
        description: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelize,
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
