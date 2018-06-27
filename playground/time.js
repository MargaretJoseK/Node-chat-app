var moment = require('moment');

var date= moment();

// console.log(date.format('MMM Do YYYY'));
// console.log(date.format('hh:mm A'));

var someTimstamp=moment().valueOf();
console.log(someTimstamp);

var createdAt=123;
var date=moment(createdAt);
console.log(date.format('hh:mm a'));