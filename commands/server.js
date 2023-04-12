const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provee información sobre el servidor"),
  async execute(interaction) {
    await interaction.reply(
      `Este servidor se llama **${interaction.guild.name}** y tiene **${interaction.guild.memberCount}** miembros`
    );
  },
};
