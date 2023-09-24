import Sequelize from 'sequelize';
import sequelize from './sequelize.js';
import cryptoPassword from '../utils/cryptoPassword.js';
import GroupVsUser from './GroupVsUser.js';
import Token from './Token.js';
import Company from './Company.js';

class User extends Sequelize.Model {
    static associate = () => {
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
            GroupVsUser,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'user_id',
                },
            },
        );

        this.hasMany(
            Token,
            {
                onDelete: 'NO ACTION',
                foreignKey: {
                    allowNull: false,
                    name: 'user_id',
                },
            },
        );
    };
}

User.init(
    {
        username: {
            type: Sequelize.DataTypes.STRING(16),
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[a-z.]+$/,
            },
        },
        name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
            validate: { notEmpty: true },
        },
        password: {
            type: Sequelize.DataTypes.STRING(128),
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
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize: sequelize,
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
