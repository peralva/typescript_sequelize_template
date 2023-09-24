import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import BranchVsGroup from './BranchVsGroup.js';
import Company from './Company.js';
import EndpointVsGroup from './EndpointVsGroup.js';
import GroupVsUser from './GroupVsUser.js';

class Group extends Sequelize.Model {
    static associate() {
        this.hasMany(
            BranchVsGroup,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'group_id',
                },
            },
        );

        this.belongsTo(
            Company,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'company_id',
                },
            },
        );

        this.hasMany(
            EndpointVsGroup,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'group_id',
                },
            },
        );

        this.hasMany(
            GroupVsUser,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'group_id',
                },
            },
        );
    }
}

Group.init(
    {
        name: {
            type: Sequelize.DataTypes.STRING(32),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelize,
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
