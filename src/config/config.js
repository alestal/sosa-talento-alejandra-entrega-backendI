const path = require ("path");

module.exports = {
    PORT:8080,
    database: {
      uri: process.env.MONGO_URI,
  },
    paths:{
       views: path.join(__dirname,"../views"),
     
        public: path.join(__dirname,"../../public"),
    },
};