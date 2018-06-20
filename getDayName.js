const getDayName = (date, locale) => {
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

module.exports = getDayName;
