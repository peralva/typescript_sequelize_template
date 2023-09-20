import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class BranchVsGroup extends sequelize.Model {
    static associate() {
        this.belongsTo(
            sequelizeInstance.models.branch,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'branch_id',
                    name: 'branch_id',
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

        sequelizeInstance.models.branch.belongsToMany(
            sequelizeInstance.models.group,
            {
                through: this,
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'branch_id',
                    name: 'branch_id',
                },
            },
        );

        sequelizeInstance.models.group.belongsToMany(
            sequelizeInstance.models.branch,
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

BranchVsGroup.init(
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
