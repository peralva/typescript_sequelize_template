import Endpoint from './models/Endpoint.js';
import Group from './models/Group.js';
import User from './models/User.js';
import Branch from './models/Branch.js';
import EndpointVsGroup from './models/EndpointVsGroup.js';
import BranchVsGroup from './models/BranchVsGroup.js';
import sequelizeInstance from './models/sequelize.js';
import Company from './models/Company.js';
import sequelize from 'sequelize';

export default async () => {
    const result = await Company.create({ name: 'Empresa Nome' });

    await sequelizeInstance.transaction((transaction: sequelize.Transaction) => User.create(
        {
            company_id: result.id,
            name: 'Usuário Nome',
            username: 'usuario',
            password: 'Usuário Senha',
            enabled: true,
            groups: [
                {
                    company_id: 1,
                    name: 'Grupo Nome',
                    endpoints: [
                        { path: '/', method: 'GET', description: 'Endpoint Descrição GET /' },
                        { path: '/a', method: 'GET', description: 'Endpoint Descrição GET /a' },
                    ],
                    branches: [{
                        company_id: 1,
                        name: 'Filial Nome',
                    }],
                },
            ],
        },
        {
            transaction,
            include: {
                model: Group,
                include: [
                    Endpoint,
                    Branch,
                ],
            },
        },
    ));

    await sequelizeInstance.transaction((transaction: sequelize.Transaction) => EndpointVsGroup.bulkCreate(
        [
            { group_id: 1, endpoint: { path: '/', method: 'GET', description: 'Endpoint Descrição GET /' } },
            { group_id: 1, endpoint: { path: '/a', method: 'GET', description: 'Endpoint Descrição GET /a' } },
        ],
        {
            transaction,
            include: Endpoint,
        },
    ));

    await sequelizeInstance.transaction((transaction: sequelize.Transaction) => BranchVsGroup.bulkCreate(
        [{
            group_id: 1,
            branch: {
                company_id: 1,
                name: 'Filial Nome',
            },
        }],
        {
            transaction,
            include: Branch,
        },
    ));
};
