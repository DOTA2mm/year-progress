const shareToWeibo = require('./lib/weiboShare');
const schedule = require('node-schedule').scheduleJob;

function getYearProgress () {
  const now = Date.now();
  const currYear = new Date(now).getFullYear();
  const isLeapYear = (currYear % 4 === 0 && currYear % 100 !== 0) || currYear % 400 === 0;
  const totalHours = (isLeapYear ? 366 : 365) * 24;
  const goneHores = Math.round((now - new Date(currYear, 0, 1).getTime()) / 3.6e6);
  const percent = Math.round((goneHores / totalHours) * 100 * 100) / 100; // 百分比精确到百分位
  console.log(`百分比: ${percent}`);
  if (isInteger(percent)) {
    shareToWeibo(`${generateProgress(percent / 100).join('')}  ${percent}%
    ———${currYear} 年进度 🚀

    PoweredBy https://blog.chenteng.me`);
  }
}

/**
 * 判断一个数是否为整数
 * @param {Number} number 待判断的数字
 */
function isInteger (number) {
  return typeof number === 'number' && number % 1 === 0;
}

/**
 * 根据进度生成进度表示进度的数组
 * @param {Number} percent 进度百分比
 * @param {*} totalLen 数组长度
 */
function generateProgress (percent, totalLen = 20) {
  const empty = '░';
  const solid = '▓';
  const progressArr = new Array(totalLen);
  let fillLen = Math.round(progressArr.length * percent);
  return progressArr.fill(solid, 0, fillLen).fill(empty, fillLen);
}

schedule('0 0 * * * *', getYearProgress);

shareToWeibo(`Hello world
PoweredBy https://blog.chenteng.me`);
