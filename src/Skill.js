import AsyncEventEmitter from 'async-eventemitter';
import { Session } from './Session';

export class Skill extends AsyncEventEmitter {

    on(type, listener) {
        if (typeof type === 'function') type = wrap(type);
        if (typeof listener === 'function') listener = wrap(listener);
        return super.on(type, listener);
    }

    handle(event, context, callback) {
        const sess = new Session(event, context);
        sess.on('end', err => callback(err, sess));

        switch(event.request.type) {
            case "LaunchRequest":
                this.emit('launch', sess);
                break;

            case "IntentRequest":
                this.emit(`${event.intent.name}`, sess);
                break;

            case "SessionEndedRequest":
                this.emit('end', sess);
                break;

            default:
                this.emit('unknown', sess);
                break;
        }
    }
}

function wrap(fn) {

    return function(sess, done) {
        if (sess.finished) return done();

        try {
            if (fn.length > 1) {
                fn(sess, done);
            } else {
                fn(sess);
                done();
            }
        } catch (e) {
            done(e);
        }
    }
}
