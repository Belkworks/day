type DateResolveable = Day | DateTime | string;

export class Day {
	constructor(readonly date = DateTime.now()) {}

	isBefore(other: DateResolveable) {
		return this.date.UnixTimestampMillis < Day.resolve(other).date.UnixTimestampMillis;
	}

	isAfter(other: DateResolveable) {
		return this.date.UnixTimestampMillis > Day.resolve(other).date.UnixTimestampMillis;
	}

	isFuture() {
		return this.isAfter(new Day());
	}

	isPast() {
		return this.isBefore(new Day());
	}

	static resolve(date: DateResolveable) {
		if (date instanceof Day) return date;
		else if (typeIs(date, "DateTime")) return new Day(date);
		else if (typeIs(date, "string")) return new Day(DateTime.fromIsoDate(date));

		throw `Day.resolve - unsupported type: ${typeOf(date)}`;
	}

	static fromUnixTimestamp(timestamp: number) {
		return new Day(DateTime.fromUnixTimestamp(timestamp));
	}

	static fromUnixTimestampMillis(timestamp: number) {
		return new Day(DateTime.fromUnixTimestampMillis(timestamp));
	}
}
