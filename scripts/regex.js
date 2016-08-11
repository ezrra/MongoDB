{ field: { $regex: /pattern/, $options: '<options>' } }
{ field: { $regex: 'pattern', $options: '<options>' } }
{ field: { $regex: /pattern/<options>, } }

// You can also regular expression objects

{ field: /pattern/<options> }

// $regex vs. /pattern

Options: { 
	i: "Upper and lower",
	m: " ^ for the start, $ for the end ",
	x: ,
	s: ""

{ name: "josh" }, { name: "juan" }, { name: "jose" }, { name: "julian" }, 
{ name: "jorge" }, { name: "josh gomez" }, { name: "jose\ngomez" }, { name:  "juan gutierrez" }
{ name: "juan gomez" }

db.test.find({ name: /^jo/ })

db.test.find({ name: /^jua/ })

db.test.find({ name: /n$/ })

db.test.find({ name: { $in: [/^jo/i, /^ju/] } })

db.test.find({ name: { $in: [/^jo/i, /^jul/] } })

db.test.find({ name: { $in: [/^jo/i, /^jua/] } })

db.test.find({ name: { $regex: '^jos', $options: i } })

// You cannot use $regex expressions inside an $in

// AND

db.test.find({ name: { $regex: /ju.*g/ } })

// Multiline Match for lines Starting with Specified Patter | Toma en cuenta los saltos de linea 
db.users.find({ name: /.*m.*/ })

db.test.find({ name: /j.*nez$/i })
db.test.find({ name: /osh.*nez$/i })
db.test.find({ name: /^osh.*nez$/i })

db.test.find({ name: { $regex: '^g', $options: "m" } })
db.test.find({ name: { $regex: '^g', $options: "" } })

db.test.find({ name: { $regex: /ju.*go.*z$/ } })

db.test.find({ name: { $regex: /ju.*go/ } })

db.test.find({ name: { $regex: /^a.*z/, $options: "m" } })
db.test.find({ name: { $regex: /^j.*z/, $options: "m" } })

db.products.find( { description: { $regex: /m.*line/, $options: 'si' } } )
db.products.find( { description: { $regex: /m.*line$/, $options: 'si' } } )