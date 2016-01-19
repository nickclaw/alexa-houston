import each from 'lodash/each';
import map from 'lodash/map';

export function generateSchema(schema) {
    const ret = { intents: [] };

    each(schema.utterances, function(utterances, intent) {
        ret.intents.push({
            intent: intent,
            slots: map(schema.slots[intent], (type, name) => ({ type, name }))
        })
    });

    return ret;
}
