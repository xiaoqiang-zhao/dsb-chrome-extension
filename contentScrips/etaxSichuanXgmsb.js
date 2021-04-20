/**
 * @file 四川税务局 / 增值税小规模纳税人申报(登录后的第三屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;
let i = 0;

document.addEventListener('DOMContentLoaded', function() {
    // 点击“确定按钮，文字: ”系统检测到您上次填写了申报表，点击确定还原上次填写的数据，点击取消重新填写申报表！
    setTimeout(() => {
        $('#mini-39 span').click();
    }, spaceTime * ++i);

    // ????????
    setTimeout(() => {
        $('#mini-40').remove();
        $('.mini-fixed').remove();
    }, spaceTime * ++i);

    // 贴换到第二个 tab
    setTimeout(() => {
        $('.mini-tabs-header td').eq(3).click();
    }, spaceTime * ++i);

    // 贴换到第三个 tab
    setTimeout(() => {
        $('.mini-tabs-header td').eq(5).click();
    }, spaceTime * ++i);

    setTimeout(() => {
        // 保存
        // $('#sb_tempSaveCheck').click();

        // 申报
        // $('#sb_save').click();
        $('#sb_save')[0].click();
    }, spaceTime * ++i);

    // 非必走流程: 您在申报表第2栏或第5栏填有数据 （点击弹框“确认”）
    setTimeout(() => {
        $('#mini-41 #mini-42')[0].click();
        // 需要对外发消息 ***
    }, spaceTime * ++i);

    // 非必走流程: 按照现行政策规定，小规模纳税人发生增值税应税销售行为，合计月销售额超过10万元（按季10万元） （点击弹框“否”）
    setTimeout(() => {
        $('#mini-46')[0].click();
    }, spaceTime * ++i);

    // 非必走流程: 本期销售额已超免税标准，请继续申报 （点击弹框“确认”）
    setTimeout(() => {
        $('#mini-48')[0].click();
    }, spaceTime * ++i);

    // 非必走流程: 确认提交您所申报的数据?，请继续申报 （点击弹框“确认”）
    setTimeout(() => {
        $('#mini-50')[0].click();
    }, spaceTime * ++i);

    // 非必走流程: 您为定期定额户，请到“定期定额自行申报”模块申报附加税。（点击弹框“确认”）
    setTimeout(() => {
        $('#mini-53')[0].click();
    }, spaceTime * ++i);
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
