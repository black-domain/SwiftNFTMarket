const  DateUtil = {
  //格式化时间
  //调用formatDate(strDate, 'yyyy-MM-dd')
  //@param strData(标准时间、时间戳)
  //@param strFormat(返回格式)
  formatDate(strDate:any,strFormat?:any) {
    if (!strDate) {return;}
    if (!strFormat) {strFormat='yyyy-MM-dd';}
    switch (typeof strDate) {
      case 'string':
        strDate = new Date(strDate.replace(/-/, '/'))
        
        break;
      case 'number':
        strDate = new Date(strDate * 1000);
        break;
    }
    if (strDate instanceof Date) {
      const dict:any = {
        yyyy: strDate.getFullYear(),
        M: strDate.getMonth() + 1 ,
        d: strDate.getDate(),
        H: strDate.getHours(),
        m: strDate.getMinutes(),
        s: strDate.getSeconds(),
        MM: ('' + (strDate.getMonth() + 101)).substring(1),
        dd: ('' + (strDate.getDate() + 100)).substring(1),
        HH: ('' + (strDate.getHours() + 100)).substring(1),
        mm: ('' + (strDate.getMinutes() + 100)).substring(1),
        ss: ('' + (strDate.getSeconds() + 100)).substring(1)
      };

      return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g,function () {
        return dict[arguments[0]];
      });
    }
  },

  /**
   * 时间格式的字符串转成时间戳
   * @param data (2015-03-05 17:59:00.0)
   * @constructor  return 毫秒级时间戳
   */
  dateStringToTimesTamp(data: string) {
    let newData = data;
    newData = newData.substring(0, 19);
    newData = newData.replace(/-/g, '/'); //必须把日期'-'转为'/'
    return new Date(newData).getTime();
  }
}


export default DateUtil;