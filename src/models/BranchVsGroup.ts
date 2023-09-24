import Sequelize from 'sequelize';
import Branch from './Branch.js';
import Group from './Group.js';
import sequelize from './sequelize.js';

class BranchVsGroup extends Sequelize.Model {
    static associate() {
        this.belongsTo(
            Branch,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'branch_id',
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

        Branch.belongsToMany(
            Group,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'branch_id',
                },
            },
        );

        Group.belongsToMany(
            Branch,
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

BranchVsGroup.init(
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
        modelName: 'branch_vs_group',
        tableName: 'branches_vs_groups',
        indexes: [
            {
                unique: true,
                fields: ['branch_id', 'group_id'],
            },
        ],
    },
);

export default BranchVsGroup;
