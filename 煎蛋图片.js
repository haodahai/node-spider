var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var mkdirp = require('mkdirp');

var url = 'http://fuliba.net/jiandantop2017.html';  //目标地址

var dir = './img';       //下载地址

//创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err)
    }
});

//发送请求
request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        //获取图片地址
        var $ = cheerio.load(body);
        var src = $('script').html();
        var srcs = src.split(';')[0].split("'")[1].split(',');
        srcs.forEach(function (item, index) {
            downloadImg(item, dir, index + '.jpg', function () {
                console.log('逗我呢')
            });
            console.log('已下载完成第' + index + "张");
        })
    }
})

//定义download函数
var downloadImg = function (uri, dir, filename, callback) {
    request.head(url, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(dir + '/' + filename)).on('close', callback);
    })
}