const protocol = window.location.protocol
const opapiHost=`${protocol}//39.105.208.97:9001`//测试环境
let LoginUrl = `${protocol}/login` //登录页

export default{
    opapiHost,
    LoginUrl
}