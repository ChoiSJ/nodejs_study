// 환율 계산기

// 환율
var exchangeRate = 1117.9;

function wonToUS(won) {
	return won/exchangeRate;
}

function USToWon(us) {
	return us*exchangeRate;
}

exports['wonToUS'] = wonToUS;
exports['USToWon'] = USToWon;