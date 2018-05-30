const repository = require('../repository/UserRepository.js');

var user = {
    name: "Nagaraj M R",
    age: 35,
    location: "Bangalore"
};

repository.save(user, (saved) => {
    console.log("Saved user ===> ", JSON.stringify(saved, undefined, 2));
    console.log("printing timestamp from ID ===> ", saved[0]._id.getTimestamp());
});



