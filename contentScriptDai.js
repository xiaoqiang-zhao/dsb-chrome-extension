/**
 * @file 代税宝 B 端页面插件控制
 */

listenTask();

function listenTask () {
    const value = 'true';
    const taskListDataInput = document.getElementById('taskListDataInput');
    if (taskListDataInput) {
        // 是否已绑定过事件
        const isBinded = taskListDataInput.getAttribute('chrome-extension');
        if (!isBinded) {
            createTaskList(taskListDataInput);
        }
        taskListDataInput.setAttribute('chrome-extension', value);
    }

    // 轮训
    setTimeout(() => {
        listenTask();
    }, 1000);
}

/**
 * 创建任务列表
 *
 * @param {Object} taskListDataInput input dom
 */
function createTaskList(taskListDataInput) {
    const value = taskListDataInput.value;
    const list = JSON.parse(value);

    list.forEach(item => {
        item.status = '待执行';
        item.styleClass = 'todo';
    });

    // 将任务数据放入 storage 中
    chrome.storage.sync.set({
        taskList: list
    }, () => {
        // 推送消息
        chrome.runtime.sendMessage({
            name: 'taskList',
            data: list
        });
    });
}
