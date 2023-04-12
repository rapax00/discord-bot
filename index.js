///// Requires /////
// Require necesrios para hacer el Command handler
const fs = require("node:fs"); // Usado para leer el directorio de comandos y identidicar los archivos de comandos
const path = require("node:path"); // Ayuda a construir las rutas de de acceso a archivos y carpetas
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

///// Clientes /////
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Cliente para organizar los comandos, Collection es un Map con mas funcionalidades
client.commands = new Collection();

///// Recuperacion de los archivos de comandos /////
const commandsPath = path.join(__dirname, "commands"); // Construye la path de la carpeta commands
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js")); // Lee el la carpeta y devuelve un array con los archivos filtrados solo .js

// loop para importar uno por uno los asrchivos de comandos
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file); // Construye el path del archivo comando
  const command = require(filePath); // Importamos el comando
  // Establece un nuevo item en Collection con el nombre como key y la data como el valor
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] El comando de ${filePath} falló`);
  }
}

///// Recibir interacciones /////
client.on(Events.InteractionCreate, async (interaction) => {
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
});

///// Iniciacion del bot /////
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Listo! Loggeado como ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
