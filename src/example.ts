import Endpoint from './models/Endpoint.js';
import Group from './models/Group.js';
import User from './models/User.js';
import Branch from './models/Branch.js';
import sequelize from './models/sequelize.js';
import Company from './models/Company.js';
import Sequelize from 'sequelize';

export default async () => {
    console.log(await sequelize.transaction((transaction: Sequelize.Transaction) => Company.create(
        {
            name: 'Empresa Nome',
            groups: [
                {
                    name: 'Grupo Nome',
                    branches: [{
                        company_id: 1,
                        name: 'Filial Nome',
                    }],
                    endpoints: [
                        { path: '/', method: 'GET', description: 'Endpoint Descrição GET /' },
                        { path: '/a', method: 'GET', description: 'Endpoint Descrição GET /a' },
                    ],
                    users: [{
                        company_id: 1,
                        name: 'Usuário Nome',
                        username: 'usuario',
                        password: 'Usuário Senha',
                        enabled: true,
                    }],
                },
            ],
        },
        {
            transaction,
            include: {
                model: Group,
                include: [
                    Branch,
                    Endpoint,
                    User,
                ],
            },
        },
    )));

    console.log(JSON.stringify(
        await Company.findOne(
            {
                include: {
                    model: Group,
                    include: [
                        Branch,
                        Endpoint,
                        User,
                    ],
                },
            },
        ),
        null,
        4,
    ));
};
