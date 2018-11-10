import { RaidCommand } from "./commands/raid/raid";
import * as Discord from 'discord.js';

const bot = new Discord.Client();

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
                            pin.delete(cmd.timeout)
                        });
                    });
                }
            }
        }
    }
});