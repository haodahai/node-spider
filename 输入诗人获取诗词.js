var fs = require('fs');
var request = require('request');
var temme = require("temme").default;
var cheerio = require('cheerio');
var readline = require('readline');
var url =require('url');

var file = './作者/诗人.json';
var a = fs.readFileSync(file);
var a = JSON.parse(a);
var arr = [];

var rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

rl.question('请输入诗人：',function(anwser){

	for(var i = 0;i<a.length;i++){
		if(a[i].zuozhe == anwser){
			var b = a[i].href;
			var c = url.parse(b).pathname.split('_')[1].split('.')[0];
			//获取总页数
			request('https://so.gushiwen.org/authors/authorvsw_'+c+'A1.aspx',function(err,data){
				if(err){
					console.log(err);
				}
				var $ = cheerio.load(data.body);
				var html = $('body').html();
				var pageNum = temme(html,'div.main3 div.left@{ h1 span{$pageNum}; } ')[0].pageNum;
				var num = pageNum.match(/\d+/g)[1];  //总页数
				for(var j = 1;j<=num;j++){
					url1 = 'https://so.gushiwen.org/authors/authorvsw_'+c+'A'+j+'.aspx';
					request(url1,function(err,data){
						if(err){
							console.log(err);
						}
						var $ = cheerio.load(data.body);
						var html = $('body').html();
						
						var title = temme(html,'div.left div.sons div.cont@ { p a{$title} }');
						var content = temme(html,'div.left div.sons div.cont@ { div.contson{$content} }');
						for(var k = 0;k<title.length;k++){
							title[k].content = content[k].content;
						}

						arr = arr.concat(title);
						console.log(arr)
						fs.writeFile(anwser+'.json',JSON.stringify(arr),function(){
							console.log('成功')
						})
					})
				}
			})
			
			rl.close()
		}
	}
	console.log('好的');

	rl.close();
	
});