var Skill = require('./Skill');

var app = new Skill();

app.on('HOUSTON.ProblemIntent', function(sess, done) {

});

app.on('AMAZON.HelpIntent', function(sess, done) {

});

module.exports = function(event, context) {
    app.handle(event, context, function(err, sess) {
        if (err) console.log('Intent failed.');
        else if (sess.rejected) console.log('Intented was rejected.');
        else if (sess.finished) console.log('Intent finished.');
        else console.log('Intent did not resolve.');
    });
}
