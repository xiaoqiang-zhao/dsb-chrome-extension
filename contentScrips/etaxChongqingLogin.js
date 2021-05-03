/**
 * @file 四川税务局 / 登录
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    const currentTaskData = await getCurrentTask();
    setTimeout(() => {
        // 登录部分
        const btn = $('.loing.alert_click_show');

        if (btn.length) {
            // 打开弹框
            const dialog = $('.longing');
            $('.mask_div').css('display', 'block');
            dialog.css('display', 'block');

            // 点击验证码(不点击不会直接展示)
            $('#image_qy').click();

            doLogin();
        }
    }, spaceTime);
});

/**
 * 执行登录(重庆税务局)
 */
function doLogin() {
    // 判断是否有需要自动执行的任务
    chrome.storage.sync.get('taskData', ({
        taskData
    }) => {
        if (taskData && Array.isArray(taskData.list) && taskData.list.length > 0) {
            let currentTaskData;
            taskData.list.some(item => {
                if (item.status === '待执行') {
                    currentTaskData = item;
                }
            });
            const inputs = $('#qy_login input');
            inputs.eq(0).val(currentTaskData.creditCode);
            inputs.eq(1).val(currentTaskData.mobile);
            inputs.eq(2).val(currentTaskData.password);
        }
    });
    // 破解验证码

    // 模拟点击登录按钮
    setTimeout(() => {
        $('#qyLogin').click();
    }, spaceTime * 5);
}
