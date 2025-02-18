/* eslint-disable no-undef */
const assert = require('assert');
const yaml = require('js-yaml');
const fs = require('fs');
const dict = require('./dictionary.json');

describe('YAML Validator', () => {
  describe('urls.yaml', () => {
    it('should contain valid YAML', () => {
      assert.doesNotThrow(() => yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8')));
    });
    it('every entry should have a url', () => {
      assert.deepEqual(yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8')).filter((entry) => !('url' in entry)), []);
    });
    it('every url should specify its protocol (http:// or https:// or mailto:)', () => {
      assert.deepEqual(yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8')).filter((entry) => !entry.url.startsWith('http://') && !entry.url.startsWith('https://') && !entry.url.startsWith('mailto:')), []);
    });
    it('every entry should have valid keys (url/category/subcategory/description/addresses/coin/reporter)', () => {
      assert.deepEqual(yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8')).filter((entry) => Object.keys(entry).some((key) => !['name', 'url', 'category', 'subcategory', 'description', 'addresses', 'reporter', 'coin'].includes(key))), []);
    });
    it('every entry should have a valid category', () => {
      yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8')).filter((entry) => {
        if ('category' in entry) {
          if (dict.CATEGORIES.includes(entry.category) === false) {
            console.log(`Dictionary does not include: ${entry.category}`);
            return false;
          }

          assert.strictEqual(dict.CATEGORIES.includes(entry.category), true);
          return true;
        }
        return false;
      });
    });
    it('every entry should have a valid subcategory', () => {
      yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8')).filter((entry) => {
        if ('subcategory' in entry) {
          if (dict.SUBCATEGORIES.includes(entry.subcategory) === false) {
            console.log(`Dictionary does not include: ${entry.subcategory}`);
            return false;
          }

          assert.strictEqual(dict.SUBCATEGORIES.includes(entry.subcategory), true);
          return true;
        }
        return false;
      });
    });
  });
});
