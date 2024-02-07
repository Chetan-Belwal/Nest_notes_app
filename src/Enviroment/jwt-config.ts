//JWT
export const jwtConfig = () => ({
  secret: process.env.SECRET,
  expireTime: process.env.EXPIRE_TIME,
});
