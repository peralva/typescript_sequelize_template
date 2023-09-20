import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class Group extends sequelize.Model {
    static associate() {
        this.hasMany(
            sequelizeInstance.models.branch_vs_group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'group_id',
                    name: 'group_id',
                },
            },
        );

        this.belongsTo(
            sequelizeInstance.models.company,
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
            sequelizeInstance.models.endpoint_vs_group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'group_id',
                    name: 'group_id',
                },
            },
        );

        this.hasMany(
            sequelizeInstance.models.group_vs_user,
            {
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

Group.init(
    {
        name: {
            type: sequelize.DataTypes.STRING(32),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'group',
        tableName: 'groups',
        indexes: [
            {
                unique: true,
                fields: ['name'],
            },
        ],
    },
);

export default Group;
