/**
 * @file 四川税务局 / 税费申报及缴纳(登录后的第二屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', async function() {
    await sleep();
    const currentTaskData = await getCurrentTask();

    if (currentTaskData) {
        if (currentTaskData.taskType === '批量核对') {
            $('[data-id="206010102"]')[0].click();
        }
    }

    // 小规模纳税人
    // setTimeout(() => {
    //     chrome.storage.sync.get('taskData', ({
    //         taskData
    //     }) => {
    //         let currentTaskData;
    //         if (taskData && Array.isArray(taskData.list) && taskData.list.length > 0) {
    //             taskData.list.some(item => {
    //                 if (item.status === '待执行') {
    //                     currentTaskData = item;
    //                 }
    //             });
    //         }
    //         if (currentTaskData) {
    //             let link;
    //             if (currentTaskData.taxesType === '小规模纳税人增值税') {
    //                 link = $('[data-id="70"]');
    //             }
    //             else if (currentTaskData.taxesType === '所得税') {
    //                 link = $('[data-id="10101"]');
    //             }
    //             const url = link.attr('data-href');
    //             window.open(url);
    //         }
    //     });
    // }, spaceTime);
});
