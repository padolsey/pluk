Pluk
==

Bindings for **[data.police.uk](http://data.police.uk/docs/)**.

## Install

```bash
npm install pluk
```

## Example

```js
var pluk = require('pluk');

pluk.hood('Westminster, London').info().then(function(data) {
  console.log(data);
}, function(err) {
  // err occurred
});
```

```js
// Logged:
{ contact_details:
   { mobile: '07810 857227',
     email: 'VincentSquare.snt@met.police.uk',
     telephone: '0208 721 2876' },
  name: 'Vincent Square and St James South',
  links:
   [ { url: 'http://www.met.police.uk/teams/westminster/vincentsquareandstjamessouth/',
       description: 'Further local information on Vincent Square and St James South Safer Neighbourhoods Team',
       title: 'Vincent Square and St James South Saferneighbourhoods Team' },
     { url: 'http://maps.met.police.uk/index.php?areacode=00BK19N',
       description: 'Information about crime in your local area.',
       title: 'Local Crime' } ],
  centre: { latitude: '51.4945', longitude: '-0.132436' },
  locations:
   [ { name: 'Vincent Square and St James South Safer Neighbourhoods Team',
       longitude: null,
       postcode: 'SW1 9SX',
       address: 'Belgravia Police Station, 202-206 Buckingham Palace Road, Belgravia, London',
       latitude: null,
       type: 'station',
       description: null } ],
  url_force: 'http://www.met.police.uk/teams/westminster/vincentsquareandstjamessouth/',
  population: '13937',
  id: '00BK19N',
  description: 'Welcome to the Vincent Square and St James South...' }
```

## Current API

 * `hood(ADDR | POST-CODE | [LAT, LNG])` - returns methods:
  * *Each method returns a when.js promise*
  * `info()`
  * `events()`
  * `priorities()`
  * `boundary()`
  * `people()`

See http://data.police.uk/docs/ for additional docs.

## TODO:

 * Additional methods!
 * Mocha specs