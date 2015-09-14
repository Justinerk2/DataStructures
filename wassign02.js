var fs = require('fs');
var cheerio = require('cheerio');
//creating a variable for the file content
var fileContent = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt');
//creating cherrio variable $
var $ = cheerio.load(fileContent);
//using cheerio to only collect the data within the table with cellpadding = 5 and naming that variable table
var table = $('tr').attr('cellpadding', '5');
// creating a varable address to parse the table to find the rows and creating the each function
 $(table).find('tr').each(function(i, elem) {
    $(elem).find('td').eq(0).each(function(i,elem){
        console.log($(elem).html().split("<br>")[2].trim());
    });
});
