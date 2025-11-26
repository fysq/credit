export default class DateTimePicker{
  constructor(options){
    this.options = options || {};
    this.options.now = this.options.now || new Date().getTime();
    Object.assign(this,{
      max : this.options.max || this.options.now,
      now : this.options.now,
      min : this.options.min,
      isHourMiniuteLimit : true,
      limitHour : options.limitHour,
      limitMinute : options.limitMinute,
    });
  }
  //获取列数据，以及当前时间选中值
  getInfo(){
    let { nowTime } = this.rangeTime();
    let { year,month,date,hour,minute } = nowTime;
    let years = this.getYears();
    let months = this.getMonths();
    let dates = this.getDate(year,month);
    let hours = this.getHours();
    let minutes = this.getMinutes();
    let columns = [years,months,dates,hours,minutes];
    let yearIndex = years.map(res => res.value).indexOf(year);
    yearIndex = yearIndex == -1 ? 0 : yearIndex;
    let monthIndex = months.map(res => res.value).indexOf(month);
    monthIndex = monthIndex == - 1 ? 0 : monthIndex;
    let dateIndex = dates.map(res => res.value).indexOf(date);
    dateIndex = dateIndex == -1 ? 0 : dateIndex;
    let hourIndex = hours.map(res => res.value).indexOf(hour);
    hourIndex = hourIndex == -1 ? 0 : hourIndex;
    let minuteIndex = minutes.map(res => res.value).indexOf(minute);
    minuteIndex = minuteIndex == -1 ? 0 : minuteIndex;

    let value = [yearIndex,monthIndex,dateIndex,hourIndex,minuteIndex]
    console.log(value);

    Object.assign(this,{
      columns,
      value
    })

    return {
      columns,
      value
    }
  }
  rangeTime(){
    return {
      maxTime : this.getTime(this.max),
      minTime : this.getTime(this.min),
      nowTime : this.getTime(this.now)
    }
  }
  getTime(time){
    time = new Date(time);
    let obj = {
      year : time.getFullYear(),
      month : time.getMonth(),
      date : time.getDate(),
      minute : time.getMinutes(),
      hour : time.getHours(),
      second : time.getSeconds()
    }
    return obj;
  }
  //获取年份列
  getYears(){
    let range = this.rangeTime();
    const { maxTime,minTime } = range;
    let { year } = minTime;
    let step = maxTime.year - minTime.year + 1;
    let years = []
    for(var i=0;i<step;i++){
      years.push({
        name : year + i + '年',
        value : year + i
      });
    }
    return years;
  }
  //获取月份列
  getMonths(){
    const { nowTime,minTime,maxTime } = this.rangeTime();

    let stepMin = 0;
    let stepMax = 11;
    if(minTime.year == maxTime.year){
      stepMin = minTime.month;
      stepMax = maxTime.month;
    }else{
      if(nowTime.year == maxTime.year){
        stepMax = maxTime.month
      }
      if(nowTime.year == minTime.year){
        stepMin = minTime.month;
      }
    }

    //console.log(stepMin,stepMax);

    let months = []
    for(var i=stepMin;i<=stepMax;i++){
      months.push({
        name : this.bZero(i + 1) + '月',
        value : i,
      });
    }
    return months;
  }
  bZero(number){
    number = number < 10 ? '0' + number : number;
    return number;
  }
  //获取日期列
  getDate(year = 2000,month = 0){
    let { nowTime,minTime,maxTime } = this.rangeTime();

    //如果当前时间月份为最小时期月份，那么日期应该从最小日期开始
    //如果当前时间月份为最大时期月份，那么日期最大为最大日期
    //其他时间随意

    let dmin = 1;
    var d = new Date(year, month + 1, 0);
    let dates = [];
    let monthDate = d.getDate();
    let dmax = monthDate;

    //console.log('minTime',minTime);
    if(nowTime.year == minTime.year && nowTime.month == minTime.month){
      dmin = minTime.date;
    }

    if(nowTime.year == maxTime.year && nowTime.month == maxTime.month){
      dmax = maxTime.date;
    }
    //这里month是后面一个月的前一天是几号，这样来取多少天的
    for(var i=dmin;i<=dmax;i++){
      dates.push({
        name : this.bZero(i) + '日',
        value : i
      });
    }
    //console.log(dates);
    return dates;
  }
  //获取小时列
  getHours(){
    let dmin = 0;
    let dmax = 23;
    let { isHourMiniuteLimit,limitHour } = this;
    if(isHourMiniuteLimit){
      let { nowTime,minTime,maxTime } = this.rangeTime();
      if(nowTime.year == minTime.year && nowTime.month == minTime.month && nowTime.date == minTime.date){
        dmin = minTime.hour;
      }

      if(nowTime.year == maxTime.year && nowTime.month == maxTime.month && nowTime.date == maxTime.date){
        dmax = maxTime.hour;
      }
    }
    if(limitHour){
      let { nowTime,minTime,maxTime } = this.rangeTime();
      dmin = minTime.hour;
    }
    let hours = []
    for(var i=dmin;i<=dmax;i++){
      hours.push({
        name : (i < 10 ? '0' + i : i) + '时',
        value : i
      });
    }
    return hours;
  }
  //获取分钟列
  getMinutes(){
    let dmin = 0;
    let dmax = 60;
    let { isHourMiniuteLimit,limitMinute} = this;
    if(isHourMiniuteLimit){
      let { nowTime,minTime,maxTime } = this.rangeTime();
      if(nowTime.year == minTime.year && nowTime.month == minTime.month && nowTime.date == minTime.date && minTime.hour == nowTime.hour){
        dmin = minTime.minute;
      }

      if(nowTime.year == maxTime.year && nowTime.month == maxTime.month && nowTime.date == maxTime.date && maxTime.hour == nowTime.hour){
        dmax = maxTime.minute;
      }
    }
    if(limitMinute){
      let { nowTime,minTime,maxTime } = this.rangeTime();
      if(minTime.hour == nowTime.hour){
        dmin = minTime.minute;
      }
    }
    //console.log('minutes',dmin,dmax);
    let minutes = []
    for(var i=dmin;i<dmax;i++){
      minutes.push({
        name : (i < 10 ? '0' + i : i) + '分',
        value : i
      });
    }
    return minutes;
  }
  setNow(value){
    //console.log(value);
    const [yearIndex,month,date,hour = 0,miniute = 0] = value;
    let { columns } = this;
    let y = columns[0][yearIndex].value;
    let m = columns[1][month].value;
    let d = columns[2][date].value;
    let h = columns[3][hour].value;
    let min = columns[4][miniute].value;
    //console.log(y,m,d,h,min);
    let now = new Date(y,m,d,h,min);
    this.now = now;
  }
  getNow(value){
    const [yearIndex,month,date,hour = 0,miniute = 0] = value;
    let { columns } = this;
    let y = columns[0][yearIndex].value;
    let m = columns[1][month].value;
    let d = columns[2][date].value;
    let h = columns[3][hour].value;
    let min = columns[4][miniute].value;
    return {
      y,
      m,
      d,
      h,
      min
    }
  }
  getResult(value){
    const { columns } = this;
    let result = []
    value[3] = value[3] || 0;
    value[4] = value[4] || 0;
    value.forEach((res,index) => {
      result[index] = columns[index][res]
    });
    let now = new Date(result[0].value,result[1].value,result[2].value,result[3].value,result[4].value).getTime();
    return {
      now
    }
  }
}
