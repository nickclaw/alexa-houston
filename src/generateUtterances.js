import utterances from 'alexa-utterances';
import each from 'lodash/each';
import flatten from 'lodash/flatten';

export function generateUtterances(schema) {
    const ret = [];

    each(schema.utterances, function(templates, intent) {
        each(templates, function(template) {
            ret.push(template, schema.slots[intent] || {}, schema.dictionary)
        });
    });

    return flatten(ret);
}
