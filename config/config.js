var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
    const database = "todos";
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/" + database;
}
else if (env === 'test') {
    const database = "test_todos";
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/" + database;
}