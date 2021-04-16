/**
 * 常驻后台的功能
 */

// 时间间隔，为了更真实的模拟真人事件
const spaceTime = 30;
let target;

chrome.runtime.onMessage.addListener((request, sender) => {
    target = {
        extensionId: chrome.runtime.id,
        tabId: sender.tab.id
    };

    if (request.name === 'inputText') {
        inputText(request);
    }
    else if (request.name === 'click') {
        click(request);
    }
});

/** 复合事件 **/
/**
 * 向文本框输入文本
 * 
 * @param {Object} data 数据，格式 {text: '', x: 1, y: 2}，三个必需参数: 文本，横坐标，纵坐标
 */
function inputText(data) {
    attach(() => {
        mousePressed(data, () => {
            insertText(data, () => {
                mouseReleased(data);
            });
        });
    });
}

/**
 * 点击事件
 * 
 * @param {Object} data 数据，格式 {x: 1, y: 2}，两个必需参数: 横坐标，纵坐标
 */
function click(data) {
    attach(() => {
        mousePressed(data, () => {
            mouseReleased(data);
        });
    });
}

/** 原子事件 **/
function attach(cb) {
    chrome.debugger.attach(target, '1.3', () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb & cb();
    });
}

function mousePressed(data, cb) {
    chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
        type:'mousePressed',
        // 左键点击
        button:'left',
        // 输入框的坐标
        x: data.x,
        y: data.y
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb & cb();
    });
}

function insertText(data, cb) {
    chrome.debugger.sendCommand(target, "Input.insertText", {
        text: data.text
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb & cb();
    });
}

function mouseReleased(data) {
    chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: 'mouseReleased',
        // 输入框的坐标
        x: data.x,
        y: data.y
    });
}
