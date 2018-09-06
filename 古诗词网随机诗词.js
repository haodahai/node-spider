var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var temme = require('temme').default;

var url = 'https://www.gushiwen.org/';

request(url,function(err,data){
	if(err){
		console.log(err);
	}
	var $ = cheerio.load(data.body);
	var html = $('body').html();
	var titleArr = temme(html,'div.left div.sons div.cont@ { a b{$title}; }');
	var dsyArr = temme(html,'div.left div.sons div.cont@ { p.source a {$dsy}; }');
	var authorArr = temme(html,'div.left div.sons div.cont@ { p.source a:last-child {$author}; }');
	var contentArr = temme(html,'div.left div.sons div.cont@ { div.contson{$content}; }');
	
	for(var i = 0;i<titleArr.length;i++){
		titleArr[i].author = authorArr[i].author;
		titleArr[i].dsy = dsyArr[i].dsy;
		titleArr[i].content = contentArr[i].content;
	}
	// console.log(JSON.stringify(titleArr));
	titleArr = JSON.stringify(titleArr);
	fs.writeFile('1.json', titleArr+',', function(){
		console.log('成功')
	});
})