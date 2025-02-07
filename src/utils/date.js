function daysDifferenceFromToday(date) {
  const firstDate = new Date(date);
  const secondDate = new Date();

  const firstDateInMs = firstDate.getTime();
  const secondDateInMs = secondDate.getTime();

  const differenceBtwDates = secondDateInMs - firstDateInMs;

  const aDayInMs = 24 * 60 * 60 * 1000;

  const daysDiff = Math.round(differenceBtwDates / aDayInMs);
  return daysDiff;
}

function dateToLocale(date, locale = 'ID') {
  const parsedDate = new Date(date);
  const currentDate = new Date();
  const options = {
    month: 'short',
    day: 'numeric',
  };

  if (parsedDate.getFullYear() !== currentDate.getFullYear()) {
    options.year = 'numeric';
  }

  return parsedDate.toLocaleDateString(locale, options);
}

export { daysDifferenceFromToday, dateToLocale };
