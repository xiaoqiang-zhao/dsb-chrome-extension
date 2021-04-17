/**
 * @file 重庆税务局 / 增值税
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;
let i = 1;

document.addEventListener('DOMContentLoaded', function() {

    // 点击弹框 “点即报”快捷填表
    setTimeout(() => {
        $('.ui_buttons input').click();
    }, spaceTime * i++);

    // 双击第四张表  卡点
    // setTimeout(() => {
    //     $('#datagrid-row-r2-2-3 [field="BB_MC"]').dblclick();
    // }, spaceTime * i++);

    // 
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
        let ev = new CustomEvent('dblclick', { bubbles: true, cancelable: true })
        btn.click();
        btn[0].dispatchEvent(ev);
    }, spaceTime * i++);
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
