/**
 * @file 四川税务局 / 登录
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', async function() {
    const currentTaskData = await getCurrentTask();
    // 登录部分
    const loginBoxContainer = document.getElementById('login-box');
    // 判断是否在登陆页
    if (!loginBoxContainer) {
        return;
    }
    // 判断是否有需要自动执行的任务
    if (currentTaskData) {
        await sleep();
        doLogin(loginBoxContainer, currentTaskData);
        changeCurrentTaskStatus('doing');
    }
});

/**
 * 执行登录
 * 
 * @param {Object} loginBoxContainer 登录弹框 Dom 容器对象
 * @param {Object} currentTaskData 任务数据
 */
 async function doLogin(loginBoxContainer, currentTaskData) {
    loginBoxContainer.style.display = 'block';

    const loginBox = document.getElementsByClassName('loginBox')[0];
    loginBox.style.top = 0;
    loginBox.style.left = 0;
    loginBox.style.margin = 0;

    // 等待页面渲染完成
    await sleep(300);

    // 登陆第一步: 社会信用代码
    const userName = document.getElementById('userName');
    chrome.runtime.sendMessage({
        name: 'inputText',
        data: {
            x: getElementLeft(userName) + 15,
            y: getElementTop(userName) + 15,
            text: currentTaskData.creditCode
        }
    });

    // 失去焦点，触发异步
    await sleep(300);
    userName.blur();

    // 登陆第二步: 密码
    await sleep();
    const passWord = document.getElementById('passWord');
    chrome.runtime.sendMessage({
        name: 'inputText',
        data: {
            x: getElementLeft(passWord) + 15,
            y: getElementTop(passWord) + 15,
            text: currentTaskData.password
        }
    });

    await sleep(300);
    $('.ant-select-enabled').click();

    await sleep(300000000000000000);

    // 等待表单填写完成 和 异步数据加载及渲染完成
    // 点出下拉菜单
    setTimeout(() => {
        
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
