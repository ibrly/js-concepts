// Intl: locale-aware formatting built into the language, no libraries needed
// outputs below are from Node 20 (full ICU); exact spacing and punctuation can vary between ICU versions

// numbers and currencies
const amount = 1234567.891
console.log(new Intl.NumberFormat('en-US').format(amount)) // 1,234,567.891
console.log(new Intl.NumberFormat('de-DE').format(amount)) // 1.234.567,891
console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(19.5)) // €19.50
console.log(new Intl.NumberFormat('en-US', { notation: 'compact' }).format(amount)) // 1.2M
console.log(new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(0.1234)) // 12.3%

// dates: always pass timeZone if the output must not depend on the machine
const launch = new Date(Date.UTC(2024, 0, 15, 18, 30))
console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeZone: 'UTC' }).format(launch)) // Monday, 15 January 2024
console.log(new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'Africa/Cairo' }).format(launch)) // 8:30 PM
console.log(new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'Asia/Tokyo' }).format(launch)) // 3:30 AM

// relative time: "3 days ago", "in 2 hours"
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
console.log(rtf.format(-1, 'day'), '|', rtf.format(-3, 'day'), '|', rtf.format(2, 'hour')) // yesterday | 3 days ago | in 2 hours

// plural rules pick the right word form; languages have different categories
const plural = new Intl.PluralRules('en-US')
const label = n => `${n} ${plural.select(n) === 'one' ? 'item' : 'items'}`
console.log(label(1), '|', label(5)) // 1 item | 5 items
console.log(new Intl.PluralRules('ar').select(2)) // two -> Arabic has a dual form

// ordinal numbers: 1st, 2nd, 3rd, 4th
const ordinal = new Intl.PluralRules('en-US', { type: 'ordinal' })
const suffix = { one: 'st', two: 'nd', few: 'rd', other: 'th' }
console.log([1, 2, 3, 4, 11, 22].map(n => n + suffix[ordinal.select(n)]).join(' ')) // 1st 2nd 3rd 4th 11th 22nd

// lists: "a, b, and c" with the locale's conjunction
console.log(new Intl.ListFormat('en', { type: 'conjunction' }).format(['tea', 'coffee', 'juice'])) // tea, coffee, and juice

// locale-aware sorting: plain sort compares UTF-16 code units
const names = ['Zoë', 'zara', 'Émile', 'adam']
console.log([...names].sort()) // [ 'Zoë', 'adam', 'zara', 'Émile' ]
console.log([...names].sort(new Intl.Collator('en').compare)) // [ 'adam', 'Émile', 'zara', 'Zoë' ]
