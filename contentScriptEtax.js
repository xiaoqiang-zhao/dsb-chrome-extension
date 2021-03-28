/**
 * @file 代税宝 B 端页面插件控制
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    const loginBoxContainer = document.getElementById('login-box');
    loginBoxContainer.style.display = 'block';

    const loginBox = document.getElementsByClassName('loginBox')[0];
    loginBox.style.top = 0;
    loginBox.style.left = 0;
    loginBox.style.margin = 0;

    // 等待页面渲染完成
    setTimeout(() => {
        const userName = document.getElementById('userName');
        chrome.runtime.sendMessage({
            name: 'login-step-1',
            position: {
                x: getElementLeft(userName) + 15,
                y: getElementTop(userName) + 15
            },
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
        const checkType = $('[value="message"]')[0];
        // chrome.runtime.sendMessage({
        //     name: 'login-step-2',
        //     position: {
        //         x: getElementLeft(checkType) + 7,
        //         y: getElementTop(checkType) + 10
        //     }
        // });
    }, spaceTime * 6);

    // 发送验证码
    // setTimeout(() => {
    //     $('.row .ant-btn').eq(0).click();
    // }, spaceTime * 7);
});

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
