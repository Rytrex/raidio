import { Command } from '../command';
import { UnhatchedRaidData, HatchedRaidData } from '../../data-types/raid-data';
import { Gym } from '../../data-types/gym';
import { Pokemon } from '../../data-types/pokemon';
import { RichEmbed } from 'discord.js';

import * as bosses from '../../../data/raidBoss.json';

export class RaidCommand extends Command {
    private data: UnhatchedRaidData | HatchedRaidData;
    public hatchedData = false;

    constructor(params: string[]) {
        super();
        this.convertToData(params);
    }

    public get timeout(): number {
        return this.data.timeout;
    }

    private convertToData(params: string[]) {
        let tier = Number.parseInt(params[0].replace('*', ''));
        if (!isNaN(tier)) {
            this.data = new UnhatchedRaidData({
                tier: tier,
                hatchTime: this.timeConversion(params[1]),
                location: new Gym(params.slice(2).join(' '))
            });
        } else {
            this.data = new HatchedRaidData({
                boss: new Pokemon(params[0]),
                endTime: this.timeConversion(params[1]),
                location: new Gym(params.slice(2).join(' '))
            });
        }
    }

    public get buildRichEmbed(): RichEmbed | string {
        if (this.data.errorMessage){
            return this.data.errorMessage;
        }

        if ((<UnhatchedRaidData>this.data).tier) {
            let unhatchedData = (<UnhatchedRaidData>this.data);

            this.embed = this.embed
                .setColor('GOLD')
                .setTitle(`Tier ${unhatchedData.tier} Raid`)
                .setDescription(`Hatch Time: ${this.toReadableTime(unhatchedData.hatchTime)}\nPossible Pokemon: ${bosses[unhatchedData.tier].join(', ')}`);
        } else {
            let hatchedData = (<HatchedRaidData>this.data);
            this.hatchedData = true;

            this.embed = this.embed.setColor('RED')
                .setTitle(`${hatchedData.boss.name} Raid`)
                .setDescription(`End Time: ${this.toReadableTime(hatchedData.endTime)}\nCounter Types: ${hatchedData.boss.counterTypes}`);
        }

        return this.embed
            .addField('Location', `Navigate to ${this.data.location.name}: [Click Here](https://www.google.com/maps/dir/Current+Location/${this.data.location.longitude},${this.data.location.latitude})`)
            .setThumbnail(this.data.thumbnail);
    }
}
