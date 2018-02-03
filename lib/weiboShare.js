const weiboAccessToken = require('../config').wb_access_token
const request = require('request-promise')

/**
 * 发一条微博
 * @param {String} content 微博正文
 */
function weiboShare (content) {
  let option = {
    url: 'https://api.weibo.com/2/statuses/share.json',
    method: 'POST',
    // encoding: null,
    form: {
      access_token: weiboAccessToken,
      status: `${content}`,
      visible: 0
    }
  }

  return request(option).then(ret => {
    console.log('Share to Weibo Successfull.');
  }).catch(err => {
    console.warn(`Share to Weibo failed. | Error info: ${err && err.message}`);
  })
}

module.exports = weiboShare;
