import { Skill } from './Skill';

const app = new Skill();

app.on('launch', function(sess) {
    sess.say("Testing testing one two three.");
});

app.on('ProblemIntent', function(sess) {
    sess.say("Okay, stand by, 13. We're looking at it.").end();
});

export function handler(event, context) {
    app.handle(event, context, function(err, sess) {
        if (err) console.log('Intent failed.');
        else if (sess._done) console.log('Intent finished.');
        else console.log('Intent did not resolve.');
    });
}
