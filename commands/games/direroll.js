// diceroll.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diceroll')
        .setDescription('Roll the dice!'),
    execute: async (interaction) => {
        const numbers = [1, 2, 3, 4, 5, 6];
        let number = numbers[Math.floor(Math.random() * numbers.length)];
        await interaction.reply(`You got a ${number}`);
    },
};