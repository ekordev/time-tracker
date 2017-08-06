import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

import ReportItem from 'components/Report/ReportItem';

import s from './style';

export default ({ month = {}, monthIndex }) => {

  //: TODO: move all this shit to selectors?
  const getReport = month => {
    return Object.keys(month).reduce((memo, key) => {
      const week = month[key];

      Object.keys(week).map(day => {
        if(week[day].events) {
          week[day].events.map(event => {
            if(!memo[event.name]) {
              memo[event.name] = parseInt(event.fraction * 10, 10) / 10;
            } else {
              memo[event.name] += parseInt(event.fraction * 10, 10) / 10;
            }
          });
        }
      });

      return memo;
    }, {});
  };
  const monthName = moment(monthIndex, 'MM').format('MMMM');
  const dataItems = getReport(month);
  const monthSummary = Object.keys(dataItems).reduce((memo, key) => {
    return memo += dataItems[key];
  }, 0);

  return (
    <View style={s.container}>
      <Text style={s.label}>{monthName} [expand]</Text>
      {
        Object.keys(dataItems).map((dataKey, index) => {
          return <ReportItem name={dataKey} days={dataItems[dataKey]} key={index} />;
        })
      }
      <Text style={s.summary}>Month summary: {monthSummary}</Text>
    </View>
  );
};