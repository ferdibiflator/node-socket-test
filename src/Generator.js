const { random } = require('lodash');
const randomstring = require('randomstring');


const MAX_COUNT = 100;
const MIN_COUNT = 10;
const RANDOM_STRING_LENGTH = 10;

const MIN_UPD_INTERVAL = 1000 / 100;
const MAX_UPD_INTERVAL = 1000 / 10;
const LOW_SPEED_INTERVAL = 1000;


class Generator {
	constructor () {
		this.onListCallbacks = [];
		this.lowSpeed = false;
	}

	start() {
		this._startList();
	}

	subscribeOnList(callback) {
		this.onListCallbacks = [...this.onListCallbacks, callback];
	}

	toggleSpeed() {
		this.lowSpeed = !this.lowSpeed;
	}

	_startList () {
		const tick = () => {
			const list = this._generateList();

			this.onListCallbacks.forEach((cb) => cb(list));

			setTimeout(tick, this._randomInterval());
		}

		setTimeout(tick, this._randomInterval());
	}

	_generateList () {
		const list = new Array(random(MIN_COUNT, MAX_COUNT));

		for(let i = 0; i < list.length; i++) {
			list[i] = { value: randomstring.generate(RANDOM_STRING_LENGTH), timestamp: Date.now() };
		}

		return list;
	}

	_randomInterval () {
		return this.lowSpeed ? LOW_SPEED_INTERVAL : random(MIN_UPD_INTERVAL, MAX_UPD_INTERVAL);
	}
}

module.exports = Generator;