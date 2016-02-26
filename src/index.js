/** @jsx ssml */

import { Ability, events } from 'alexa-ability';
import { handleAbility } from 'alexa-ability-lambda-handler';
import { ssml } from 'alexa-ssml';
import userStore from 'alexa-ability-stash';
import { timeout, TimeoutError } from 'alexa-ability-timeout';
import { context, trackContext } from 'alexa-ability-context';
import createRedisStore from 'connect-redis';

import { problemIntent } from './handlers/problem-intent'
import { spacePeopleIntent } from './handlers/space-people-intent';
import { issTimeIntent } from './handlers/iss-time-intent';
import { chooseLocationIntent } from './handlers/choose-location-intent';
import { helpIntent } from './handlers/help-intent';

const ability = new Ability();
const RedisStore = createRedisStore(userStore);

//
// Middleware
//

ability.use(timeout(5000));
ability.use(trackContext());
ability.use(userStore({
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        disableTTL: true,
        pass: process.env.REDIS_PASS
    })
}));

ability.on(events.launch, function(req) {
    req.say('Testing testing, one two three.').send();
});

ability.on(events.end, function(req) {
    req.say('Houston signing off.').end();
});

ability.on(events.help, helpIntent);

ability.on('ProblemIntent', problemIntent);
ability.on('SpacePeopleIntent', spacePeopleIntent);
ability.on('ISSTimeIntent', issTimeIntent);
ability.on('ChooseLocationIntent', chooseLocationIntent);

ability.use(function handleError(err, req, next) {
    console.log(err);
    if (err instanceof TimeoutError) {
        req.say('Sorry, I spaced out there a second. Can you repeat that?').send();
    } else {
        req.say('I had some trouble understanding you. Can you say that again?').send();
    }
});

export const handler = handleAbility(ability);
