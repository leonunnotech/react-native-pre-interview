const moment = require('moment');

export const TimeStamp = (timeStamp) => moment(timeStamp).format("YYYY-MM-DD");