import { Gym } from "./gym";
import { Pokemon } from "./pokemon";

export abstract class RaidData {
    public location: Gym;
    public timeout: number;
    public thumbnail: string;
    // string version of hatch time or end time
    public end: string;
    public errorMessage = '';

    constructor() {}

    protected calculateTimeout(endTime: Date): void {
        let now = Date.now();
        this.timeout = endTime.getTime() - now;
    }
}

export class UnhatchedRaidData extends RaidData {
    public tier: number;
    public hatchTime: Date;

    constructor(object?: any) {
        super();
        if (object) {
            Object.assign(this, object);
            this.calculateTimeout(object.hatchTime);
            this.setThumbnail(object.tier);

            this.checkDataValidity();
        }
    }

    private setThumbnail(tier: number): void {
        if (this.tier < 3) {
            this.thumbnail = 'https://img.rankedboost.com/wp-content/uploads/2017/06/Pokemon-GO-Normal-Egg-Pink-120x120.png';
        } else if (this.tier < 5) {
            this.thumbnail = 'https://img.rankedboost.com/wp-content/uploads/2017/06/Pokemon-GO-Rare-Egg-Yellow-120x120.png';
        } else {
            this.thumbnail = 'https://img.rankedboost.com/wp-content/uploads/2017/06/Pokemon-GO-Legendary-Egg-120x120.png';
        }
    }

    private checkDataValidity(): void {
        let timeDifference = this.hatchTime.getTime() - Date.now();

        if (this.tier < 1 || this.tier > 5) {
            this.errorMessage += 'Invalid tier number.'
        }

        if (timeDifference < 0) {
            this.errorMessage += 'Hatch time has already occured.'
        } else if (timeDifference > 3_600_000) {
            this.errorMessage += 'Hatch time is greater than an hour.'
        }
        
        this.errorMessage += this.location.errorMessage;

        this.errorMessage.split('.').join('. ');
    }
}

export class HatchedRaidData extends RaidData {
    public boss: Pokemon;
    public endTime: Date;

    constructor(object?: any) {
        super();
        if (object) {
            Object.assign(this, object);
            this.calculateTimeout(this.endTime);
            this.setThumbnail(this.boss);

            this.checkDataValidity();
        }
    }

    private setThumbnail(pokemon: Pokemon): void {
        let imgName = (pokemon.name + (pokemon.form ? '-' + pokemon.form : '')).toLowerCase();
        this.thumbnail = `http://www.pokestadium.com/sprites/xy/${imgName}.gif`
    }

    private checkDataValidity(): void {
        let timeDifference = this.endTime.getTime() - Date.now();

        if (!this.boss.name) {
            this.errorMessage += 'No Pokemon found with that name.'
        }

        if (timeDifference < 0) {
            this.errorMessage += 'End time has already occured.'
        } else if (timeDifference > 2_700_000) {
            this.errorMessage += 'End time is greater than 45 minutes.'
        }
        
        this.errorMessage += this.location.errorMessage;

        this.errorMessage.split('.').join('. ');
    }
}