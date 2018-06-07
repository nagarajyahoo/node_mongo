const repository = require('../repository/UserRepository.js');

var user = {
    name: "Nagaraj M R",
    age: 35,
    location: "Bangalore"
};

// repository.save(user, (saved) => {
//     console.log("Saved user ===> ", JSON.stringify(saved, undefined, 2));
//     console.log("printing timestamp from ID ===> ", saved[0]._id.getTimestamp());
// });

// repository.getAll((users) => {
//     console.log(JSON.stringify(users, undefined, 2));
// });

// repository.getByOID("5b0f167567a5e8045c6a35fa", (user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// });

repository.deleteByOID("5b0f165a678dc2045ae08ed0", (deleted) => {
   console.log(JSON.stringify(deleted, undefined, 2));
});




