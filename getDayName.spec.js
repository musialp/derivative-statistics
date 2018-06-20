const getDayName = require('./getDayName');

describe('getDayName', () => {
  const date = new Date('2018-01-01');
  const localeUS = 'en-US'

  test('output type of string', () => {
    expect(typeof getDayName(date, localeUS)).toBe('string');
  });

  // default Node installation only contains en-US locale
  test('output for locale US', () => {
    expect(getDayName(date, localeUS)).toEqual('Monday');
  });
})
