
export const dbConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port_db: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      password: process.env.PASSWORD ,
      username: process.env.USERNAMEDB,
      dialect: process.env.DIALECT,
      database: process.env.DATABASE
    },
    jwt:{
      secret: process.env.SECRET,
      expire_time: process.env.EXPIRE_TIME
    }
  });