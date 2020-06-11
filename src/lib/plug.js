import Vue from 'vue';

export const DateFormat = (date, format) => {
  if (!date) {
    date = +new Date();
  }
  if (!format) {
    format = 'yyyy-MM-dd';
  }
  //Date format
  let o = {
    "M+": date.getMonth() + 1, //month 
    "d+": date.getDate(), //day 
    "h+": date.getHours(), //hour 
    "m+": date.getMinutes(), //minute 
    "s+": date.getSeconds(), //second 
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
    "S": date.getMilliseconds() //millisecond 
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}


export const NumAdd = function(num, num1) {

  var r1, r2, m;
  try {
    r1 = num.toString().split(".")[1].length
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num1.toString().split(".")[1].length
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (num * m + num1 * m) / m;
}

export default ({
  install(Vue, options) {
    let prop = {};
    //通用http
    let cmpName = options && options['cmpName'] || '';
    if (cmpName == "axios") {
      prop['$http'] = {
        get() {
          return options;
        }
      }
    }

    Object.defineProperties(Vue.prototype, prop);
  }
})
