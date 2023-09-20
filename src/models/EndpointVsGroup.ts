import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class EndpointVsGroup extends sequelize.Model {
    static associate() {
        this.belongsTo(
            sequelizeInstance.models.endpoint,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'endpoint_id',
                    name: 'endpoint_id',
                },
            },
        );

        this.belongsTo(
            sequelizeInstance.models.group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'group_id',
                    name: 'group_id',
                },
            },
        );

        sequelizeInstance.models.endpoint.belongsToMany(
            sequelizeInstance.models.group,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'endpoint_id',
                    name: 'endpoint_id',
                },
            },
        );

        sequelizeInstance.models.group.belongsToMany(
            sequelizeInstance.models.endpoint,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'group_id',
                    name: 'group_id',
                },
            },
        );
    }
}

EndpointVsGroup.init(
    {
        id: {
            type: sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
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
