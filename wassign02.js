var fs = require('fs');
var cheerio = require('cheerio');
//creating a variable for the file content
var fileContent = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt');
//creating cherrio variable $
var $ = cheerio.load(fileContent);
//using cheerio to only collect the data within the table with cellpadding = 5 and naming that variable table
var table = $('tr').attr('cellpadding', '5');
// creating a varable address to parse the table to find the adresss within the data, and split the text
var address = $(table).find('td:first-child').children().remove().end().text().split("<br />");

var firstLine = address[0];

console.log(firstLine.trim());

//var address = [];
//var table = $('tr').attr('cellpadding', '5');
//$(table).children("td:first-child").each(function(i, elem) {

//    var tableInfo = $(this);
//    address[i] = tableInfo.children().remove().end().text();

//    console.log(address.trim());

//});
