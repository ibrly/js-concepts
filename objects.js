/*
    name / value pair: a name which maps to a unique value
    the name may be defined more than once, but only can have one value in any given context.
    That value may be more name/value pairs.
    Objects are a collection of name/value pairs.
    the simplest definition when talking about javascript
    */

const address = {
    street: 'Main',
    city: 'Salt Lake City',
    zip: 84101,
    apartment: {
        floor: 3,
        number: 301
    }
};
