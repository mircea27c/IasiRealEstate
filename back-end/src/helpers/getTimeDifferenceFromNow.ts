const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;

export const msToDays = (milliseconds: number) => milliseconds / MS_PER_DAY;
export const msToHours = (milliseconds: number) => milliseconds / MS_PER_HOUR;

export const getTimeDifferenceFromNow = (date: Date) => {
  const currentDate = new Date();
  const currentDateUTC = new Date(currentDate.toISOString());

  const timeDifference = currentDateUTC.getTime() - date.getTime();

  return timeDifference;
};
