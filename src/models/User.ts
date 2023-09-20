import sequelize from 'sequelize';
import sequelizeInstance from './sequelize.js';
import cryptoPassword from '../utils/cryptoPassword.js';

class User extends sequelize.Model {
    static associate = () => {
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
            sequelizeInstance.models.group_vs_user,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'user_id',
                    name: 'user_id',
                },
            },
        );

        this.hasMany(
            sequelizeInstance.models.token,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    field: 'user_id',
                    name: 'user_id',
                },
            },
        );
    };
}

User.init(
    {
        username: {
            type: sequelize.DataTypes.STRING(16),
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[a-z.]+$/,
            },
        },
        name: {
            type: sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
        password: {
            type: sequelize.DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[0-9a-f]{128}$/,
            },
            set(value: string) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.setDataValue('password', cryptoPassword(value, this.username, this.company_id));
            },
        },
        enabled: {
            type: sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'user',
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['password'],
            },
            {
                unique: true,
                fields: ['company_id', 'username'],
            },
        ],
    },
);

export default User;
