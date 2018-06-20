const getAverage = require('./stats');

describe('getAverage', () => {
  let oneWeek = [
    { date: new Date('2018-01-01'), visits: 32 },
    { date: new Date('2018-01-02'), visits: 82 },
    { date: new Date('2018-01-03'), visits: 74 },
    { date: new Date('2018-01-04'), visits: 35 },
    { date: new Date('2018-01-05'), visits: 54 },
    { date: new Date('2018-01-06'), visits: 64 },
    { date: new Date('2018-01-07'), visits: 44 },
  ];

  let noSaturday = [
    { date: new Date('2018-01-01'), visits: 32 },
    { date: new Date('2018-01-02'), visits: 82 },
    { date: new Date('2018-01-03'), visits: 74 },
    { date: new Date('2018-01-04'), visits: 50 },
    { date: new Date('2018-01-05'), visits: 54 },
    { date: new Date('2018-01-07'), visits: 44 },
  ];

  let totalSeries = [...oneWeek, ...noSaturday];

  let twoWeeks = [
    { date: new Date('2018-01-01'), visits: 32 },
    { date: new Date('2018-01-02'), visits: 82 },
    { date: new Date('2018-01-03'), visits: 74 },
    { date: new Date('2018-01-04'), visits: 35 },
    { date: new Date('2018-01-05'), visits: 54 },
    { date: new Date('2018-01-06'), visits: 64 },
    { date: new Date('2018-01-07'), visits: 44 },
    { date: new Date('2018-01-08'), visits: 32 },
    { date: new Date('2018-01-09'), visits: 82 },
    { date: new Date('2018-01-10'), visits: 74 },
    { date: new Date('2018-01-11'), visits: 35 },
    { date: new Date('2018-01-12'), visits: 54 },
    { date: new Date('2018-01-13'), visits: 64 },
    { date: new Date('2018-01-14'), visits: 44 },
  ]

  function emptyArray() {
    getAverage([]);
  }

  test('no data in series', () => {
    expect(emptyArray).toThrow();
  });

  test('average of one week', () => {
    expect(getAverage(oneWeek)).toEqual({
      averageVisits: 55,
    });
  });

  test('average of one week (no Saturday data)', () => {
    expect(getAverage(noSaturday)).toEqual({
      averageVisits: 56,
    });
  });

  test('average of totalSeries', () => {
    expect(getAverage(totalSeries)).toEqual({
      averageVisits: 103,
    });
  });

  test('average of two weeks', () => {
    expect(getAverage(twoWeeks)).toEqual({
      averageVisits: 55,
    });
  });

  test('week days average of one week', () => {
    expect(getAverage(oneWeek, true)).toEqual({
      Monday: {
        averageVisits: 32,
      },
      Tuesday: {
        averageVisits: 82,
      },
      Wednesday: {
        averageVisits: 74,
      },
      Thursday: {
        averageVisits: 35,
      },
      Friday: {
        averageVisits: 54,
      },
      Saturday: {
        averageVisits: 64,
      },
      Sunday: {
        averageVisits: 44,
      },
    });
  });

  test('week days average of one week (no Saturday data)', () => {
    expect(getAverage(noSaturday, true)).toEqual({
      Monday: {
        averageVisits: 32,
      },
      Tuesday: {
        averageVisits: 82,
      },
      Wednesday: {
        averageVisits: 74,
      },
      Thursday: {
        averageVisits: 50,
      },
      Friday: {
        averageVisits: 54,
      },
      Sunday: {
        averageVisits: 44,
      },
    });
  });

  test('week days average of totalSeries', () => {
    expect(getAverage(totalSeries, true)).toEqual({
      Monday: {
        averageVisits: 64,
      },
      Tuesday: {
        averageVisits: 164,
      },
      Wednesday: {
        averageVisits: 148,
      },
      Thursday: {
        averageVisits: 85,
      },
      Friday: {
        averageVisits: 108,
      },
      Saturday: {
        averageVisits: 64,
      },
      Sunday: {
        averageVisits: 88,
      },
    });
  });

  test('week days average of twoWeeks', () => {
    expect(getAverage(twoWeeks, true)).toEqual({
      Monday: {
        averageVisits: 32,
      },
      Tuesday: {
        averageVisits: 82,
      },
      Wednesday: {
        averageVisits: 74,
      },
      Thursday: {
        averageVisits: 35,
      },
      Friday: {
        averageVisits: 54,
      },
      Saturday: {
        averageVisits: 64,
      },
      Sunday: {
        averageVisits: 44,
      },
    });
  });
});

