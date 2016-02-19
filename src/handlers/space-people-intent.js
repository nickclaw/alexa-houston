import { get } from 'superagent';

export function spacePeopleIntent(req, next) {
    const url = 'http://api.open-notify.org/astros.json';
    const request = get(url).end((err, res) => {
        if (err) return next(err);
        req.say(`There are currently ${res.body.number} people in space.`).end();
    });

    req.on('timeout', () => request.abort());
}
