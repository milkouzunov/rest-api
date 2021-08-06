const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@resume.l0ql9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('DB Connected');
    });
}