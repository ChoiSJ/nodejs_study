// lib 폴더의 currency 포함시키기
var currency = require('./lib/currency');

//console.log(currency);

var dollars = currency.wonToUS(5000000);
console.log("5백만원:" + dollars + "달러");