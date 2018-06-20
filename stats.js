const getDayName = require('./getDayName');

const getOveralAverage = visitationData => {
  // calculate number of unique days in series
  var uniqueDaysInSeries = new Set(visitationData.map(element => element.date.getTime())).size;

  // sum up all daily visits counters
  const allVisits = visitationData.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.visits;
  }, 0);

  // calculate average
  const averageVisits = allVisits / uniqueDaysInSeries;

  return {
    averageVisits,
  };
}

const getDailyAverage = visitationData => {
  let dailyStats = {};

  // sort by date - ascending
  const visitationDataSorted = visitationData.sort((a, b) => {
    return a.date - b.date;
  });

  // count number of days and overall daily visits
  visitationDataSorted.forEach((element, index) => {
    let day = getDayName(element.date, 'en-US');

    if (!(day in dailyStats)) {
      dailyStats[day] = {
        averageVisits: element.visits,
        numberOfDaysInSeries: 1,
      };
    } else {
      dailyStats[day].averageVisits += element.visits;
      if (element.date - visitationData[index - 1].date > 0) {
        dailyStats[day].numberOfDaysInSeries += 1;
      };
    };
  });

  // calculate averages
  for (let day in dailyStats) {
    dailyStats[day].averageVisits = dailyStats[day].averageVisits / dailyStats[day].numberOfDaysInSeries;
    delete dailyStats[day].numberOfDaysInSeries;
  };

  return dailyStats;
};

const getAverage = (visitationData, calculateDaily = false) => {
  if (visitationData.length === 0) {
    throw new Error('No data in series');
  };

  if (calculateDaily) {
    return getDailyAverage(visitationData);
  } else {
    return getOveralAverage(visitationData);
  };
};

module.exports = getAverage;
