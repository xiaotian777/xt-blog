const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'no-secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/XT_BLOG',
  MAX_USER_ALLOWED: process.env.MONGODB_URI || 1
}

if (!process.env.JWT_SECRET) {
  console.log('Warning: no JWT_SECRET in process.env.');
}

module.exports = {config};