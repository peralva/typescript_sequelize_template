import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import Endpoint from './Endpoint.js';
import Group from './Group.js';

class EndpointVsGroup extends Sequelize.Model {
    static associate() {
        this.belongsTo(
            Endpoint,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'endpoint_id',
                },
            },
        );

        this.belongsTo(
            Group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'group_id',
                },
            },
        );

        Endpoint.belongsToMany(
            Group,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'endpoint_id',
                },
            },
        );

        Group.belongsToMany(
            Endpoint,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'group_id',
                },
            },
        );
    }
}

EndpointVsGroup.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'endpoint_vs_group',
        tableName: 'endpoints_vs_groups',
        indexes: [
            {
                unique: true,
                fields: ['endpoint_id', 'group_id'],
            },
        ],
    },
);

export default EndpointVsGroup;
