// config.js
const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'production'

const production = {
    env: env,
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST ||
            "mongodb+srv://admin:admin@cluster0-uicrg.mongodb.net/node-angular?retryWrites=true",
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'db'
    }
};
const dev = {
    env: env,
    app: {
        port: parseInt(process.env.dev_APP_PORT) || 3000
    },
    db: {
        host: process.env.dev_DB_HOST || "mongodb+srv://admin:admin@cluster0-uicrg.mongodb.net/node-angular?retryWrites=true",
        port: parseInt(process.env.dev_DB_PORT) || 27017,
        name: process.env.dev_DB_NAME || 'dev'
    }
};

const config = {
    dev,
    production
};

module.exports = config[env];