import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';

class Branch extends sequelize.Model {
    static associate() {
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
            sequelizeInstance.models.branch_vs_group,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'branch_id',
                    name: 'branch_id',
                },
            },
        );
    }
}

Branch.init(
    {
        name: {
            type: sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize: sequelizeInstance,
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
