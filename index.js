const Discord = require('discord.js');
const bot = new Discord.Client();

const gyms = require('./data/gyms.json');
const pokemon = require('./data/pokemon.json');
const bosses = require('./data/raidBoss.json');

bot.on('message', (message) => {
  if (message.content) {
    if (message.content.split(' ')[0].includes('!raid')) {
      let msg = buildRichEmbed(message.content);
      typeof msg === 'string' 
        ? message.reply(msg)
        : message.channel.send(msg).then(raid => raid.pin().then(pin => pin.delete(630000)));
    }
  } else if (message.type === 'PINS_ADD') {
    message.delete();
  }
});

function buildRichEmbed(command) {
  let embed = new Discord.RichEmbed();
  let data = generateEmbedData(command);
  
  if (typeof data === 'string') {
    return data;
  } else if (!isNaN(data.raidType)) {
    embed.setColor('GOLD');
    embed.setTitle(`Tier ${data.raidType} Raid`);
    embed.setDescription(`Hatch Time: ${data.endTime}\nPossible Pokemon: ${bosses[data.raidType].join(', ')}`);
  } else {
    embed.setColor('RED');
    embed.setTitle(`${data.raidType} Raid`);
    embed.setDescription(`End Time: ${data.endTime}\nCounter Types: ${'To Be Implimented'}`);
  }

  embed.addField('Location', `Navigate to ${data.gym.name}: [Click Here](https://www.google.com/maps/dir/Current+Location/${data.gym.longitude},${data.gym.latitude})`);
  embed.setThumbnail(data.thumbnail);

  return embed;
}

function generateEmbedData(command) {
  let cmd = command.split(' ');
  let now = new Date();
  let data = {raidType: null, thumbnail: null, endTime: null, gym: null};

  // find raidType
  let raidType = cmd[1].replace('*', '').toLowerCase();
  let boss = pokemon.find(mon => mon.toLowerCase() === raidType);
  if (!isNaN(raidType) && raidType < 6 && raidType > 0) {
    data.raidType = raidType;
    if (raidType === '1' || raidType === '2') {
      data.thumbnail = 'https://img.rankedboost.com/wp-content/uploads/2017/06/Pokemon-GO-Normal-Egg-Pink-120x120.png';
    } else if (data.raidType === '2' || data.raidType === '3') {
      data.thumbnail = 'https://img.rankedboost.com/wp-content/uploads/2017/06/Pokemon-GO-Rare-Egg-Yellow-120x120.png';
    } else {
      data.thumbnail = 'https://img.rankedboost.com/wp-content/uploads/2017/06/Pokemon-GO-Legendary-Egg-120x120.png';
    }
  } else if (!!boss) {
    data.raidType = boss;
    data.thumbnail = `http://www.pokestadium.com/sprites/black-white/${raidType}.png`;
  } else {
    return 'Invalid Tier Number or Pokemon.';
  }

  //find endTime
  let endTime = new Date();
  let timeCommand = cmd[2].split(':');
  timeCommand.push(timeCommand[1].slice(2).toLowerCase());
  timeCommand[1] = timeCommand[1].slice(0,1);
  // timeCommand format: [hour, minute, am/pm]

  endTime.setHours(
    timeCommand[2].includes('p') ? (new Number(timeCommand[0]) + 12) : timeCommand[0],
    timeCommand[1],
    0
  );

  if (now < endTime) {
    data.endTime = endTime.toLocaleDateString() + ' | ' + endTime.toLocaleTimeString('en-US');
  } else {
    return 'Invalid Hatch Time or End Time.';
  }

  //find gym
  location = cmd.slice(3).join(' ').toLowerCase();
  let gymSearch = gyms.filter(gym => {
    return gym.name.toLowerCase().includes(location)
      // || gym.alias.toLowerCase() === location
  });

  if (gymSearch.length === 1) {
    data.gym = gymSearch[0];
  } else if (gymSearch.length > 1) {
    return 'More than one Gym found';
  } else {
    return 'Unable to find Gym.';
  }

  return data;
}

bot.login('MzQ2NDIxMTg4NTg0NTM4MTEy.DsOijA.TgCls5FKxoRoFXvPBjcST8LL9XI')
