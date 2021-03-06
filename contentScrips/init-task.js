
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
    }, 3000);
}

/**
 * 创建任务列表
 *
 * @param {Object} taskListDataInput input dom
 */
function createTaskList(taskListDataInput) {
    const value = taskListDataInput.value;
    const data = JSON.parse(value);

    data.taskList.forEach(item => {
        item.statusText = '待执行';
        item.status = 'todo';
    });

    // 将任务数据放入 storage 中
    chrome.storage.sync.set({
        taskData: data
    }, () => {
        // 推送消息
        chrome.runtime.sendMessage({
            name: 'createTaskList',
            data
        });
    });
}
