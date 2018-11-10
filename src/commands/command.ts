import { RichEmbed, Client } from "discord.js";

export abstract class Command {
    public embed: RichEmbed;

    constructor() {
        this.embed = new RichEmbed();
    }

    abstract get buildRichEmbed(): RichEmbed | string;

    protected timeConversion(time: string): Date {
        let dateTime = new Date();
        let timeCommand = time.split(':');

        let postMidday = timeCommand[1].includes('p');
        let hours = Number.parseInt(timeCommand[0]);
        let minutes = Number.parseInt(timeCommand[1].slice(0, 2));
        
        return new Date(dateTime.setHours(hours + (postMidday ? 12 : 0), minutes, 0));
    }

    protected toReadableDate(date: Date): string {
        return date.toLocaleDateString() + ' | ' + date.toLocaleTimeString('en-US');
    }
}