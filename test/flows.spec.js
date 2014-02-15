'use strict';

require('mocha-as-promised')();
require('chai').use(require('chai-as-promised'));

var chai = require('chai');
var expect = chai.expect;
var pluk = require('../src/pluk');

describe('Pluk', function() {
  describe('Getting info', function() {
    it('Successfully retrieves url_force for EC2R, London', function() {
      return expect(
        pluk.hood('EC2R, London').info()
      ).to.eventually.have.property('url_force', 'http://www.cityoflondon.police.uk/community-policing/');
    });
    it('Successfully retrieves url_force for [51.780332, -0.102075]', function() {
      return expect(
        pluk.hood([51.780332, -0.102075]).info()
      ).to.eventually.have.deep.property(
        'contact_details.twitter',
        'http://twitter.com/hertspolice'
      );
    });
  });
  describe('direct()', function() {
    it('Requests the passed API path', function() {
      return expect(
        pluk.direct('leicestershire/C02')
      ).to.eventually.have.property('name', 'Abbey');
    });
  });
});