const MILLISECOND = 1;
const SECOND = MILLISECOND * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

type Units = keyof typeof units;
const units = {
	millisecond: MILLISECOND,
	second: SECOND,
	minute: MINUTE,
	hour: HOUR,
	day: DAY,
	week: WEEK,
};

type PluralUnits = `${Units}s`;
const pluralUnits = {
	milliseconds: MILLISECOND,
	seconds: SECOND,
	minutes: MINUTE,
	hours: HOUR,
	days: DAY,
	weeks: WEEK,
};

type ShortUnits = keyof typeof shortUnits;
const shortUnits = {
	ms: MILLISECOND,
	s: SECOND,
	h: HOUR,
	d: DAY,
	w: WEEK,
};

type TimeUnit = Units | PluralUnits | ShortUnits;

export const ms = (amount: number, unit: TimeUnit) => {
	const ms =
		units[unit as Units] ??
		pluralUnits[unit as PluralUnits] ??
		(shortUnits[unit as ShortUnits] as number | undefined);

	if (ms === undefined) throw `unknown TimeUnit: ${unit}`;

	return amount * ms;
};
