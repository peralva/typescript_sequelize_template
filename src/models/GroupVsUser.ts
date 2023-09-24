import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import Group from './Group.js';
import User from './User.js';

class GroupVsUser extends Sequelize.Model {
    static associate() {
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

        this.belongsTo(
            User,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'user_id',
                },
            },
        );

        Group.belongsToMany(
            User,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'group_id',
                },
            },
        );

        User.belongsToMany(
            Group,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'user_id',
                },
            },
        );
    }
}

GroupVsUser.init(
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
