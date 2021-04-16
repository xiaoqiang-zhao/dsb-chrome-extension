/**
 * @file 四川税务局 / 增值税小规模纳税人申报(登录后的第三屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    // 小规模纳税人
    setTimeout(() => {
        $('#mini-39 span').click();
    }, spaceTime * 3);

    setTimeout(() => {
        // $('#mini-40 .btn-blue').click();

        // const link = $('#mini-40 .btn-blue')[0];
        // chrome.runtime.sendMessage({
        //     name: 'click',
        //     x: getElementLeft(link) + 3,
        //     y: getElementTop(link) + 3
        // });
        // setTimeout(() => {
        //     chrome.runtime.sendMessage({
        //         name: 'click',
        //         x: 1,
        //         y: 1
        //     });
        // }, 300);
        $('#mini-40').remove();
        $('.mini-fixed').remove();
    }, spaceTime * 4);

    setTimeout(() => {
        // $('#001_12_6').val('101');
        $('.mini-tabs-header td').eq(3).click();
    }, spaceTime * 5);

    setTimeout(() => {
        $('.mini-tabs-header td').eq(5).click();
    }, spaceTime * 6);

    // setTimeout(() => {
    //     const input = $('#jm6 input')[0];

    //     chrome.runtime.sendMessage({
    //         name: 'inputText',
    //         text: '0001011705|SXA031900839|个人出租住房应按照5%的征收率减按1.5%计算应纳增值税|《财政部 国家税务总局关于全面推开营业税改征增值税试点的通知》 财税〔2016〕36号附件2第一条第（九）款第6项',
    //         x: getElementLeft(input) + 5,
    //         y: getElementTop(input) + 5
    //     });
    //     setTimeout(() => {
    //         chrome.runtime.sendMessage({
    //             name: 'click',
    //             x: 1,
    //             y: 1
    //         });
    //     }, 300);
    // }, spaceTime * 7);

    setTimeout(() => {
        // 保存
        // $('#sb_tempSaveCheck').click();
        
        // 申报
        // $('#sb_save').click();
        $('#sb_save')[0].click();

        // const btn = $('#sb_save')[0];
        // chrome.runtime.sendMessage({
        //     name: 'click',
        //     x: getElementLeft(btn) + 5,
        //     y: getElementTop(btn) + 5
        // });

        // $( "#sb_save" ).trigger( "click" );
        
        // $( "#btn-group" ).trigger( "click", {
        //     id: 'sb_save'
        // });
        // $( "#btn-group" ).trigger( "click", $( "#sb_save" )[0]);
        
    }, spaceTime * 8);

    // setTimeout(() => {

    // }, spaceTime * 8);

    
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
