import sample from 'lodash/sample';

const HELP_PROMPTS = [
    'Try asking me how many people are in space!',
    'Ask me when the ISS will be above you!'
];

export function helpIntent(req, next) {
    req.say(sample(HELP_PROMPTS)).send();
}
