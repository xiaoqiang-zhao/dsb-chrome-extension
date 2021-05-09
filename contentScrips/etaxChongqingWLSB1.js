/**
 * @file 重庆税务局 / (一般纳税人)增值税
 */

document.addEventListener('DOMContentLoaded', async function() {
    // 等该页面加载完成
    await sleep();

    // 无任务可做
    const currentTaskData = await getCurrentTask();
    if (!currentTaskData) {
        return;
    }

    // 点击弹框中的按钮 ”一表集成申报“
    const dialogBtn = $('.ui_state_focus .ui_buttons input')[1].click();

    let event = new CustomEvent('mousedown', {
        bubbles: true,
        cancelable: true
    });
    dialogBtn.dispatchEvent(event);
    dialogBtn.click();
});
