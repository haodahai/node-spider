var https = require('https');
var url = require('url');

var biliUrl = 'https://bangumi.bilibili.com/media/web_api/search/result?season_version=-1&area=-1&is_finish=-1&copyright=-1&season_status=-1&season_month=-1&pub_date=-1&style_id=-1&order=3&st=1&sort=0&page=1&season_type=1&pagesize=20';

https.get(biliUrl, (res) => {
    var data = "";

    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', function () {
        let json = JSON.parse(data);


        var arr = json.result.data;
        console.log(arr);
    })
}).on('error', () => {
    console.log('出错了')
})