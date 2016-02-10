/** @jsx ssml */

import { Ability, events } from 'alexa-ability';
import { handleAbility } from 'alexa-ability-lambda-handler';
import { ssml } from 'alexa-ssml';
import userStore from 'alexa-ability-user-store';
import createRedisStore from 'connect-redis';

import { problemIntent } from './handlers/problem-intent'
import { spacePeopleIntent } from './handlers/space-people-intent';
import { issTimeIntent } from './handlers/iss-time-intent';
import { chooseLocationIntent } from './handlers/choose-location-intent';
import { helpIntent } from './handlers/help-intent';

const ability = new Ability();
const RedisStore = createRedisStore(userStore);

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

ability.on('ProblemIntent', problemIntent);
ability.on('SpacePeopleIntent', spacePeopleIntent);
ability.on('ISSTimeIntent', issTimeIntent);
ability.on('ChooseLocationIntent', chooseLocationIntent);
ability.on(events.help, helpIntent);

export const handler = handleAbility(ability);
