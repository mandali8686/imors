const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO || "129.114.27.13:27017/Pulse";
const REACTURL = 'https://www.sinooka.com';
const apiUrl = 'https://localhost:3000'
const testMongo = "mongodb://129.114.27.13:27017/Pulse";

module.exports = {
  PORT,
  MONGO,
  REACTURL,
  apiUrl,
  testMongo,
};
