const env = process.env.NODE_ENV || 'development';

const config: {
    [key: string]: {
        token_time: number,
        sequelize: {
            sync?: {
                force?: boolean,
            },
            options: {
                dialect: string,
                storage: string,
                define: {
                    createdAt: string,
                    updatedAt: string,
                    underscored: boolean,
                    version: boolean,
                },
            }
        }
    }
} = {
    development: {
        token_time: 1000 * 15,
        sequelize: {
            sync: {
                force: true,
            },
            options: {
                dialect: 'sqlite',
                storage: `${env}.database.sqlite`,
                define: {
                    createdAt: 'created_at',
                    updatedAt: 'updated_at',
                    underscored: true,
                    version: true,
                },
            },
        },
    },
};

export default (() => (config[env]))();
