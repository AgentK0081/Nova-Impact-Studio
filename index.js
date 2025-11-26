import { Client, GatewayIntentBits, Collection } from "discord.js";
import express from "express";
import { glob } from "glob";
import path from "path";
import { handleInteraction } from "./interactionHandler.js";

// --- Keep Render alive ---
const app = express();
app.get("/", (_, res) => res.send("Bot is online!"));
app.listen(process.env.PORT || 3000);

// --- Discord setup ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// --- Load commands ---
const files = await glob("commands/*.js");
for (const file of files) {
  const command = (await import(path.resolve(file))).default;
  client.commands.set(command.data.name, command);
}

// --- Slash command handler ---
client.on("interactionCreate", (interaction) =>
  handleInteraction(interaction, client)
);

// --- Bot login ---
client.login(process.env.DISCORD_TOKEN);
