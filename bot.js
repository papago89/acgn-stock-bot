var Discord = require('discord.io');

var logger = require('winston');

var auth = require('./auth.json');

var fs = require('fs');

var botInfoJSON;
var QAQ = "哀，一群人只會在需要的時候才叫我";

var IDLE;

var maxNum;

var minNum;

var fuck;
var message;

var longblack;

var FGO;

var kumiko;

var miku;

/*fs.open('myfile', 'wx', (err, fd) =>
{
    if (err)
    {
        if (err.code === 'EEXIST')
        {
      console.error('myfile already exists');
      return;
        }

    throw err;
    }

  writeMyData(fd);
});

*/

var papago = "<@241938736756031498>"

var CDTIME = 60000;
// Configure logger settings

logger.remove(logger.transports.Console);

logger.add(logger.transports.Console, {

	colorize: true

});

logger.level = 'debug';

// Initialize Discord Bot

var bot = new Discord.Client({

	token: auth.token, 

	autorun: true

});

var thisName = "ACGNBot";

var delayTime = 30000; // 三十秒

var count;

var highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, helpMessage, lowquantime, highPriceCompanyAmount;

helpMessage = "指令列：\n A = 高價釋股資訊 \n B = 低價釋股資訊 \n C = 低量釋股資訊 \n D = 股價更新資訊 \n E = 低價釋股標準 \n F = 高價釋股標準";

function writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount){
	botInfoJSON.highPriceMessage = highPriceMessage;
	botInfoJSON.lowPriceMessage = lowPriceMessage;
	botInfoJSON.noDealMessage = noDealMessage;
	botInfoJSON.listPriceMessage = listPriceMessage;
	botInfoJSON.lowquantime = lowquantime;
	botInfoJSON.highPriceCompanyAmount = highPriceCompanyAmount;
	fs.writeFile('BOTInfo', JSON.stringify(botInfoJSON), 'utf-8', function (err) {
		if(err) throw err;
		console.log('Saved!');
	});
}

function readFile(){
	var data = fs.readFileSync('BotInfo', 'utf-8');
	botInfoJSON = JSON.parse(data);
	highPriceMessage = botInfoJSON.highPriceMessage;
	lowPriceMessage = botInfoJSON.lowPriceMessage;
	noDealMessage = botInfoJSON.noDealMessage;
	listPriceMessage = botInfoJSON.listPriceMessage;
	lowquantime = botInfoJSON.lowquantime;
	highPriceCompanyAmount = botInfoJSON.highPriceCompanyAmount;
	QAQ = botInfoJSON.QAQ;
	IDLE = botInfoJSON.IDLE;
	maxNum = botInfoJSON.maxNum;
	minNum = botInfoJSON.minNum;
	fuck = botInfoJSON.fuck;
	message = botInfoJSON.message;
	longblack = botInfoJSON.longblack;
	FGO = botInfoJSON.FGO;
	kumiko = botInfoJSON.kumiko;
	miku = botInfoJSON.miku;
}

function forbid(channelID)
{
	if((channelID.toString() == "354939541087322113")||(channelID.toString() == "367245756018720768"))
	{
		return true;
	}
}

function match(K)
{
	return K.match(/[^ ]+([\s\S]+)/)[1]; // [\s\S]+ ---> 所有字元包含換行有多少抓多少 ---> abc dddd ---> dddd
}

function push(H, channelID) //發送訊息
{
	bot.sendMessage({

		to: channelID, 

		message: H

		});
}

function reply(a, cmd, channelID)
{
	if (a == 1) //存入指令確認
    {
        push(type(random(message.length)), channelID);
			
		return match(cmd);
	}
	else if (a == 2) //回應呼叫
    {
        push(cmd + "\n" + type(random(message.length)), channelID);
	}
	else if (a == 3) //papago專用
	{
		push(cmd, channelID);
	}
	else if (a == 4) //%%say專用
	{
		push(match(cmd), channelID);
	}
	
}

function detect(user)
{
    if ((user !== "高價釋股通知") && (user !== "papago89") && (user !== "Euphokumiko") && (user !== "vios10009")&&(user !== "低價釋股通知")&&(user !== "低量釋股通知")&&(user !== "股價更新通知"))
	{
		return true;
	}
	else
	{
        return false;
	}
}

function random(a)
{
	var n = Math.floor(Math.random() * (a - 1)) + minNum;
	return n;
}

function type(mumi)
{
	return message[mumi];
}

function typeB(mumi)
{
    return longblack[mumi];
}

function typeC(mumi)
{
    return FGO[mumi];
}

function typeD(mumi)
{
    return kumiko[mumi];
}

bot.on('ready', function (evt) {

	logger.info('Connected');

	logger.info('Logged in as: ');

	logger.info(bot.username + ' - (' + bot.id + ')');
	
	readFile();
});

function CDtime()
{
	bot.sendMessage({

		to: "367245756018720768", 

		message: IDLE

		});
		
}

bot.on('message', function (user, userID, channelID, message, evt) {

// Our bot needs to know if it will execute a command

// It will listen for messages that will start with `!`
	/*setInterval(CDtime, 10000)*/
	
	/*
	if(user === thisName) // 檢查到自己發出的訊息 就在delayTime後刪除

		setTimeout(function()

		{

			bot.deleteMessage

			(

			{

				channelID: channelID, 

				messageID: evt.d.id

			}, 

			function(err) 

			{

				logger.info(err);

			});

		}, delayTime);
	*/
	if (message.substring(0, 2) == '%%') {

		var flag = false;

		var cmd = message.split('%%')[1]; // 將命令去除用來識別的!號 ---> !abc dddd ---> abc dddd

		var arg = cmd.match(/[^ ]*/)[0]; // 找出命令的第一個斷點 以空白分開 ---> abc dddd ---> abc

		logger.info(userID);

		logger.info(user);

		logger.info(channelID);

		switch(arg) {

			case 'saveA':
			
				if(detect(user))
				{
					break;
				}
			
				highPriceMessage = reply(1, cmd, channelID);
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

				break;

			case 'saveB':
			
				if(detect(user))
				{
					break;
				}

				lowPriceMessage = reply(1, cmd, channelID);
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);
				
				break;

			case 'saveC':
			
				if(detect(user))
				{
					break;
				}

				noDealMessage = reply(1, cmd, channelID);
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);
				
				break;

            case 'saveD':

                if (detect(user))
                {
                    break;
                }

                listPriceMessage = reply(1, cmd, channelID);
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);

                break;
				
			case 'saveE':
			
				if(detect(user))
				{
					break;
				}
				
				lowquantime = reply(1, cmd, channelID);
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);
				
				break;
				
				
			case 'saveF':
			
				if(detect(user))
				{
					break;
				}
				
				highPriceCompanyAmount = reply(1, cmd, channelID);
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);
				
				break;
				
			case 'write':
			
				if(detect(user))
				{
                    break;
				}
				
				writeToFile(highPriceMessage, lowPriceMessage, noDealMessage, listPriceMessage, lowquantime, highPriceCompanyAmount);
				
				break;

			case 'A':
			
				if (forbid(channelID))
				{
					break;
				}
			
				reply(2, highPriceMessage, channelID);
				
				flag = true;

				break;

			case 'B':
			
				if (forbid(channelID))
				{
					break;
				}
			
				reply(2, lowPriceMessage, channelID);
				
				flag = true;

				break;

			case 'C':
			
				if (forbid(channelID))
				{
					break;
				}
			
				reply(2, noDealMessage, channelID);
				
				flag = true;

				break;

			case 'D':
			
				if (forbid(channelID))
				{
					break;
				}
			
				reply(2, listPriceMessage, channelID);
				
				flag = true;

				break;
				
			case 'E' :
			
				if (forbid(channelID))
				{
					break;
				}
				
				reply(2, lowquantime, channelID);
				
				flag = true;

				break;

				
			case 'F' :
			
				if (forbid(channelID))
				{
					break;
				}
				
				reply(2, highPriceCompanyAmount, channelID);
				
				flag = true;

				break;

			case 'help':
			
				if (forbid(channelID))
				{
					break;
				}	
			
				reply(2, helpMessage, channelID);
			
				flag = true;

				break;

				// Just add any case commands if you want to..
			
			case 'go':
			
				if (forbid(channelID))
				{
					break;
				}
				
				reply(3, papago + "再不出現我就閹了你:knife:", channelID);
				
				break;
				
            case 'all':

                if (forbid(channelID))
                {
                    break;
                }

                reply(2, highPriceMessage + "\n\n" + lowPriceMessage + "\n\n" + noDealMessage + "\n\n" + listPriceMessage + "\n\n" + lowquantime + "\n\n" + highPriceCompanyAmount + "\n\n", channelID);

                flag = true;

                break;
			
			case 'IDLE' :
			
				reply(3, QAQ, channelID);
				
				flag = true;
				
				break;
				
			case 'say' :
			
				if (forbid(channelID))
				{
					break;
				}
			
				reply(4, cmd, channelID);
				
				flag = true;
				
				break;
				
			case 'yuki' :
			
				if (forbid(channelID))
				{
					break;
				}

                reply(3, type(random(message.length)), channelID);
				
				flag = true;
				
                break;

            case 'blacklong':

                if (forbid(channelID))
                {
                    break;
                }

                reply(3, typeB(random(longblack.length)), channelID);

                flag = true;

                break;

            case 'FGO':

                if (forbid(channelID))
                {
                    break;
                }

                reply(3, typeC(random(FGO.length)), channelID);

                flag = true;

                break;

            case 'kumiko':

                if (forbid(channelID))
                {
                    break;
                }

                reply(3, typeD(random(kumiko.length)), channelID);

                flag = true;

                break;

            case 'software':

                if (forbid(channelID))
                {
                    break;
                }

                reply(3, miku[random(miku.length)], channelID);

                flag = true;

                break;
				
			default :
			
				if (forbid(channelID))
				{
					break;
				}
			
				reply(3, fuck, channelID)
				
				flag = true;
				
				break;
		}

		
		/*
		if(flag)

			setTimeout(function(){

				bot.deleteMessage({

					channelID: channelID, 

					messageID: evt.d.id

				}, function(err) {

					logger.info(err);

				});

			}, delayTime / 10); // 已接受的非save系列命令於delayTime/10後刪除
		*/
		

	}

});

// 斷線重連
bot.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    bot.connect();
});