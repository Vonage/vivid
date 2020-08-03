import { formatRelative } from 'date-fns';
export default ({ templateSet = "date-fns", templateSetOptions: { intlOptions = {}, dayCount = 7, justNowSecondCount = 5, justNowCaption = "Just now" } = {}} = {})=> {
	const
		SECOND = 1000,
		MINUTE = 60 * SECOND,
		HOUR = 60 * MINUTE,
		DAY = 24 * HOUR;

	const TEMPLATE_SET = Object.entries({
		"date-fns":  { [Number.MAX_VALUE]: (ts, dt)=> formatRelative(dt, new Date()) },
		"default": (function(){
			const
				relativeFormatter = new Intl.RelativeTimeFormat(intlOptions),
				dateTimeFormatter = new Intl.DateTimeFormat(intlOptions),
				round = (val)=>  Math.trunc(val);

			return {
				[justNowSecondCount * SECOND]: function(ts){
					return justNowCaption;
				},
				[MINUTE]: function(ts){
					const absoluteTime = round(ts / SECOND);
					return relativeFormatter.format(absoluteTime, 'second');
				},
				[HOUR]: function(ts){
					const absoluteTime = round(ts / MINUTE);
					return relativeFormatter.format(absoluteTime, 'minute');
				},
				[DAY]: function(ts){
					const absoluteTime = round(ts / HOUR);
					return relativeFormatter.format(absoluteTime, 'hour');
				},
				[DAY * dayCount]: function(ts){
					const absoluteTime = round(ts / DAY);
					return relativeFormatter.format(absoluteTime, 'day');
				},
				[Number.MAX_VALUE]: function(ts, dt){
					return dateTimeFormatter.format(new Date(dt));
				}
			};
		})()
	}[templateSet])
		.map(([a, b])=> [Number(a), b])
		.sort(([a], [b])=> a - b);

	return (datetime)=> {
		const timeSpan = datetime - Date.now();
		return TEMPLATE_SET.find(([maxSpan])=> Math.abs(timeSpan) <= maxSpan)[1](timeSpan, datetime);
	};
};
