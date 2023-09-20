import Sequelize from 'sequelize';
import config from '../config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sequelize: any = new Sequelize(
    undefined,
    undefined,
    undefined,
    config?.sequelize.options,
);

export default sequelize;
