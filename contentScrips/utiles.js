/**
 * 工具函数库
 */
// 间隔时间
const spaceTimes = 3000;

const statusMap = {
    todo: '待执行',
    doing: '执行中',
    // 操作完成退出中，切换到下一个中 (页面之间通信)
    logout: '退出中',
    // 任务完成
    done: '已完成'
};

async function sleep(time = spaceTimes) {
    return new Promise(resolve => setTimeout(() => resolve(), time))
}

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
                    if (item.status !== 'done') {
                        currentTaskData = item;
                        return true;
                    }
                });
            }
            resolve(currentTaskData);
        });
    });
}

/**
 * 改变任务状态
 *
 * @param {string} status 状态 todo/doing/done
 */
function changeCurrentTaskStatus(status) {
    chrome.storage.sync.get('taskData', ({
        taskData
    }) => {
        if (taskData && Array.isArray(taskData.taskList) && taskData.taskList.length > 0) {
            taskData.taskList.some(item => {
                if (item.status !== 'done') {
                    item.status = status;
                    item.statusText = statusMap[status];
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

/**
 * 改变插件图标上的角标
 *
 * @param {Object} taskData 任务数据
 */
function setBadgeText(taskData) {
    let count = 0;
    taskData.taskList.forEach(item => {
        if (item.status !== 'done') {
            count++;
        }
    });

    // 推送消息
    chrome.runtime.sendMessage({
        name: 'setBadgeText',
        text: count > 0 ? count + '' : ''
    });
}

/**
 * 获取横坐标
 *
 * @param {Object} element 元素对象
 * @returns {Number} 页面上的左坐标
 */
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
    　　actualLeft += current.offsetLeft;
    　　current = current.offsetParent;
    }

    return actualLeft;
}

/**
 * 获取纵坐标
 *
 * @param {Object} element 元素对象
 * @returns {Number} 纵坐标
 */
function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null){
    　　actualTop += current.offsetTop;
    　　current = current.offsetParent;
    }

    return actualTop;
}

/**
 * 关闭页面
 */
function closeCurrentPage() {
	const ua = window.navigator.userAgent;
	if (ua.indexOf('MSIE') > 0) {
		if (ua.indexOf('MSIE 6.0') > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open('', '_top');
			window.top.close();
		}
	} else {
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
}
