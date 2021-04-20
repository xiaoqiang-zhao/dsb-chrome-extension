/**
 * @file 重庆税务局 / 桌面(登录后的第一屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;
let i = 1;

document.addEventListener('DOMContentLoaded', function() {
    // 展示 “我要办税” Tab 下的图标内容
    setTimeout(() => {
        $('#myTab li').eq(0).removeClass('active');
        $('#myTab li').eq(1).addClass('active');
        $('#wdxx').removeClass('active');
        $('#wybs').addClass('active');
    }, spaceTime);

    // mouseover 税费申报及缴纳，需要与后台交互数据，悬浮框中的数据是异步加载的
    setTimeout(() => {
        let event = new CustomEvent('mouseover', { bubbles: true, cancelable: true });
        const div = document.getElementById('112005');
        div.dispatchEvent(event);
    }, spaceTime * ++i);

    // 调出悬浮框
    setTimeout(() => {
        $('#112005 .tc_xxbg').show();
    }, spaceTime * ++i);

    // 跳转
    setTimeout(() => {
        chrome.storage.sync.get('taskData', ({
            taskData
        }) => {
            let currentTaskData;
            if (taskData && Array.isArray(taskData.list) && taskData.list.length > 0) {
                taskData.list.some(item => {
                    if (item.status === '待执行') {
                        currentTaskData = item;
                    }
                });
            }
            if (currentTaskData) {
                if (currentTaskData.taxesType === '小规模纳税人增值税') {
                    $('#112005 .tc_xxbg > div > a')[2].click();
                }
                else if (currentTaskData.taxesType === '所得税') {
                    $('#112005 .tc_xxbg > div > a')[5].click();
                }
            }
        });
        // $('#112005 .tc_xxbg > div > a')[1].click();


    }, spaceTime * ++i);
});

// 跳转到: 一般纳税人 增值税报销
function jumpYBZ() {

}