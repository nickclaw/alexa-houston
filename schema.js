
exports.dictionary = {

    PROBLEM_TYPES: [
        'issue',
        'problem'
    ]
};

exports.slots = {

    "HOUSTON.ProblemIntent": {
        Problem: "PROBLEM_TYPES"
    }
};

exports.utterances = {

    "HOUSTON.ProblemIntent": [
        "{we have|there is|there's} a {PROBLEM_TYPES|Problem}"
    ]
};
