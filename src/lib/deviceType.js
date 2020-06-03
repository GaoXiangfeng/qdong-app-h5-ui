export default {
    isIos() {
        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return true;
        } else {
            return false;
        }
    }
}