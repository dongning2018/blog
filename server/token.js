const crypto = require('crypto')

const token = {
  createToken: function(data, timeout = 60 * 20) {
    const param = {
      //payload
      data,
      //token生成的时间的，单位秒
      created: parseInt(Date.now() / 1000),
      //token有效期
      exp: parseInt(timeout)
    }

    const base64Str = Buffer.from(JSON.stringify(param), 'utf8').toString(
      'base64'
    )

    //添加签名，防篡改
    const secret = 'dongningak47'
    const hash = crypto.createHmac('sha256', secret)
    hash.update(base64Str)
    const signature = hash.digest('base64')

    return base64Str + '.' + signature
  },

  decodeToken: function(token) {
    const decArr = token.split('.')
    if (decArr.length < 2) {
      //token不合法
      return false
    }

    let payload = {}
    //将payload json字符串 解析为对象
    try {
      payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('utf8'))
    } catch (e) {
      return false
    }

    //检验签名
    const secret = 'dongningak47'
    const hash = crypto.createHmac('sha256', secret)
    hash.update(decArr[0])
    const checkSignature = hash.digest('base64')

    return {
      payload: payload,
      signature: decArr[1],
      checkSignature: checkSignature
    }
  },

  checkToken: function(token) {
    const resDecode = this.decodeToken(token)
    if (!resDecode) {
      return false
    }

    //是否过期
    const expState =
      parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created) >
      parseInt(resDecode.payload.exp)
        ? false
        : true
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true
    }

    return false
  }
}

module.exports = exports = token
