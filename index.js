import { Client, GatewayIntentBits, Collection } from "discord.js";
import "dotenv/config";
import interactionHandler from "./interactionHandler.js";

// Create the client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Collection for slash commands
client.commands = new Collection();

// Load interaction handler
interactionHandler(client);

// When bot is online
client.once("ready", () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

// Login using token from environment variable
client.login(process.env.TOKEN);
