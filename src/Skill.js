import EventEmitter from 'async-eventemitter';
import { Session } from './Session';

export class Skill extends EventEmitter {

    on(type, listener) {
        if (typeof type === 'function') type = wrap(type);
        if (typeof listener === 'function') listener = wrap(listener);
        return super.on(type, listener);
    }

    handle(event, context, callback) {
        const sess = new Session(event, context);
        this.emit(`${event.type}`, sess, function(err) {
            callback(err, sess);
        });
        return sess;
    }
}

function wrap(fn) {

    return function(sess, done) {
        if (sess.finished) return done();

        try {
            fn(sess, done);
        } catch (e) {
            done(e);
        }
    }
}
