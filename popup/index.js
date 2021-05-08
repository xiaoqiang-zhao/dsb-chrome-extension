// popup 与 background 连接的方法
// https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension

// 初始化列表
initTaskList();

// 清除任务
const chearTaskBtn = document.getElementById('chearTaskBtn');
chearTaskBtn.addEventListener("click", () => {
    chrome.storage.sync.set({
        taskData: {
            regionType: '',
            taskList: []
        }
    }, () => {
        initTaskList();

        chrome.action.setBadgeText({
            text: ''
        });
    });
});

/**
 * 初始化列表
 */
function initTaskList() {
    chrome.storage.sync.get('taskData', ({
        taskData
    }) => {
        const container = document.getElementById('task-container');
        const taskList = taskData.taskList;
        let result = '';
        if (Array.isArray(taskList) && taskList.length > 0) {
            taskList.forEach(item => {
                result += `
                <div class="item">
                    ${item.companyName}
                    <span class="${item.status}">
                        ${item.statusText}
                    </span>
                </div>`;
            });

            container.innerHTML = result;
        }
        else {
            container.innerHTML = '<div class="empty">暂无任务</div>';
        }
    });    
}