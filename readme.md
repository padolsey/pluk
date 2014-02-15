Pluk
==

Bindings for [data.police.uk/api](http://data.police.uk/api).

## Install

```bash
npm install pluk
```

## Example

```js
var pluk = require('pluk');

pluk.hood('Bank, London').info().then(function(data) {
  data; /* =>
  {
    contact_details:
     { telephone: '020 7601 2452',
       email: 'community@cityoflondon.police.uk' },
    name: 'Community Policing',
    links: [],
    centre: { latitude: '51.5151', longitude: '-0.0934' },
    locations:
     [ { name: 'Snow Hill Police Station',
         longitude: null,
         postcode: 'EC1A 2DP',
         address: '5 Snow Hill\nLondon',
         latitude: null,
         type: 'station',
         description: null } ],
    url_force: 'http://www.cityoflondon.police.uk/community-policing/',
    population: '208596',
    id: 'cp',
    description: '<p>City of London Police Community Policing</p>'
  }*/
}, function(err) {
  // err occurred
});
```

## Current methods

 * `info()`
 * `events()`
 * `priorities()`
 * `boundary()`
 * `people()`

See http://data.police.uk/docs/ for additional docs.

## TODO:

Additional methods!