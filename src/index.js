/** @jsx ssml */

import { Ability, events } from 'alexa-ability';
import { handleAbility } from 'alexa-ability-lambda-handler';
import { ssml } from 'alexa-ssml';

const ability = new Ability();

ability.on(events.launch, function(req) {
    const response = (
        <speak>
            Testing testing
            <pause time={300} />
            one two three.
        </speak>
    );

    req.say(response).show("Shuttle launched!").end();
});

ability.on('ProblemIntent', function(req) {
    req.say("Okay, stand by, 13. We're looking at it.").end();
});

ability.on(events.error, function(req) {
    req.say("We have a problem over here too.").end();
});

export const handler = handleAbility(ability);
