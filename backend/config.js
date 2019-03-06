// // config.js
// const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'test'

// const production = {
//     env: { env },
//     app: {
//         port: parseInt(process.env.DEV_APP_PORT) || 3000
//     },
//     db: {
//         host: process.env.DEV_DB_HOST || 'localhost',
//         port: parseInt(process.env.DEV_DB_PORT) || 27017,
//         name: process.env.DEV_DB_NAME || 'db'
//     }
// };
// const test = {
//     env: { env },
//     app: {
//         port: parseInt(process.env.TEST_APP_PORT) || 3000
//     },
//     db: {
//         host: process.env.TEST_DB_HOST || 'localhost',
//         port: parseInt(process.env.TEST_DB_PORT) || 27017,
//         name: process.env.TEST_DB_NAME || 'test'
//     }
// };

// const config = {
//     production,
//     test
// };

// module.exports = config[env];