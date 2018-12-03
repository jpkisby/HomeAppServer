const redis = require("redis");
const url = require("url");
const { RECIPES } = require("./constants");

const getClient = () => {
  if (process.env.REDISTOGO_URL) {
    const rtg = url.parse(process.env.REDISTOGO_URL);
    console.log("rtg", rtg, rtg.hostname);
    const client = redis.createClient(rtg.port || "", rtg.hostname);
    console.log("client", client);

    const auth = rtg.auth || "";
    console.log("auth", auth);
    client.auth(auth.split(":")[1]);
    console.log("client again", client);
    return client;
  } else {
    console.log("creating new client");
    const client = redis.createClient();
    console.log("new client", client);
    return client;
  }

  // setInterval(() => {
  //   sendLocalData();
  //   pullServerData();
  // }, 60000);
};

module.exports.getRecipes = (): any => {
  const client = getClient();
  client.set(RECIPES, "hi", redis.print);
  console.log("size", client.dbsize());
  return client.get(RECIPES);
};

// const sendLocalData = () => {
//   console.log("sending");
//   client.hset(RECIPES, "oatmeal", "piece 1", redis.print);
// };

// const pullServerData = () => {
//   console.log("pulling");
//   client.hkeys(RECIPES, (err, replies) => {
//     console.log(replies.length, " replies:");
//     replies.forEach((reply, i) => {
//       console.log("        ", i, ": ", reply);
//     });
//   });
// };
