import superagent from 'superagent';
import get from 'lodash/get';

export const issTimeIntent = [

    // make sure user has set a location
    (req, next) => {
        if (req.stash.location) return next();
        req.say("We'll need to know your location first.").send();
    },

    // get next pass
    (req, next) => {
        const url = 'http://api.open-notify.org/iss-pass.json';
        const query = {
            lat: req.stash.location.lat,
            lon: req.stash.location.lng,
            passes: 1
        };

        const request = superagent.get(url).query(query).end((err, res) => {
            if (err) return next(err);
            const time = get(res, 'body.response[0].risetime', null);

            if (!time) return next(new Error('Invalid rise time'));

            const minutes = Math.floor((time * 1000 - Date.now()) / 1000 / 60);
            req.say(`The ISS will be above you in ${minutes} minutes`).end();
        });

        request.on('timeout', () => request.abort());
    }
]
