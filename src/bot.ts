import { RaidCommand } from "./commands/raid/raid";
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
                    message.reply(msg)
                } else {
                    // send raid notification and delete after a certain amount of time
                    message.channel.send(msg).then(raid => {
                        (<Discord.Message>raid).pin().then(pin => {
                            // TODO: figure out timeout and update delete timeout
                            pin.delete(6300000)
                        });
                    });
                }
                console.log('Raid Command received: ' + params.join(' '));
            }
        }
    }
});

bot.login('MzQ2NDIxMTg4NTg0NTM4MTEy.DsOijA.TgCls5FKxoRoFXvPBjcST8LL9XI')
console.log('Juiz has booted up.');