const { SlashCommandBuilder } = require("discord.js");

// Nuevo comando slash
module.exports = {
  // Definicion del comando
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde con Pong!"),
  // Metodo que contienen la funcionalidad del comando, usado en el Command handler
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
