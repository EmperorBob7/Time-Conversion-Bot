require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

const tzn = ["GMT", "EST", "CST", "MST", "PST"];
const change = [0, -5, -6, -7, -8];
const patt = new RegExp(/([0-2][0-3]|[0-1][0-9]):[0-5][0-9] UTC/i);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	let txt = msg.content;
	if (patt.test(txt) && !msg.author.bot) {
		timeConvert(msg);
	}
	if(txt == "w!ping") {
		msg.channel.send(new Date().getTime() - msg.createdTimestamp + " ms");
	}
});
function timeConvert(msg) {
	let txt = msg.content;
	let UTC = txt.match(patt) + "";
	let hour = "";
	let minute = "";
	let m = "```";
	hour = parseInt(UTC.substring(0, 2));
	minute = UTC.substring(3, 5);
	for (let i = 0; i < tzn.length; i++) {
		if (hour + change[i] < 0) {
			hour = 24;
		}
		else if (hour + change[i] > 24) {
			hour = 0;
		}
		if (hour + change[i] > 12) {
			m += ((hour + change[i]) % 12 + "").padStart(2, "0") + ":" + minute + "PM\t" + tzn[i] + "\n";
		}
		else if (hour + change[i] == 12) {
			m += ((hour + change[i]) + "").padStart(2, "0") + ":" + minute + "PM\t" + tzn[i] + "\n";
		}
		else {
			m += (hour + change[i] + "").padStart(2, "0") + ":" + minute + "AM\t" + tzn[i] + "\n";
		}
	}
	m += "```";
	msg.channel.send(m);
}
client.login(process.env.TOKEN);