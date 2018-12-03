import redis, { ClientOpts } from "redis";
import url from "url";
import { RECIPES } from "./constants";

const getClient = (): redis.RedisClient => {
  if (process.env.REDISTOGO_URL) {
    const rtg = url.parse(process.env.REDISTOGO_URL);
    console.log("rtg", rtg, rtg.hostname as ClientOpts);
    const client = redis.createClient(
      rtg.port || "",
      rtg.hostname as ClientOpts
    );
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

export const getRecipes = (): any => {
  const client = getClient();
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
