import superagent from 'superagent';
import get from 'lodash/get';

export function chooseLocationIntent(req, next) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    const query = {
        key: process.env.GOOGLE_KEY,
        address: req.params.City
    };

    const request = superagent.get(url).query(query).end((err, res) => {
        if (err) return next(err);
        const location = get(res, 'body.results[0].geometry.location', null);

        if (location) {
            req.stash.location = location;
            req.say('Roger roger. What do you need now?').send();
        } else {
            req.say('fail!').send();
        }
    });

    req.on('timeout', () => request.abort());
}
