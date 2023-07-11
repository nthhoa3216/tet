const axios = require('axios').default;
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var readFile = fs.readFileSync('config.json');
var config = JSON.parse(readFile);
var readJsonTask = fs.readFileSync('tw-fl-task.json');
var twitterTask = JSON.parse(readJsonTask);
const baseApiURL = "https://twitter.com/i/api/graphql/";
const chalk = require("chalk");
const { setTimeout } = require('timers/promises');
fs.writeFileSync('success-url.txt', '')
var rawData = fs.readFileSync('cookie4.txt', 'utf-8');    //
var counter2 = twitterTask.main.length;
var cookies = rawData.split('\n')
var counter = cookies.length;
var params = process.argv.slice(2);
var args = {};
for (var l = 0, len = params.length; l < len; l += 1) {
    var key_value = params[i].split('=');
    args[key_value[0]] = key_value[1];
}

let i = 0;


console.log(chalk.black.bgCyan(`/********//-------Total accounts: ${counter} ---------//********/`));
console.log(chalk.red('Bot is running...'));

(async () => {
    await WakeMeUp();
})();

async function WakeMeUp() {
    var accountCookie = cookies[i];
    if (accountCookie.indexOf("\r") > -1) {
        accountCookie = accountCookie.replace("\r", '');
    }
    var accountToken = accountCookie.match('[a-zA-Z0-9]{160}')[0];
    let options = {
        headers: {
            "authorization": config.queriID.authorization,
            "cookie": accountCookie,
            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "CocCoc";v="96"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "content-type": "application/json",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.124 Safari/537.36",
            "x-csrf-token": accountToken,
            "x-twitter-active-user": "yes",
            "x-twitter-auth-typ": "OAuth2Session",
            "x-twitter-client-language": "vi"
        }
    }
    if	(i % 10 === 0) {
	if (config.settings.dcomName != null) {
        console.log(chalk.red('Reset dcom...'));
        var ipAddress = await RenewIp(config.settings.dcomName);
        console.log(chalk.black.bgCyan(`/********//---------------IP: ${ipAddress}----------//********/`));
        await setTimeout(getRndInteger(config.settings.timeoutTasksMin,config.settings.timeoutTasksMax));
    	}
    }
    var twitterUsername = await LoginUserTweet(options);
    console.log("/********//----Login: " + twitterUsername + `, Current account in list: ${(i + 1)}`);
    let i2 = 0;
    if (twitterUsername != null) {
        await DoTask(options, i);
    } else {
        console.log(chalk.red('Error code: 403, try to enter new cookie. Line:  ' + (i + 1)));
    }
    async function DoTask(options) {
        var tasks = twitterTask.main[i2];
        var Tweets0 = RandomTweets(tasks.tweets);
        var Tweets1 = RandomTweets(Randoms());
        var Tweets2 = RandomTweets(Randoms());
        var Tweets3 = RandomTweets(Randoms());
        var Tweets4 = RandomTweets(Randoms());
        var Tweets5 = RandomTweets(Randoms());
        var Tweets6 = RandomTweets(Randoms());
        var Tweets7 = RandomTweets(Randoms());
        var Tweets8 = RandomTweets(Randoms());
        var Tweets9 = RandomTweets(Randoms());
	if (tasks.tweets == 1){
	var TweetsX = `${Tweets0} ${Tweets5}`;
	}	if (tasks.tweets == 2){
	var TweetsX = `${Tweets0} ${Tweets5}\n${Tweets1} ${Tweets6}`;
	}	if (tasks.tweets == 3){
	var TweetsX = `${Tweets0} ${Tweets5}\n${Tweets1} ${Tweets6}\n${Tweets2} ${Tweets7}`;
	}	if (tasks.tweets == 4){
	var TweetsX = `${Tweets0} ${Tweets5}\n${Tweets1} ${Tweets6}\n${Tweets2} ${Tweets7}\n${Tweets3}\n${Tweets4} ${Tweets8}`;
	}	if (tasks.tweets == 5){
	var TweetsX = `${Tweets0} ${Tweets5}\n${Tweets1} ${Tweets6}\n${Tweets2} ${Tweets7}\n${Tweets3}\n${Tweets4}\n${Tweets9}`;
	}	if (tasks.tweets == 10){
	var TweetsX = `${Tweets5}\n${Tweets1}`;
	}	if (tasks.tweets == 11){
	var TweetsX = `${Tweets5}\n${Tweets1} ${Tweets6}\n${Tweets2}`;
	}
        var followUsername = RandomFollow(tasks.follows).trim();
        console.log(chalk.green(`/********//----Username random to follow: /${followUsername}/`));
        if (twitterUsername !== followUsername) {
            await FollowTwitter(options, followUsername);
        }
        else {
            console.log(chalk.red(`/********//----${followUsername}/ Dupplicated Username //-------// `));
        }
        await setTimeout(getRndInteger(config.settings.timeoutStepMin,config.settings.timeoutStepMax));
        await Createtweet(options, TweetsX);
        await setTimeout(getRndInteger(config.settings.timeoutStepMin, config.settings.timeoutStepMax));
        i2++;
        if (i2 < counter2) {
            await DoTask(options);
        }
    }
    i++;
    if (i < counter) {
        await WakeMeUp();
    }
}

async function RenewIp(moduleName) {
    const disconnect = await exec('rasdial /disconnect');
    if (disconnect.stderr != null) {
        const connect = await exec(`rasdial ${moduleName}`);
        if (connect.stderr != null) {
        } else {
        }
        const getIpv4 = await exec(`nslookup myip.opendns.com. resolver1.opendns.com`);
        var regex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gi;
        var ipAddress = getIpv4.stdout.match(regex)[1];
        return ipAddress;
    } else {
    }
}
async function Createtweet(options, content, twitterUsername) {
    var url = baseApiURL + config.queriID.CreateTweet + '/CreateTweet';
    var payload = JSON.stringify({
        "variables": {
            "tweet_text": content,
            "media": {
                "media_entities": [],
                "possibly_sensitive": false
            },
            "withDownvotePerspective": false,
            "withReactionsMetadata": false,
            "withReactionsPerspective": false,
            "withSuperFollowsTweetFields": true,
            "withSuperFollowsUserFields": true,
            "semantic_annotation_ids": [],
            "dark_request": false,
            "__fs_interactive_text": false,
            "__fs_responsive_web_uc_gql_enabled": false,
            "__fs_dont_mention_me_view_api_enabled": false
        },
        "queryId": config.queriID.CreateTweet
    });
    try {
        var response = await axios.post(url, payload, options);
        if (JSON.stringify(response.data.errors) != null) {
            response.data.errors.forEach(error => {
                console.log(chalk.red('CreateTweet() ' + error.message));
            })
        } else {
            var tweetUsername = response.data.data.create_tweet.tweet_results.result.core.user_results.result.legacy.screen_name;
            var tweetID = response.data.data.create_tweet.tweet_results.result.rest_id;
            var tweetUrl = chalk.green(`link: https://twitter.com/${tweetUsername}/status/${tweetID}`);
            if (config.settings.createLog) {
                fs.appendFileSync('success-url.txt', `https://twitter.com/${tweetUsername}/status/${tweetID}` + '\n');
            }
            console.log(chalk.green(tweetUrl));
        }
    } catch (error) {
        console.log(chalk.red('CreateTweet() ' + error.code));
        fs.appendFileSync('failed-log-tweet.txt', `User: ${twitterUsername} \n CreateTweet() ${error.code} \n`);
        if (error.message.indexOf('401') !== -1) {
            console.log(chalk.red(`'Auth error, token index: ${i} token: ${accountToken}`));
        }
        if (error.code === 'ECONNRESET') {
            console.log(chalk.red(`Error: ${error.code}, trying again...`));
        }
    } await setTimeout(getRndInteger(config.settings.timeoutStepMin, config.settings.timeoutStepMax));
}
async function LoginUserTweet(options) {
    var url = 'https://twitter.com/i/api/1.1/account/settings.json?include_mention_filter=true&include_nsfw_user_flag=true&include_nsfw_admin_flag=true&include_ranked_timeline=true&include_alt_text_compose=true&ext=ssoConnections&include_country_code=true&include_ext_dm_nsfw_media_filter=true&include_ext_sharing_audiospaces_listening_data_with_followers=true';
    try {
        var res = await axios.get(url, options);
        if (res.status == 200) {
            return res.data.screen_name;
        } else {
            console.log(chalk.red(`Error, status: ${res.status}`));
        }
    } catch (error) {
        console.log(chalk.red('LoginUserTweet() ' + error));
        if (error.code === 'ECONNRESET') {
            console.log(chalk.red(`Error: ${error.code}, trying again...`));
            LoginUserTweet(options);
        }
    }

}


async function FollowTwitter(options, twitterUsername, username) {
    var url = "https://twitter.com/i/api/1.1/friendships/create.json";
    var twitterID = await FindTweetID(options, twitterUsername);
    var payload = `include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&id=${twitterID}`;
    const optionsMofied = JSON.parse(JSON.stringify(options).replace('"content-type":"application/json",', ''));
    try {
        var response = await axios.post(url, payload, optionsMofied);
        if (JSON.stringify(response.data.errors) != null) {
            response.data.errors.forEach(error => {
                console.log(error.message);
            })
        } else {
            if (response.data.following) {
                console.log(chalk.red(`/********//---- /${twitterUsername}/ Already followed!`));
            } else {
                console.log(chalk.green("/********//----DONE! Followed: " + response.data.screen_name));
            }
        }
    } catch (error) {
        console.log(chalk.red('FollowTwitter() ' + ` ${twitterUsername} ` + error.code));
        fs.appendFileSync('failed-log.txt', `User: ${username} \n FollowTwitter() ${twitterUsername} ${error.code} \n`);
        if (error.code === 'ECONNRESET') {
            console.log(`Error: ${error.code}, trying again...`);
        }
    }
}



async function FindTweetID(options, username) {
    var url = `https://twitter.com/i/api/graphql/7mjxD3-C6BxitPMVQ6w0-Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`;
    try {
        const res = await axios.get(url, options);
        if (res.status == 200) {
            if (Object.keys(res.data.data).length > 0) {
                return res.data.data.user.result.rest_id;
            } else {
                console.log(chalk.red("Twitter username not vaild"));
            }
        } else {
            console.log(chalk.red('Error, status: ' + res.status));
        }
    } catch (error) {
        console.error(error);
        if (error.code === 'ECONNRESET') {
            console.log(chalk.red(`Error: ${error.code}, trying again...`));
        }
    }

}
function RandomTweets(tweets) {
    var data = fs.readFileSync('random-tweets4.txt', "utf-8");
    var lines = data.split('\n');
    var twitterTweets = '';
    for (let i = 0; i < tweets; i++) {
        var randomLine = Math.floor(Math.random() * lines.length);
        twitterTweets += lines[randomLine].trim();
    }
    return twitterTweets;
}

function RandomFollow(follows) {
    var data = fs.readFileSync('random-follow.txt', "utf-8");
    var lines = data.split('\n');
    var sfollow = '';
    for (let i = 0; i < follows; i++) {
        var randomLine = Math.floor(Math.random() * (lines.length - 1) + 1);
        sfollow += lines[randomLine];
    }
    return sfollow;
}

function Randoms() {
	var y = Math.random();
	if (y < 0.55)
  		y = 0
	else
  		y= 1
	return y;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
