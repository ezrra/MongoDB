var random = function () {
	return Math.floor(Math.random() * 10)
};

for (var i = 0; i < 1000; i++) {
	db.abcd.insert({
		a: random(),
		b: random(),
		c: random(),
		d: random()
	});
};