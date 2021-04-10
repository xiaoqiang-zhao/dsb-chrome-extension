/**
 * @file 四川税务局 / 登录
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    // 登录部分
    const loginBoxContainer = document.getElementById('login-box');
    // 判断是否在登陆页
    if (!loginBoxContainer) {
        return;
    }
    // 判断是否有需要自动执行的任务
    chrome.storage.sync.get('taskData', ({
        taskData
    }) => {
        if (taskData && Array.isArray(taskData.list) && taskData.list.length > 0) {
            let currentTaskData;
            taskData.list.some(item => {
                if (item.status === '待执行') {
                    currentTaskData = item;
                }
            });
            doLogin(loginBoxContainer, currentTaskData);
        }
    });
});

/**
 * 执行登录
 * 
 * @param {Object} loginBoxContainer 登录弹框 Dom 容器对象
 * @param {Object} currentTaskData 任务数据
 */
function doLogin(loginBoxContainer, currentTaskData) {
    loginBoxContainer.style.display = 'block';

    const loginBox = document.getElementsByClassName('loginBox')[0];
    loginBox.style.top = 0;
    loginBox.style.left = 0;
    loginBox.style.margin = 0;

    // 等待页面渲染完成
    setTimeout(() => {
        const userName = document.getElementById('userName');
        // 登陆第一步: 社会信用代码 + 密码
        chrome.runtime.sendMessage({
            name: 'login-step-1',
            position: {
                x: getElementLeft(userName) + 15,
                y: getElementTop(userName) + 15
            },
            currentTaskData: currentTaskData,
            text: ''
        });
    }, spaceTime);

    // 等待表单填写完成 和 异步数据加载及渲染完成
    // 点出下拉菜单
    setTimeout(() => {
        $('.ant-select-enabled').click();
    }, spaceTime * 4);

    // 点下拉菜单的某一项
    setTimeout(() => {
        $('.ant-select-dropdown-menu-item').eq(1).click();
    }, spaceTime * 5);

    // 选择验证方式
    setTimeout(() => {
        const checkType = $('.row .ant-radio-group label').eq(0);
        checkType.click();
    }, spaceTime * 6);

    // 发送验证码
    setTimeout(() => {
        $('.row .ant-btn').eq(0).click();
    }, spaceTime * 7);

    // 填写验证码
    setTimeout(() => {
        $.ajax({
            url: 'http://127.0.0.1:4000/api/get-check-code',
            type: 'GET',
            success(res) {
                const code = JSON.parse(res).data;
                $('#code').val(code);
            }
        })
    // }, spaceTime);
    }, spaceTime * 20);

    // 登录
    setTimeout(() => {
        $('.ant-btn-primary').click();
    }, spaceTime * 25);
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
