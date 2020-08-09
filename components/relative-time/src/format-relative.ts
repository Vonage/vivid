import { formatRelative } from 'date-fns';

export default ({ templateSet = 'date-fns', templateSetOptions: { intlOptions = [], dayCount = 7, justNowSecondCount = 5, justNowCaption = 'Just now' } = {} } = {}) => {
	const
		SECOND = 1000,
		MINUTE = 60 * SECOND,
		HOUR = 60 * MINUTE,
		DAY = 24 * HOUR;

	const template: any = {
		'date-fns': { [Number.MAX_VALUE]: (_ts: number, dt: Date) => formatRelative(dt, new Date()) },
		'default': (function() {
			const
				relativeFormatter = new Intl.RelativeTimeFormat(intlOptions),
				dateTimeFormatter = new Intl.DateTimeFormat(intlOptions),
				round = (val: number) => Math.trunc(val);

			return {
				[justNowSecondCount * SECOND]: function() {
					return justNowCaption;
				},
				[MINUTE]: function(ts: number) {
					const absoluteTime = round(ts / SECOND);
					return relativeFormatter.format(absoluteTime, 'second');
				},
				[HOUR]: function(ts: number) {
					const absoluteTime = round(ts / MINUTE);
					return relativeFormatter.format(absoluteTime, 'minute');
				},
				[DAY]: function(ts: number) {
					const absoluteTime = round(ts / HOUR);
					return relativeFormatter.format(absoluteTime, 'hour');
				},
				[DAY * dayCount]: function(ts: number) {
					const absoluteTime = round(ts / DAY);
					return relativeFormatter.format(absoluteTime, 'day');
				},
				[Number.MAX_VALUE]: function(_ds: number, dt: number) {
					return dateTimeFormatter.format(new Date(dt));
				}
			};
		})()
	};

	const TEMPLATE_SET: Array<any> = Object.entries(
		template[templateSet])
		.map(([a, b]) => [Number(a), b])
		.sort(([a]: unknown[], [b]: unknown[]) => a - b);

	return (datetime: number) => {
		const timeSpan = datetime - Date.now();
		return TEMPLATE_SET.find(([maxSpan]: number[]) => Math.abs(timeSpan) <= maxSpan)[1](timeSpan, datetime);
	};
};
