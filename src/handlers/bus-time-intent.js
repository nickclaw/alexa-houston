/** @jsx ssml */

import { ssml, renderToString } from 'alexa-ssml';
import superagent from 'superagent-bluebird-promise';
import get from 'lodash/get';
import find from 'lodash/find';

export function handleBusTimeEvent(req, next) {
    getDirections()
        .then(getDepartures)
        .then(deps => {
            const children = deps.map((dep, i) => (
                <s>
                    {i === dep.length - 1 ? "and " : ""}
                    The {dep.name} from {dep.loc} at {dep.time}.
                </s>
            ));

            return (
                <speak>
                    <s>There are {children.length} buses leaving soon.</s>
                    <pause time={500} />
                    {children}
                </speak>
            );
        })
        .then(
            data => req.say(data).end(),
            err => next(err)
        );
}

function getDirections(callback) {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const query = {
        key: process.env.GOOGLE_KEY,
        origin: '2418 NW 57th Street, Seattle WA',
        destination: '619 Western Avenue, Seattle WA',
        mode: 'transit',
        transit_mode: 'bus',
        alternatives: true
    };

    return superagent
        .get(url)
        .query(query)
        .promise()
        .get('body')
        .get('routes');
}

function getDepartures(routes) {
    const departures = [];

    routes.forEach(function(route) {
        const steps = get(route, 'legs[0]steps');
        const busStep = find(steps, { travel_mode: 'TRANSIT' })
        const busName = get(busStep, 'transit_details.line.short_name');
        const busTime = get(busStep, 'transit_details.arrival_time.text');
        const busLoc = get(busStep, 'transit_details.arrival_stop.name');

        if (busStep) departures.push({
            name: busName,
            time: busTime,
            loc: busLoc
        });
    });

    return departures;
}
