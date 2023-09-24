import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import Company from './Company.js';
import BranchVsGroup from './BranchVsGroup.js';

class Branch extends Sequelize.Model {
    static associate() {
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
            BranchVsGroup,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'branch_id',
                },
            },
        );
    }
}

Branch.init(
    {
        name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelize,
        modelName: 'branch',
        tableName: 'branches',
        indexes: [
            {
                unique: true,
                fields: ['company_id', 'name'],
            },
        ],
    },
);

export default Branch;
