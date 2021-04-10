// 在后台常驻

// 间隔时间 800 毫秒
const spaceTime = 3000; // 800;
// 不同地区的税务局网站
const regionTypeUrlMap = [
    '占位文字',
    // 四川
    'https://etax.sichuan.chinatax.gov.cn',
    // 重庆
    'https://etax.chongqing.chinatax.gov.cn'
];
let target;

chrome.runtime.onMessage.addListener((request, sender) => {
    // 初始化 popup
    if (request.name === 'createTaskList') {
        chrome.action.setBadgeText({
            text: request.data.list.length.toString()
        });

        chrome.tabs.create({
            url: regionTypeUrlMap[request.data.regionType],
            active: true
        });
    }
    target = {
        extensionId: chrome.runtime.id,
        tabId: sender.tab.id
    };

    if (request.name === 'loginSichuan') {
        // 模拟信用代码输入
        attach(() => {
            mousePressed(request, () => {
                // 信用代码
                request.text = request.currentTaskData.creditCode;
                insertText(request, () => {
                    mouseReleased(request);
                });
            });
        });
        // 模拟密码输入
        setTimeout(() => {
            request.position.y += 53;
            mousePressed(request, () => {
                setTimeout(() => {
                    request.text = request.currentTaskData.password;
                    insertText(request, () => {
                        mouseReleased(request);
                    });
                }, spaceTime);
            });
        }, spaceTime);
    }

    // 模拟点击
    // if (request.name === 'clickSimulator') {
    //     attach(() => {
    //         mousePressed(request, () => {
    //             mouseReleased(request);
    //         });
    //     });
    // }
});

function attach(cb) {
    chrome.debugger.attach(target, '1.3', () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb & cb();
    });
}

function mousePressed(request, cb) {
    chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
        type:'mousePressed',
        // 左键点击
        button:'left',
        // 输入框的坐标
        x: request.position.x,
        y: request.position.y
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb & cb();
    });
}

function insertText(request, cb) {
    chrome.debugger.sendCommand(target, "Input.insertText", {
        text: request.text
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb & cb();
    });
}

function mouseReleased(request) {
    chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: 'mouseReleased',
        // 输入框的坐标
        x: request.position.x,
        y: request.position.y
    });
}
