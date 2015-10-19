var fs = require('fs');
var cheerio = require('cheerio');
//creating a variable for the file content
var fileContent = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt');
//creating cherrio variable $
var $ = cheerio.load(fileContent);
var meetings = [];

//using cheerio to only collect the data within the table with cellpadding = 5 and naming that variable table
$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) {
    meetings.push(($(elem).find('td').eq(0).html().split('<br>')[2].trim()));
});
fs.writeFileSync('/home/ubuntu/workspace/data/arrayAddresses.txt', JSON.stringify(meetings));
