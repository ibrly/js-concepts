// Date stores one number: milliseconds since 1970-01-01T00:00:00Z
// the pitfalls come from parsing, local time zones and mutation
process.env.TZ = 'America/New_York' // pin a zone so the output below is reproducible

// months are 0-based, days are 1-based
console.log(new Date(2024, 0, 31).toDateString()) // Wed Jan 31 2024

// date-only ISO strings are parsed as UTC, date-time strings without Z as local time
console.log(new Date('2024-03-10').toISOString()) // 2024-03-10T00:00:00.000Z
console.log(new Date('2024-03-10T00:00').toISOString()) // 2024-03-10T05:00:00.000Z
console.log(new Date('2024-03-10').getDate()) // 9 -> midnight UTC is still the 9th in New York

// month overflow rolls forward instead of clamping
const d = new Date(2024, 0, 31)
d.setMonth(1) // "Feb 31" does not exist
console.log(d.toDateString()) // Sat Mar 02 2024

// Dates are mutable: pass copies around
const start = new Date(2024, 5, 1)
const addDays = (date, n) => {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + n)
  return copy
}
console.log(addDays(start, 30).toDateString(), start.toDateString()) // Mon Jul 01 2024 Sat Jun 01 2024

// adding 24h is not "next day" across a DST change
const beforeDst = new Date(2024, 2, 10) // DST starts in New York on 2024-03-10
console.log(new Date(beforeDst.getTime() + 24 * 60 * 60 * 1000).getHours()) // 1
console.log(addDays(beforeDst, 1).getHours()) // 0

// invalid dates don't throw, they become NaN
const bad = new Date('not a date')
console.log(bad.getTime(), Number.isNaN(bad.getTime())) // NaN true
try {
  bad.toISOString()
} catch (e) {
  console.log(e.name) // RangeError
}

// compare by value, not by reference
const a = new Date(2024, 0, 1)
const b = new Date(2024, 0, 1)
console.log(a === b, a.getTime() === b.getTime(), a < addDays(b, 1)) // false true true
