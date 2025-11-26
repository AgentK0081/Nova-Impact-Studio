// file: commands/suggest.js
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Submit a suggestion to the server.")
    .addStringOption(option =>
      option
        .setName("type")
        .setDescription("Type of suggestion")
        .setRequired(true)
        .addChoices(
          { name: "Game", value: "game" },
          { name: "Discord", value: "discord" }
        )
    )
    .addStringOption(option =>
      option
        .setName("suggestion")
        .setDescription("Your suggestion")
        .setRequired(true)
    ),

  async execute(interaction) {
    const type = interaction.options.getString("type");
    const suggestionText = interaction.options.getString("suggestion");

    // ❗ Replace with your channel ID
    const suggestionChannelId = "1443184638762680381";
    const channel = interaction.client.channels.cache.get(suggestionChannelId);

    if (!channel) {
      return interaction.reply({
        content: "❌ Suggestion channel not found.",
        ephemeral: true
      });
    }

    // Colors
    const color = type === "game" ? 0x00ff00 : 0x61c0ff; // green / light blue

    const embed = new EmbedBuilder()
      .setTitle("📬 New Suggestion")
      .setColor(color)
      .addFields(
        { name: "Type", value: type === "game" ? "Game" : "Discord" },
        { name: "Suggestion", value: suggestionText }
      )
      .setFooter({ text: `Suggestion by ${interaction.user.tag}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });

    await interaction.reply({
      content: "✅ Your suggestion has been submitted!",
      ephemeral: true
    });
  }
};
