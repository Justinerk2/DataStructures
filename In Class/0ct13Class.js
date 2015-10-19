var meeting = "LIVING NOW - Living Now (:II)";
meeting.indexOf('-');
meeting.substr(0, meeting.indexOf('-')-2);
meeting.substr(0, meeting.indexOf('-')-1);
meeting.substr(0, meeting.indexOf('-')+1);
meeting.substr(0, meeting.indexOf('-')+2);

var second = meeting.substr(meeting.indexOf('-')+2);
var first = meeting.substr(0, meeting.indexOf('-')-1);
second.substr(0, first.length);
