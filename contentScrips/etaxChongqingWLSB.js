/**
 * @file 重庆税务局 / 增值税
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;
let i = 1;

document.addEventListener('DOMContentLoaded', function() {

    // 关闭页面
    // setTimeout(() => {
    //     chrome.runtime.sendMessage({
    //         name: 'closeTab'
    //     });
    // }, spaceTime * i++);

    // 点击弹框 “点即报”快捷填表
    setTimeout(() => {
        $('.ui_buttons input').click();
    }, spaceTime * i++);

    // 双击左侧“增值税减免税申报明细表”
    setTimeout(() => {
        // const input = $('#FIELD_JSXZ_1')[0];
        // chrome.runtime.sendMessage({
        //     name: 'inputText',
        //     text: '《财政部 国家税务总局关于促进残疾人就业增值税政策的通知》 财税〔2016〕52号第一、三条',
        //     x: getElementLeft(input) + 5,
        //     y: getElementTop(input) + 5
        // });
        // var textFrame = document.getElementById('indexContent');
        // var text = (textFrame.contentDocument || textFrame.contentWindow.document).getElementById('datagrid-row-r2-2-3');
        // $(text).dblclick();
        // $(text).trigger('dblclick');
        // $(text).find('td').eq(1).trigger('dblclick');
        // $(text).click();
        // text.dbclick();

        let btn = $("#indexContent").contents().find("#datagrid-row-r2-2-3");
        let ev = new CustomEvent('dblclick', { bubbles: true, cancelable: true });
        btn.click();
        btn[0].dispatchEvent(ev);
    }, spaceTime * i++);

    i++;

    // 向“增值税减免税申报明细表”表中填入数据
    setTimeout(() => {
        const indexIframeContents = $("#indexContent").contents();
        const centerIframeContents = indexIframeContents.find('#BB_0102000003').contents();
        // 合计下的第一行 下拉选择输入 
        let inputC1 = centerIframeContents.find("#FIELD_JSXZ_1")[0];
        // 设置文本
        inputC1.value = '《财政部 国家税务总局关于促进残疾人就业增值税政策的通知》 财税〔2016〕52号第一、三条';
        // 设置对应的数字
        const trs = centerIframeContents.find("#PrintTwo tr");
        const inputC2 = trs.eq(4).find('td').eq(3).find('input');
        inputC2.eq(0).val(100);
    }, spaceTime * i++);

    // 保存逻辑
    setTimeout(() => {
        let btn = $("#indexContent").contents().find("#return_sb");
        btn.click();
    }, spaceTime * i++);

    // 弹框确定
    setTimeout(() => {
        $('.ui_state_focus .ui_state_highlight')[0].click()
    }, spaceTime * i++);

    // 关闭页面
    // setTimeout(() => {
    //     chrome.runtime.sendMessage({
    //         name: 'closeTab'
    //     });
    // }, spaceTime * i++);
});

/** 工具函数 **/
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
