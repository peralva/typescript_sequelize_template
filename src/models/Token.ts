import sequelize from 'sequelize';
import crypto from 'crypto';
import sequelizeInstance from './sequelize.js';

class Token extends sequelize.Model {
    static associate() {
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
    }
}

Token.init(
    {
        value: {
            type: sequelize.DataTypes.STRING(88),
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
        sequelize: sequelizeInstance,
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
