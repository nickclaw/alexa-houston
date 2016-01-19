export class Session {

    constructor(event, context) {
        this._event = event;
        this._context = context;

        this.resolved = false;
        this.rejected = false;
    }

    get finished() {
        return this.resolved || this.finished;
    }

    tell() {

    }

    tellWithCard() {

    }

    ask() {

    }

    askWithCard() {

    }
}
