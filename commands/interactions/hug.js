// hug.js

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { hugGifs } = require('../../gifs.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug a user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Mention a user')
                .setRequired(true)
    ),
    execute: async (interaction) => {
        const author = interaction.user;
        const authorName = author.username;
        let user = interaction.options.getUser('user');
        let gif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

        const hugEmbed = new EmbedBuilder()
            .setTitle(`${authorName} is hugging <@${user.id}>!`)
            .setThumbnail(gif);
    }
}