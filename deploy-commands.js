import { REST, Routes } from "discord.js";
import { glob } from "glob";
import path from "path";

const commands = [];

const files = await glob("commands/*.js");
for (const file of files) {
  const cmd = (await import(path.resolve(file))).default;
  commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

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
