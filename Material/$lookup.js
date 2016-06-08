// Example by blog

// Using $look

// Schema

{
	_id: ObjectId(),
	title: "title",
	text: "text",
	tags: ['tag1', 'tag2', 'tag2']
}

// find the most populars tags

res = db.posts.mapReduce(
	function () {
		this.tags.forEach(function (tag) {
			emit(tag, 1);
		})
	},
	function (key, values) {
		sum = 0;
		for (var i = 0;i < values.length; i++) {
			sum += values[i];
		}
		return sum;
	},
	{
		out: { inline: 1 }
	}
).results.sort(function (a, b) {
	
	return a.value < b.value;

}).slide(0, 10);
