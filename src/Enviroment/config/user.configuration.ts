//Database and application port

export const dbConfig = () => ({
  database: {
    db_host: process.env.DATABASE_HOST,
    db_port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    db_password: process.env.PASSWORD,
    db_username: process.env.USERNAMEDB,
    db_dialect: process.env.DIALECT,
    db_name: process.env.DATABASE,
  },
});
