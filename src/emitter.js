class EventEmitter {
    constructor(){
        this.events = {};
    }

    _addListener(type, listener, once) {
        if (typeof type !== 'string') {
            throw TypeError('event type must be a string');
        }
        if (typeof listener !== 'function') {
            throw TypeError('listener must be a function');
        }

        if (!this.events[type]) {
            this.events[type] = [];
        }

        this.events[type].push({
            once,
            fn: listener
        });

        return this.events[type].length;
    }

    on(type, listener) {
        return this._addListener(type, listener, false);
    }

    once(type, listener) {
        return this._addListener(type, listener, true);
    }

    off(type, listener) {
        if (this.events[type]) {
            const length = this.events[type].length;

            if (!listener) {
                delete this.events[type];
            }
            else {
                this.events[type] = this.events[type].filter(x => x.fn !== listener) 
                
                if (!this.events[type].length) {
                    delete this.events[type];
                }
            }

            return length - (this.events[type] ?  this.events[type].length : 0);
        }

        return 0;
    }

    trigger(type, ...args) {
        let listeners = this.events[type];

        if (listeners) {
            listeners = this.events[type].slice();

            listeners.forEach(listener => {
                if (listener.once) {
                    this.off(type, listener.fn);
                }   
                listener.fn.apply(this, args);  
            });

            return true;
        }

        return false;
    }
}

export default new EventEmitter();
// Note: The following methods should be exported for Karma tests only

// export function off() {
// }

// export function on() {
// }

// export function once() {
// }

// export function trigger() {
// }
