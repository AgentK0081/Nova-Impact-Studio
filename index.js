import express from "express";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import "dotenv/config";
import interactionHandler from "./interactionHandler.js"; // Make sure this is default export

// --- Express server for Render ---
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(process.env.PORT || 3000, () =>
  console.log("Listening for Render keep-alive")
);

// --- Discord Bot ---
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Collection for slash commands
client.commands = new Collection();

// Load interaction handler
interactionHandler(client);

// Bot online
client.once("ready", () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

// Login
client.login(process.env.TOKEN);
