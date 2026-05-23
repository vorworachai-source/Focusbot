<!DOCTYPE html>
<html>
<head>
  <title>FOCUSBOT Discord Bot</title>
</head>
<body style="background:#111;color:white;font-family:sans-serif;">
  <h1>FOCUSBOT Discord Bot 🤖</h1>
  <p>Paste this into your host website/server.</p>

  <pre>
Required:
- Node.js
- discord.js
- node-fetch

Install:
npm install discord.js node-fetch
  </pre>

<pre><code>
const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

const ROBLOX_USERNAME = "FOCUSBOT_001";

async function getUserId(username) {
  const response = await fetch("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usernames: [username],
      excludeBannedUsers: false
    })
  });

  const data = await response.json();

  if (!data.data[0]) return null;

  return data.data[0].id;
}

async function getPresence(userId) {
  const response = await fetch("https://presence.roblox.com/v1/presence/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userIds: [userId]
    })
  });

  const data = await response.json();

  return data.userPresences[0];
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  // /checkfbgaem
  if (msg === "/checkfbgaem") {

    const userId = await getUserId(ROBLOX_USERNAME);

    if (!userId) {
      message.reply("could not find roblox user 💀");
      return;
    }

    const presence = await getPresence(userId);

    // 2 = in game
    if (presence.userPresenceType === 2) {

      const gameId = presence.placeId || "unknown";

      message.reply(
        `I am playing ${gameId} pls join mee`
      );

    } else if (presence.userPresenceType === 0) {

      message.reply("Zzzz...");

    } else {

      message.reply("I am not playing a gamee pls wait");

    }
  }

  // /checkstatusfb
  if (msg === "/checkstatusfb") {

    const userId = await getUserId(ROBLOX_USERNAME);

    if (!userId) {
      message.reply("could not find roblox user 💀");
      return;
    }

    const presence = await getPresence(userId);

    if (presence.userPresenceType !== 0) {

      message.reply("i am online pls meet me");

    } else {

      message.reply("ZZZZzzz...");

    }
  }

  // word "bot"
  if (msg.includes("bot")) {
    message.reply("don't report pls😭");
  }

  // word "focus"
  if (msg.includes("focus")) {
    message.reply("FOCUS. 🫨Wooahh..!");
  }

});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(TOKEN);
</code></pre>

<h2>How to run 🚀</h2>

<pre>
1. Save as:
index.js

2. Open terminal

3. Run:
node index.js

4. Invite bot to server
</pre>

</body>
</html>

