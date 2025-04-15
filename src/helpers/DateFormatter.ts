import { DateTime } from 'luxon';

export const formatDate = (date: string | Date) => {
  const parsedDate = DateTime.fromJSDate(new Date(date));
  return parsedDate.toFormat('dd/MM/yyyy');
};


