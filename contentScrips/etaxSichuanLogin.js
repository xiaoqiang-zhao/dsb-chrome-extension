/**
 * @file 四川税务局 / 登录
 */

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
    passWord.blur();

    // await sleep(300);
    $('.ant-select-enabled').click();

    // 点下拉菜单的某一项
    const list = $('.ant-select-dropdown-menu-item');
    list.each((index, item) => {
        currentTaskData.mobile
        // 手机号后四位
        const last = currentTaskData.mobile.slice(-4);
        if (item.innerText.includes(last)) {
            item.click();
        }
    });

    // 选择验证方式
    await sleep();
    const checkType = $('.row .ant-radio-group label').eq(0);
    checkType.click();

    // 发送验证码
    await sleep();
    $('.row .ant-btn').eq(0).click();
    await sleep(30 * 1000);

    const url = 'http://121.89.205.96:8877/api/app/getVerificationCode?phoneNum=' + currentTaskData.mobile;
    const response = await fetch(url, {
        data: {
            phoneNum: currentTaskData.mobile
        },
        headers: {
            "referrer": "https://baidu.com/",
            "origin": "https://baidu.com/",
        },
        method: 'GET'
    });
    const res = await response.json();

    if (res.data.verificationCode) {
        // 填写验证码
        const codeInput = $('#code')[0];
        chrome.runtime.sendMessage({
            name: 'inputText',
            data: {
                x: getElementLeft(codeInput) + 15,
                y: getElementTop(codeInput) + 15,
                text: res.data.verificationCode
            }
        });

        // 登录
        await sleep(300);
        $('.ant-btn-primary').click();
    }
}
