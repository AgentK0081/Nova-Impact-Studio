import { REST, Routes } from "discord.js";
import ping from "./commands/ping.js";

const commands = [
  ping.data.toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log("Uploading slash commands…");
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );
  console.log("Slash commands updated!");
} catch (err) {
  console.error(err);
}
