var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const url = 'http://yjbg.cnstock.com/';
request(url,(err,res,body)=>{
    if(!err&&res.status == 200){
        let $ = cheerio.load(body);
        console.info($('div.hd').text());
        let info = $('div.hd').text();
        fs.writeFile('news.txt',info,(err)=>{
            if (err) throw err;
            console.log("It's saved");
        })
    }else{
        console.log(err)
    }
}).pipe(fs.createWriteStream('web.html'))
