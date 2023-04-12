const { Events } = require("discord.js");

module.exports = {
  name: interactionCreate,
  async execute(client) {
    if (!interaction.isChatInputCommand()) return; // Si es un salsh command no lo detecta

    const command = interaction.client.commands.get(interaction.commandName); // Obtenemos el nombre del salsh command a traves del cliente

    // Si el comando existe no entra, si no devuelve el error
    if (!command) {
      console.error(`No se encontro el comando ${interaction.commandName}`);
      return;
    }

    // Executa el comando
    try {
      await command.execute(interaction);
    } catch (error) {
      // Si hay error lo devuelve
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Ah ocurrido un error mientras se ejecutaba el comando",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Ah ocurrido un error mientras se ejecutaba el comando",
          ephemeral: true,
        });
      }
    }
  },
};
