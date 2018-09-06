var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var temme = require('temme').default;
var axios = require('axios');

for(let j = 1;j<=200;j++){
	var url = 'https://so.gushiwen.org/mingju/default.aspx?p='+j+'&c=&t=';

	request(url,function(err,data){
		if(err){
			console.log(err);
		}
		var $ = cheerio.load(data.body);
		var html = $('body').html();
		var sentenceArr = temme(html,'div.left div.sons div.cont@ { a{$sentence}; }');
		var authArr = temme(html,'div.left div.sons div.cont@ { a:last-child{$author}; }');
		for(var i = 0;i<sentenceArr.length;i++){
			sentenceArr[i].author = authArr[i].author;
		}

		// console.log(JSON.stringify(sentenceArr));
		fs.writeFile('名句/'+j+'.json',JSON.stringify(sentenceArr)+',', function(){
			console.log('成功')
		});
	})
}