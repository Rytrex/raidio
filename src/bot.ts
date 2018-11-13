import { RaidCommand } from './commands/raid/raid';
import { InfoCommand } from './commands/info/info';
import * as Discord from 'discord.js';

let bot = new Discord.Client();

bot.on('message', (message) => {
    if (message.type === 'PINS_ADD') {
        message.delete();
    } else {
        if (message.content) {
            let command = message.content.split(' ')[0];
            let params = message.content.split(' ').slice(1);

            if (command === '!raid') {
                let cmd = new RaidCommand(params);
                let msg = cmd.buildRichEmbed;

                if (typeof msg === 'string') {
                    message.reply(msg);
                    console.log('Bad Raid Command received: ' + params.join(' '));
                } else {
                    // send raid notification and delete after a certain amount of time
                    message.channel.send(msg).then(raid => {
                        (<Discord.Message>raid).pin().then(pin => {
                            // TODO: figure out timeout and update delete timeout
                            pin.delete(cmd.timeout);
                        });
                    });
                    console.log('Successful Raid Command received: ' + params.join(' '));
                }
            } else if (command === '!info') {
                let info = new InfoCommand(params[0]);
                message.channel.send(info.buildRichEmbed);
                console.log('Successful Info Command received: ' + params.join(' '));
            }
        }
        if (message.embeds.length > 0) {
            message.awaitReactions(reaction => {
                if (reaction.emoji.name === 'info') {
                    console.log(message.embeds[0].title)
                    if (/Tier.*Raid/.test(message.embeds[0].title)) {
                        // TODO generate new raid embed
                    } else if (/.*Raid/.test(message.embeds[0].title)) {
                        console.log(message.embeds[0].title.split(' ')[0]);
                        let cmd = new InfoCommand('Bulbasaur');
                        reaction.users.last().send(cmd.buildRichEmbed);
                    }
                }

                return true;
            });
        }
    }
});

bot.login('MzQ2NDIxMTg4NTg0NTM4MTEy.DsOijA.TgCls5FKxoRoFXvPBjcST8LL9XI');
console.log('Juiz has booted up.');
