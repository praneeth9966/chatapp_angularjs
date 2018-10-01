exports = function ConnectDb() {
    console.log("in");
    var mongoDB = 'mongodb://localhost:27017/demoDb';
    mongoose.connect(mongoDB);
    mongoose.connection.on('open', function () {
        console.log(console, 'done:')
    });
    mongoose.connection.on('error', function () {
        console.error.bind(console, 'MongoDb connection error:')
    });
}