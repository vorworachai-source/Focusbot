const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

const ROBLOX_USERNAME = "FOCUSBOT_001";

// Get Roblox User ID
async function getUserId(username) {

  const response = await fetch(
    "https://users.roblox.com/v1/usernames/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: false
      })
    }
  );

  const data = await response.json();

  if (!data.data || !data.data[0]) {
    return null;
  }

  return data.data[0].id;
}

// Get Roblox Presence
async function getPresence(userId) {

  const response = await fetch(
    "https://presence.roblox.com/v1/presence/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userIds: [userId]
      })
    }
  );

  const data = await response.json();

  return data.userPresences[0];
}

// Bot Ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Message Event
client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  console.log("MESSAGE:", msg);

  // /checkfbgaem
  if (msg === "/checkfbgaem") {

    try {

      const userId = await getUserId(ROBLOX_USERNAME);

      if (!userId) {
        message.reply("could not find roblox user 💀");
        return;
      }

      const presence = await getPresence(userId);

      console.log(presence);

      // 0 = Offline
      // 1 = Online
      // 2 = In Game
      // 3 = In Studio

      if (presence.userPresenceType === 2) {

        const gameId = presence.placeId || "unknown";

        message.reply(
          `I am playing ${gameId} pls join mee`
        );

      } else if (presence.userPresenceType === 0) {

        message.reply("Zzzz...");

      } else {

        message.reply(
          "I am not playing a gamee pls wait"
        );

      }

    } catch (err) {

      console.error(err);

      message.reply(
        "something exploded 💀 check console"
      );

    }

  }

  // /checkstatusfb
  if (msg === "/checkstatusfb") {

    try {

      const userId = await getUserId(ROBLOX_USERNAME);

      if (!userId) {
        message.reply("could not find roblox user 💀");
        return;
      }

      const presence = await getPresence(userId);

      if (presence.userPresenceType !== 0) {

        message.reply(
          "i am online pls meet me"
        );

      } else {

        message.reply("ZZZZzzz...");

      }

    } catch (err) {

      console.error(err);

      message.reply(
        "status machine exploded 💀"
      );

    }

  }

  // Contains "bot"
  if (
    msg.includes("bot") &&
    msg !== "/checkfbgaem" &&
    msg !== "/checkstatusfb"
  ) {

    message.reply("don't report pls😭");

  }

  // Contains "focus"
  if (
    msg.includes("focus") &&
    msg !== "/checkfbgaem" &&
    msg !== "/checkstatusfb"
  ) {

    message.reply("FOCUS. 🫨Wooahh..!");

  }

});

// Error Catchers
client.on("error", console.error);

process.on("unhandledRejection", error => {
  console.error("Unhandled promise rejection:", error);
});

// Login
client.login(TOKEN);
