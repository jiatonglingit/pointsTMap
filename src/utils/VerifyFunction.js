/**
 * 验证所有弹出框是否选择或为空
 */
exports.install = function(Vue, options) {
    Vue.prototype.FunctionBlurAll = function(params) {
        if (parseInt(params.value) == 0 || parseInt(params.value) == 1) {
            params.refValue.$el.style.border = "0px";
            return true;
        }
        if (params.value == "") {
            this.$message({
                type: "error",
                message: params.messageText //"请进行检查(为空或未选择)！！！"
            });
            params.refValue.$el.style.border = "1px solid red";
            // params.focus();
            return false;
        } else {
            params.refValue.$el.style.border = "0px";
            return true;
        }
    };
};