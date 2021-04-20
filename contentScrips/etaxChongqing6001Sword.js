/**
 * @file 重庆税务局 / 重庆 一般纳税人 增值税
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;
let i = 1;

document.addEventListener('DOMContentLoaded', function() {
    // 如果有弹框 先关闭弹框
    setTimeout(() => {
        // $('.ui_buttons input').click();
        const dialogIframeContents = $(document.getElementById('IFrame1618753676272')).contents();
        dialogIframeContents.find('.submit_btn.submit_ie67_btn')[0].click();
    }, spaceTime * i++);
});
