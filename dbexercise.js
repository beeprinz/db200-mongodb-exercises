
// get all documents
db.movies.find({}).pretty()
// get all documents with writer set to "Quentin Tarantino"
db.movies.find({"writer": "Quentin Tarantino"})
// get all documents where actors include "Brad Pitt"
db.movies.find({"actors":"Brad Pitt"})
// get all documents with franchise set to "The Hobbit"
db.movies.find({"franchise":"The Hobbit"})
// get all movies released in the 90s
db.movies.find({"year":{ $gte: 1990, $lte: 1999} })
// get all movies released before the year 2000 or after 2010
db.movies.find({"year":{$not: { $gte: 2000, $lte: 2010} } })

// add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
db.movies.update({ "title": "The Hobbit: An Unexpected Journey"}, { $set: {"synopsis": "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}})
// add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
db.movies.update({ "title": "The Hobbit: The Desolation of Smaug"}, { $set: {"synopsis": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}})
// add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.update({"title":"Pulp Fiction"}, { $addToSet: {"actors":"Samuel L. Jackson"} } )

// find all movies that have a synopsis that contains the word "Bilbo"
db.movies.find({"synopsis" : /.*bilbo.*/i})
// find all movies that have a synopsis that contains the word "Gandalf"
db.movies.find({"synopsis" : /.*gandalf.*/i})
// find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
db.movies.find({"synopsis" : /^(?!.*gandalf).*bilbo.*$/i})
db.movies.find({"synopsis": {$exists: "Bilbo", $not:/Gandalf/}})
// find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
db.movies.find({"synopsis" : /.dwarves|hobbit.$/i})
// find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find({"synopsis" : /.*gold|dragon.*/i})
db.movies.find({"synopsis": {$exists: "gold", $exists: "dragon"}})
//second one doesn't work

// delete the movie "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({"title": "Pee Wee Herman's Big Adventure"})
// delete the movie "Avatar"
db.movies.deleteOne({"title": "Avatar"})

//delete nested actors array ["Samuel L. Jackson"]
db.movies.update({"title": "Pulp Fiction"}, {$pull: {"actors": ["Samuel L. Jackson"]}})



//remove "Synopsis" with the capital "S"
db.movies.update({ "title": "The Hobbit: The Battle of the Five Armies" }, { $unset : { "Synopsis" : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."} })