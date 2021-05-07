/**
 * @file 重庆税务局 / 登录
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', async function() {
    // 等该页面加载完成
    await sleep();

    // 打开弹框
    const dialog = $('.longing');
    $('.mask_div').css('display', 'block');
    dialog.css('display', 'block');
    // 点击验证码(不点击不会直接展示)
    $('#image_qy').click();

    // 等待弹框展示
    await sleep(300);

    const currentTaskData = await getCurrentTask();

    // 有任务需要执行
    if (currentTaskData) {
        const inputs = $('#qy_login input');
        // 社会信用代码
        inputs.eq(0).val(currentTaskData.creditCode);
        // 用户名/手机号
        inputs.eq(1).val(currentTaskData.taxAgentMobileAccount);
        // 密码
        inputs.eq(2).val(currentTaskData.password);

        // 破解验证码
        // ...

        // 点击登录按钮
        // $('#qyLogin').click();
    }
});
