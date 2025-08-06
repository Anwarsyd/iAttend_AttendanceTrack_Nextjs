// export default {
//     schema: "./utils/schema.js",
//     driver: 'mysql2',
//     dbCredentials: {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         port: Number(process.env.DB_PORT)
//     } 
// }

require('dotenv').config({ path: ".env.local" });

export default {
    schema: "./utils/schema.js",
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT)
  },
};
