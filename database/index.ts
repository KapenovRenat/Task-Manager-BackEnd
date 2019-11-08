import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log('DataBase connected!')});

export default db;
