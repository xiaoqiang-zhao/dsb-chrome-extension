/**
 * 工具函数库
 */

const statusMap = {
    doing: '执行中',
    done: '完成'
};

/**
 * 获取当前待执行或执行中任务
 */
async function getCurrentTask() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('taskData', ({
            taskData
        }) => {
            let currentTaskData = null;
            if (taskData && Array.isArray(taskData.taskList) && taskData.taskList.length > 0) {
                taskData.taskList.some(item => {
                    if (item.status === '待执行'|| item.status === '执行中') {
                        currentTaskData = item;
                        return true;
                    }
                });
            }
            resolve(currentTaskData);
        });
    });
}

function changeCurrentTaskStatus(status) {
    chrome.storage.sync.get('taskData', ({
        taskData
    }) => {
        if (taskData && Array.isArray(taskData.taskList) && taskData.taskList.length > 0) {
            taskData.taskList.some(item => {
                if (item.status === '待执行'|| item.status === '执行中') {
                    item.styleClass = status;
                    item.status = statusMap[status];
                    return true;
                }
            });

            chrome.storage.sync.set({
                taskData
            }, () => {
                setBadgeText(taskData);
            });
        }
        
    });
}

function setBadgeText(taskData) {
    let count = 0;
    taskData.taskList.forEach(item => {
        if (item.status === '待执行'|| item.status === '执行中') {
            count++;
        }
    });

    // 推送消息
    chrome.runtime.sendMessage({
        name: 'setBadgeText',
        text: count > 0 ? count + '' : ''
    });
}


function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
    　　actualLeft += current.offsetLeft;
    　　current = current.offsetParent;
    }

    return actualLeft;
}
    
function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null){
    　　actualTop += current.offsetTop;
    　　current = current.offsetParent;
    }

    return actualTop;
}
