import Sequelize from 'sequelize';
import crypto from 'crypto';
import sequelize from './sequelize.js';
import User from './User.js';

class Token extends Sequelize.Model {
    static associate() {
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
    }
}

Token.init(
    {
        value: {
            type: Sequelize.DataTypes.STRING(88),
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[A-Za-z0-9+/]+={0,2}$/,
            },
            set() {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.setDataValue('value', crypto.randomBytes(64).toString('base64'));
            },
        },
    },
    {
        sequelize: sequelize,
        modelName: 'token',
        tableName: 'tokens',
        indexes: [
            {
                unique: true,
                fields: ['value'],
            },
        ],
    },
);

export default Token;
