/**
 * 常驻后台的功能
 */

let target;

// 不同地区的税务局网站
const regionTypeUrlMap = {
    // 四川
    sichuan: 'https://etax.sichuan.chinatax.gov.cn',
    // 重庆
    chongqing: 'https://etax.chongqing.chinatax.gov.cn'
};

chrome.runtime.onMessage.addListener((request, sender) => {
    // 初始化 popup
    if (request.name === 'createTaskList') {
        chrome.action.setBadgeText({
            text: request.data.taskList.length.toString()
        });

        chrome.tabs.create({
            url: regionTypeUrlMap[request.data.regionType],
            active: true
        });
    }
    // 从 popup 发出的事件没有 sender.tab
    if (sender.tab) {
        target = {
            extensionId: chrome.runtime.id,
            tabId: sender.tab.id
        };
    }

    if (request.name === 'inputText') {
        inputText(request.data);
    }
    else if (request.name === 'click') {
        click(request);
    }
    else if (request.name === 'closeTab') {
        closeTab();
    }
    else if (request.name === 'setBadgeText') {
        setBadgeText(request.text);
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
            mouseReleased(data, () => {
                insertText(data, () => detach());
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
            detach();
        });
    });
}

/**
 * 关闭当前浏览器 tab
 */
function closeTab() {
    chrome.tabs.getCurrent(tab => {
        debugger
    });
}

/** 原子事件 **/
function attach(cb) {
    chrome.debugger.attach(target, '1.3', () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb && cb();
    });
}

function detach() {
    chrome.debugger.detach(target);
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
        cb && cb();
    });
}

function insertText(data, cb) {
    chrome.debugger.sendCommand(target, "Input.insertText", {
        text: data.text
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        cb && cb();
    });
}

function mouseReleased(data, cb) {
    chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: 'mouseReleased',
        // 输入框的坐标
        x: data.x,
        y: data.y
    }, () => {
        cb && cb();
    });
}

function setBadgeText(text) {
    chrome.action.setBadgeText({
        text: text
    });
}
