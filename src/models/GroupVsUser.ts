import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class GroupVsUser extends sequelize.Model {
    static associate() {
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

        this.belongsTo(
            sequelizeInstance.models.user,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'user_id',
                    name: 'user_id',
                },
            },
        );

        sequelizeInstance.models.group.belongsToMany(
            sequelizeInstance.models.user,
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

        sequelizeInstance.models.user.belongsToMany(
            sequelizeInstance.models.group,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'user_id',
                    name: 'user_id',
                },
            },
        );
    }
}

GroupVsUser.init(
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
        modelName: 'group_vs_user',
        tableName: 'groups_vs_users',
        indexes: [
            {
                unique: true,
                fields: ['group_id', 'user_id'],
            },
        ],
    },
);

export default GroupVsUser;
