/**
 * @file 四川税务局 / 桌面(登录后的第一屏)
 */

document.addEventListener('DOMContentLoaded', async function() {
    // 关闭弹框 "关于签订电子签名和电子互信协议的通知"
    await sleep();
    const btn = $('#dzhxxy > .mini-panel-border > .mini-panel-viewport > .mini-panel-footer .knowBtn');
    if (btn.length) {
        btn[0].click();
    }

    const currentTaskData = await getCurrentTask();
    if (currentTaskData) {
        // 分发任务
        if (currentTaskData.taskType === '批量核对') {
            $('#rightTab .tabList')[2].click();
            sleep(300);
            $('#menu-content .show .menu-item')[0].click();
        }
        else if (currentTaskData.taskType === '取数') {
            // 待集成
            $('#rightTab .tabList')[1].click();
            sleep(300);
        }
    }
    // 点击“我要办税”Tab
    // setTimeout(() => {
    //     $('.tabList').eq(1).click();
    // }, spaceTime * 2);
    // // 点击“税费申报及缴纳”跳转页面
    // setTimeout(() => {
    //     const linkDom = $('[data-title="税费申报及缴纳"]');
    //     const link = linkDom.attr('data-url');
    //     window.location.replace('https://etax.sichuan.chinatax.gov.cn' + link);
    // }, spaceTime * 3);
});
