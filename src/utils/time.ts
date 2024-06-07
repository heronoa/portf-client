export const timestampFromNow = ({
  initial_date = undefined,
  seconds = 0,
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  months = 0,
  years = 0,
}: {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
  initial_date?: Date

}) => {
  const currentDate =  initial_date ? new Date(initial_date) : new Date();

  currentDate.setDate(currentDate.getDate() + (days + weeks * 7));
  currentDate.setHours(currentDate.getHours() + hours);
  currentDate.setMinutes(currentDate.getMinutes() + minutes);
  currentDate.setSeconds(currentDate.getSeconds() + seconds);

  let futureMonth = currentDate.getMonth() + months;
  let futureYear = currentDate.getFullYear() + years;

  if (futureMonth >= 12) {
    futureYear += Math.floor(futureMonth / 12);
    futureMonth %= 12;
  }

  if (weeks > 4) {
    futureMonth += Math.floor(weeks / 4);
    if (futureMonth >= 12) {
      futureYear += Math.floor(futureMonth / 12);
      futureMonth %= 12;
    }
  }

  currentDate.setMonth(futureMonth);
  currentDate.setFullYear(futureYear);

  // Convert the future date to a Unix timestamp (in milliseconds)
  const futureTimestamp = currentDate.getTime();

  return futureTimestamp;
};
