/**
 * @file 重庆税务局 / 桌面(登录后的第一屏)，负责任务的分发
 */

document.addEventListener('DOMContentLoaded', async function() {
    // 等该页面加载完成
    await sleep();

    // 判断是否有服务提醒弹窗需要关闭
    const closeDialogBtn = $('.ui-dialog .submit_btn');
    if (closeDialogBtn.length) {
        closeDialogBtn.click();
    }

    const currentTaskData = await getCurrentTask();

    // 有待执行任务
    if (currentTaskData) {
        // 任务类型
        if (currentTaskData.taskType === '增值税' || currentTaskData.taskType === '企业所得税') {
            // 展示 “我要办税” Tab 下的图标内容
            $('#myTab li').eq(0).removeClass('active');
            $('#myTab li').eq(1).addClass('active');
            $('#wdxx').removeClass('active');
            $('#wybs').addClass('active');

            // 等待页面渲染
            await sleep(300);

            // mouseover 税费申报及缴纳
            let event = new CustomEvent('mouseover', { bubbles: true, cancelable: true });
            const div = document.getElementById('112005');
            div.dispatchEvent(event);

            // 悬浮框中的数据需要异步加载
            await sleep();

            // 调出悬浮框
            $('#112005 .tc_xxbg').show();

            let aLink;
            if (currentTaskData.taskType === '增值税') {
                // 一般纳税人
                if (currentTaskData.payTaxesType === 0) {
                    aLink = $('#112005 .tc_xxbg > div > a')[1];
                }
                // 小规模纳税人
                else if (currentTaskData.payTaxesType === 1) {
                    aLink = $('#112005 .tc_xxbg > div > a')[2];
                }
            }
            else if (currentTaskData.taskType === '企业所得税') {
                aLink = $('#112005 .tc_xxbg > div > a')[5];
            }
            aLink.click();
        }
    }
});

async function listener() {
    const currentTaskData = await getCurrentTask();
    if (currentTaskData && currentTaskData.status === 'logout') {
        changeCurrentTaskStatus('done');
        // 退出
        $('#out')[0].click();
        await sleep(30);
        // 确认退出
        $('#mb_btn_ok')[0].click();
    }
    else {
        await sleep();
        listener();
    }
}
listener();