import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

// --- Keep Render service alive ---
const app = express();
app.get("/", (_, res) => res.send("Bot is online!"));
app.listen(process.env.PORT || 3000);

// --- Discord Bot Setup ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// --- Basic Command ---
client.on("messageCreate", msg => {
  if (msg.author.bot) return;

  if (msg.content === "!ping") {
    msg.reply("Pong! 🏓");
  }
});

// --- Login ---
client.login(process.env.DISCORD_TOKEN)
  .catch(err => console.error("Invalid Discord token!", err));
