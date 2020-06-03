import { Toast } from 'vant';

export default {
    //格式验证--手机
    vertifyPhoneFormat(val) {
        if (!(/^[1-9][0-9]{8}$/.test(val))) {
            Toast('Có lỗi trong định dạng số điện thoại, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--手机(还款)
    vertifyPhoneRepayFormat(val) {
        if (!(/^[1-9][0-9]{7,12}$/.test(val))) {
            Toast('Có lỗi trong định dạng số điện thoại, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--公司电话(还款)
    vertifyCompanyPhoneFormat(val) {
        if (!(/^[0-9]{8,14}$/.test(val))) {
            Toast('Có lỗi trong định dạng số điện thoại, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--电话
    vertifyTelFormat(val) {
        if (!(/^[1-9][0-9]{8,12}$/.test(val))) {
            Toast('Có lỗi trong định dạng số điện thoại, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--电话
    vertifySameTelFormat(val1,val2) {
        if (val1 == val2) {
            Toast('Hai điện thoại giống nhau, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },

    //格式验证--密码
    vertifyPasswordFormat(val) {
        if (!(/^[a-zA-Z0-9]{6,10}$/.test(val))) {
            Toast('Chữ hoặc số từ 6 -10 ký tự')
            return false
        } else {
            return true
        }
    },
    //格式验证--名字
    vertifyNameFormat(val) {
        if ((/[0-9_]+/.test(val))) {
            Toast('Có một lỗi trong định dạng tên, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--邮箱
    vertifyEmailFormat(val) {
        if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val))) {
            Toast('Có lỗi trong định dạng hộp thư, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--发薪日
    vertifyPayDayFormat(val) {
        if (!(/^\d+$/.test(val)) || parseFloat(val) > 31) {
            Toast('Có một lỗi trong định dạng ngày trả tiền, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--身份证
    vertifyIdFormat(val) {
        if (!(/^(\d{9})$/.test(val)) && !(/^(\d{12})$/.test(val))) {
            Toast('Có lỗi trong định dạng thẻ ID, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //格式验证--银行账号
    vertifyBankAcountNoFormat(val) {
        if (!(/^[0-9]{1,16}$/.test(val))) {
            Toast('Định dạng tài khoản ngân hàng là sai, vui lòng nạp lại')
            return false
        } else {
            return true
        }
    },
    //订单id验证
    vertifyOrderIdFormat(val) {
        if (!val) {
            Toast('Vui lòng quay lại trang chủ để lấy ID đơn hàng!')
            return false
        } else {
            return true
        }
    },
}