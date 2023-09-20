import fs from 'fs';
import path from 'path';
import url from 'url';
import sequelize from './sequelize.js';
import config from '../config.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const files = fs.readdirSync(__dirname).filter((value) => (true
    && ![basename, 'sequelize.js'].includes(value)
    && path.extname(value) === '.js'
));

export default async () => {
    const promises: object[] = [];

    files.forEach((value) => {
        promises.push(import(`file://${path.join(__dirname, value)}`));
    });

    await Promise.all(promises);

    Object.keys(sequelize.models).forEach((value) => {
        sequelize.models[value].associate?.();
    });

    await sequelize.sync({ force: config.sequelize.sync?.force});
};
