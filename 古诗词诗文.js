var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var temme = require('temme').default;
var axios = require('axios');


for(let i = 1;i<= 100;i++){
	var url = 'https://www.gushiwen.org/shiwen/default_0A0A'+i+'.aspx';
	request(url,function(err,data){
		if(err){
			console.log(err);
		}
		var $ = cheerio.load(data.body);
		var html = $('body').html();
		var titleArr = temme(html,'div.left div.sons div.cont@ { p a b{$title}; }');
		var dsyArr = temme(html,'div.left div.sons div.cont@ { p.source a{$dsy}; }');
		var authorArr = temme(html,'div.left div.sons div.cont@ { p.source a:last-child{$author}; }');
		var contentArr = temme(html,'div.left div.sons div.cont@ { div.contson{$content}; }');
		for(let j = 0;j<titleArr.length;j++){
			titleArr[j].adsy = dsyArr[j].dsy;
			titleArr[j].author = authorArr[j].author;
			titleArr[j].content = contentArr[j].content;
		}
		fs.writeFile('诗文/'+i+'.json',JSON.stringify(titleArr), function(){
			console.log('成功')
		});
	})
}
