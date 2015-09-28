var fs = require('fs');
var cheerio = require('cheerio');

var fileContent = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt');
//creating cherrio variable $
var $ = cheerio.load(fileContent);

var meetings = [];
var addresses = [];
//selecting table with cellpadding of 5, finding the tbody and then finding row (tr)
$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) {
    //finding each column (td), eq which is an index(starting at 0), putting it in html, spliting it at the breaks, selecting the 3rd thing in the array which is the first line of the address, triming the excess spaces and pushing the info into an array
    meetings.push(($(elem).find('td').eq(0).html().split('<br>')[2].trim()));
});
//remember to make it into an array
// var address = meetings.substring(0, meetings.indexOf(','));
// var googleAddress = address.split(' ').join('+');

fs.writeFileSync('/home/ubuntu/workspace/data/arrayAddresses.txt', JSON.stringify(meetings));


// substring(0,varable.indexOf(',')) starts when you want to start and ends where you want to end 2 parameters: start and end
//.split(' ').join('+')

//API key:  AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0