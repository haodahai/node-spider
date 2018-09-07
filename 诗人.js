var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var temme = require('temme').default;

var arr = [];
for(let i = 1;i<=354;i++){
	var url = 'https://so.gushiwen.org/authors/default.aspx?p='+i+'&c=';
	request(url,function(err,data){
		if(err){
			console.log(err);
		}

		var $ = cheerio.load(data.body);
		var html = $('body').html();
		var links = temme(html,'div.left div.sonspic div.cont@ { p a[href=$href] {$zuozhe}; }');
		// var 
		for(let a = 0;a<links.length;a++){
			links[a].href="https://so.gushiwen.org"+links[a].href;
		}

		arr=arr.concat(links);
		console.log(arr);
		// arr = JSON.stringify(arr);

		fs.writeFile('./作者/诗人.json',JSON.stringify(arr),function(){
			console.log('成功');
		})
	})
}