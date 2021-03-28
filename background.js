// 在后台常驻
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.name === 'taskList') {
        chrome.action.setBadgeText({
            text: request.data.length.toString()
        });

        chrome.tabs.create({
            url: 'https://etax.sichuan.chinatax.gov.cn',
            active: true
        });
    }
    if (request.name === 'login') {
        attach(request, sender);
    }
});

// 间隔时间 800 毫秒
const spaceTime = 800;
const TYPE = 'userName';

function attach(request, sender) {
    chrome.debugger.attach({
        extensionId: chrome.runtime.id,
        tabId: sender.tab.id
    }, '1.3', () => {
        if (chrome.runtime.lastError) {
            // oh no!
        }
        else {
            // 信用代码
            request.text = '92513424MA628FLN6B';
            mousePressed(request, sender, TYPE);
            // 登录密码
            setTimeout(() => {
                request.text = 'zhaozhirui123';
                request.position.y += 53;
                mousePressed(request, sender);
            }, spaceTime);
        }
    });
}

function mousePressed(request, sender, type) {
    chrome.debugger.sendCommand({
        extensionId: chrome.runtime.id,
        tabId: sender.tab.id
    }, 'Input.dispatchMouseEvent', {
        type:'mousePressed',
        // 左键点击
        button:'left',
        // 输入框的坐标
        x: request.position.x,
        y: request.position.y
    }, () => {
        if (chrome.runtime.lastError) {
            // oh no!
        }
        else {
            setTimeout(() => {
                insertText(request, sender, type);
            }, type === TYPE ? 0 : spaceTime);
        }
    });
}

function insertText(request, sender) {
    chrome.debugger.sendCommand({
        extensionId: chrome.runtime.id,
        tabId: sender.tab.id
    }, "Input.insertText", {
        text: request.text
    }, () => {
        if (chrome.runtime.lastError) {
            // oh no!
        }
        else {
            mouseReleased(request, sender);
        }
    });
}

function mouseReleased(request, sender) {
    chrome.debugger.sendCommand({
        extensionId: chrome.runtime.id,
        tabId: sender.tab.id
    }, "Input.dispatchMouseEvent", {
        type: 'mouseReleased'
    });
}
