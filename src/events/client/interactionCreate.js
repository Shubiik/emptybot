const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Něco je špatně s příkazem...`,
          ephemeral: true,
        });
      }
    } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete){
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error('Tady není žádný kód pro modal.')

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.log(error);
      }
    } else if (interaction.isButton()) {
      const {buttons} = client;
      const {customId} = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no button.");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isSelectMenu()) {
      const {selectMenus} = client;
      const {customId} = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("There is no menu.");

      try {
        await menu.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};