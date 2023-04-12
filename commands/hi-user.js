const { SlashCommandBuilder } = require("discord.js");

// Nuevo comando slash
module.exports = {
  // Definicion del comando
  data: new SlashCommandBuilder()
    .setName("hi-user")
    .setDescription("Saluda al usuario"),
  // Metodo que contienen la funcionalidad del comando, usado en el Command handler
  async execute(interaction) {
    await interaction.reply(`Hola ${interaction.user.username}!`);
    await interaction.user
      .send("Hola!")
      .then((message) =>
        console.log(
          `Mensaje enviado: ${message.content} a ${interaction.user.tag}`
        )
      )
      .catch(console.error);
  },
};
