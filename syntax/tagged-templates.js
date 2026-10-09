// a tagged template calls a function with the literal string parts and the interpolated values separately
// tag(strings, ...values) -> the function decides how to combine them

function inspect(strings, ...values) {
  return { strings: [...strings], values }
}
console.log(inspect`a${1}b${2}c`) // { strings: [ 'a', 'b', 'c' ], values: [ 1, 2 ] }

// escaping user input before it reaches HTML
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

function html(strings, ...values) {
  return strings.reduce((out, str, i) => out + str + (i < values.length ? escapeHtml(values[i]) : ''), '')
}

const comment = '<img src=x onerror=alert(1)>'
console.log(html`<p>${comment}</p>`) // <p>&lt;img src=x onerror=alert(1)&gt;</p>

// building parameterised SQL so values never get concatenated into the query
function sql(strings, ...values) {
  return { text: strings.reduce((q, str, i) => q + '$' + i + str), values }
}
const email = "x' OR '1'='1"
console.log(sql`SELECT * FROM users WHERE email = ${email} AND active = ${true}`)
// { text: 'SELECT * FROM users WHERE email = $1 AND active = $2', values: [ "x' OR '1'='1", true ] }

// strings.raw keeps escape sequences untouched
console.log(String.raw`C:\new\folder`) // C:\new\folder
const tagRaw = strings => strings.raw[0]
console.log(tagRaw`line1\nline2`) // line1\nline2 (no newline)
