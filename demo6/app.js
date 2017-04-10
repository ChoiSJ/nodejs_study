// mongodb 모듈을 포함시키기 
var mongodb = require('mongodb');

// url = "mongodb://IP주소:포트번호:데이터베이스이름"
var url = "mongodb://localhost:27017/mydb"

// mongodb client 객체 획득하기
// mongodb client 는 실행 중인 MongoDB 와 연결을 지원하는 객체다.
var client = mongodb.MongoClient;

// client.connection(url, function(err, db) {...})
// 지정된 url 이 가리키는 db 와 연결에 성공하면 err 은 undefined 이고, db 에는 연결된 몽고DB 를 대상으로 CRUD 작업을 수행할 수 있는 함수를 가진 객체가 전달된다.
// db.collection('컬렉션이름').insert();
// db.collection('컬렉션이름').insertOne();
// db.collection('컬렉션이름').insertMany();
// db.collection('컬렉션이름').find();
// db.collection('컬렉션이름').findOne();
client.connect(url, function(err, db) {
	if (err) {
		console.log(err.stack);
		return;
	}

	db.collection('contacts').removeMany();
	db.close();

	console.log("모든 연락처 정보 삭제");
});

client.connect(url, function(err, db) {
	if (err) {
		console.log(err.stack);
		return;
	}

	var contactData = [
	{name:'홍진호', phone:'010-2222-2222', email:'hong@gmail.com'},
	{name:'임요환', phone:'010-1111-1111', email:'im@gmail.com'},
	{name:'이윤열', phone:'010-1234-5678', email:'lee@gmail.com'}];

	db.collection('contacts').insertMany(contactData);
	db.close();

	console.log("새로운 연락처 정보 저장");
});

client.connect(url, function(err, db) {
	if (err) {
		console.log(err.stack);
		return;
	}

	// db.collection('컬렉션명').find(쿼리).toArray(함수);
	// toArray() 는 조회된 결과를 배열로 변환해서 콜백함수의 매개변수로 전달한다.
	db.collection('contacts').find({name:'홍진호'}, {fields:{name:1}}).toArray(function(err, docs) {
		if (err) {
			return;
		}

		console.log(docs);
		db.close();
	});
}); 