$ db.sequences.insert({
	_id: "posts",
	seq: 0
})

function nextVal (name) {

	var req = db.sequences.findAndModify(
		{
			query: { _id: name },
			update: { $inc: { seq: 1 } },
			new: true
		}
	);

	return req.seq;
}

// use

$ db.posts.insert(
	{
		_id: nextVal('posts'),
		...
	}
)

$ db.posts.insert(
	{
		_id: nextVal('posts')
	}
)
