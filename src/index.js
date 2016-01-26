import { Ability, intent } from 'alexa-ability';
import handle from 'alexa-ability-lambda-handler';

const ability = new Ability();

ability.on(intent.LAUNCH, function(sess) {
    sess.say("Testing testing one two three.").send();
});

ability.on('ProblemIntent', function(sess) {
    sess.say("Okay, stand by, 13. We're looking at it.").end();
});

export const handler = handle(ability);
