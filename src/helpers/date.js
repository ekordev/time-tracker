import moment from 'moment';

export const formatDate = (date, format = 'Do, MMMM') => {
  return moment(date).format(format);
};

export const isSameDay = (dateA, dateB) => {
  return moment(dateA).format('YYYY-MM-DD') === dateB.format('YYYY-MM-DD');
};

export const isFromPast = date => {
  return moment().diff(date) > 0;
};

export const isWeekDay = date => {
  return [6, 7].indexOf(moment(date).isoWeekday()) < 0;
};
