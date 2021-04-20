/**
 * @file 重庆税务局 / 企业所得税报销
 */
// 间隔时间 800 毫秒
const spaceTime = 2000;
let i = 1;

document.addEventListener('DOMContentLoaded', function() {
    // 如果有弹框点“确认”
    setTimeout(() => {
        const btn = $('#mini-183 span');
        if (btn.length > 0) {
            btn.click();
        }
    }, spaceTime * ++i);

    // 根据《财政部 税务总局关于支持新型冠状病毒感染的肺炎疫情防控有关捐赠税收政策的公告》
    setTimeout(() => {
        const btn = $('#mini-185 span');
        if (btn.length > 0) {
            btn.click();
        }
    }, spaceTime * ++i);

    // 为第一个 tab 填数
    setTimeout(() => {
        chrome.storage.sync.get('taskData', ({
            taskData
        }) => {
            // taskData[0].businessIncomeTax
            // 企业所得税
            const businessIncomeTax = {
                // 季初从业人数
                jobStart: 10,
                // 季末从业人数
                jobEnd: 12,
                // 季初资产总额
                propertyStart: 110,
                // 季末资产总额
                propertyEnd: 120,
                // 营业收入
                operatingIncome: 20000,
                // 营业成本
                operatingCosts: 15000,
                // 利润总额
                totalProfit: 5000,
                // 减：不征税收入
                subtract: 500,

                // XXXX 三个弹框的数据

            };
            // 项目，从业人数 + 总资产
            $('#001_9_1').val(businessIncomeTax.jobStart);
            $('#001_9_2').val(businessIncomeTax.jobStart);
            $('#001_10_1').val(businessIncomeTax.propertyStart);
            $('#001_10_2').val(businessIncomeTax.propertyEnd);

            // 选中 "国家限制或禁止行业" 否
            // $('#gjxzhjzhy input[value="N"]').attr('checked', '');
            
            // const checketbox = $('#gjxzhjzhy input[value="N"]')[0];
            // chrome.runtime.sendMessage({
            //     name: 'click',
            //     x: getElementLeft(checketbox) + 3,
            //     y: getElementTop(checketbox) + 3
            // });

            // 预缴税款计算
            $('#001_14_5').val(businessIncomeTax.operatingIncome);
            $('#001_15_5').val(businessIncomeTax.operatingCosts);
            $('#001_16_5').val(businessIncomeTax.totalProfit);
            $('#001_18_5').val(businessIncomeTax.subtract);
        });
    }, spaceTime * ++i);

    // 选中 "国家限制或禁止行业" 否
    setTimeout(() => {
        $('#gjxzhjzhy .mini-checkboxlist-item').eq(1).find('input')[0].click();
    }, spaceTime * ++i);

    // 打开  第一个 Tab 的 第一个弹框
    setTimeout(() => {
        // const btns = $('.txt-indent-2 span');
        $('.txt-indent-2 span')[0].click();
    }, spaceTime * ++i);

    // 选中操作(checkbox)
    setTimeout(() => {
        const checketbox = $('#mini-grid-table-bodyjmGrid_7 tr').eq(2).find('input')[0];
        let ev = new CustomEvent('mousedown', {
            bubbles: true,
            cancelable: true
        });
        checketbox.dispatchEvent(ev);
        checketbox.click();

    }, spaceTime * ++i);

    // 选中后点击单元格
    setTimeout(() => {
        // mini-grid-groupRow
        let ev = new CustomEvent('mousedown', {
            bubbles: true,
            cancelable: true
        });
        // const blurEvent = new CustomEvent('focusout', {
        //     bubbles: true,
        //     cancelable: true
        // });
        $('#mini-grid-table-bodyjmGrid_7').find('tr').eq(2).find('td')[4].dispatchEvent(ev);
        $('#mini-grid-table-bodyjmGrid_7').find('tr').eq(2).find('td')[4].click();

        $('.mini-grid-editwrap input').eq(0).val(300)[0];

    }, spaceTime * ++i);

    // 向单元格中填数，然后失去焦点
    setTimeout(() => {
        chrome.runtime.sendMessage({
            name: 'click',
            x: 0,
            y: 0
        });
        // $('.mini-grid-editwrap .mini-textbox-input').val(200);
    }, spaceTime * ++i);

    // 点击保存
    setTimeout(() => {
        $('#jmWin_7 .btn-blue')[0].click();
    }, spaceTime * ++i);

    // 打开  第一个 Tab 的 第二个弹框
    setTimeout(() => {
        // const btns = $('.txt-indent-2 span');
        $('.txt-indent-2 span')[1].click();
    }, spaceTime * ++i);

    // 选中操作(checkbox)
    setTimeout(() => {
        const checketbox = $('#mini-grid-table-bodyjmGrid_8 tr').eq(1).find('input')[0];
        let ev = new CustomEvent('mousedown', {
            bubbles: true,
            cancelable: true
        });
        checketbox.dispatchEvent(ev);
        checketbox.click();

    }, spaceTime * ++i);

    // 选中后点击单元格
    setTimeout(() => {
        // mini-grid-groupRow
        let ev = new CustomEvent('mousedown', {
            bubbles: true,
            cancelable: true
        });
        // const blurEvent = new CustomEvent('focusout', {
        //     bubbles: true,
        //     cancelable: true
        // });
        $('#mini-grid-table-bodyjmGrid_8').find('tr').eq(1).find('td')[4].dispatchEvent(ev);
        $('#mini-grid-table-bodyjmGrid_8').find('tr').eq(1).find('td')[4].click();

        $('.mini-grid-editwrap input').eq(0).val(300)[0];

    }, spaceTime * ++i);

    // 向单元格中填数，然后失去焦点
    setTimeout(() => {
        chrome.runtime.sendMessage({
            name: 'click',
            x: 0,
            y: 0
        });
        // $('.mini-grid-editwrap .mini-textbox-input').val(200);
    }, spaceTime * ++i);

    // 点击保存
    setTimeout(() => {
        $('#jmWin_8 .btn-blue')[0].click();
    }, spaceTime * ++i);

     // 打开  第一个 Tab 的 第三个弹框
     setTimeout(() => {
        // const btns = $('.txt-indent-2 span');
        $('.txt-indent-2 span')[2].click();
    }, spaceTime * ++i);

    // 点击保存
    setTimeout(() => {
        $('#jmWin_13 .btn-blue')[0].click();
    }, spaceTime * ++i);

    // 切换到第二个 tab
    setTimeout(() => {
        $('.mini-tabs-header td').eq(3).click();
    }, spaceTime * ++i);

    // 下拉框选值
    setTimeout(() => {
        // 用事件模拟
        const input = $('#yh_1 input')[0];
        chrome.runtime.sendMessage({
            name: 'inputText',
            text: '其他行业研发设备加速折旧',
            x: getElementLeft(input) + 5,
            y: getElementTop(input) + 5
        });
        setTimeout(() => {
            chrome.runtime.sendMessage({
                name: 'click',
                x: 1,
                y: 1
            });
        }, 400);
    }, spaceTime * ++i);

    setTimeout(() => {
        $('#003_5_3').val(1);
        $('#003_5_4').val(1);
        $('#003_5_5').val(1);
        $('#003_5_6').val(1);
        $('#003_5_7').val(1);
    }, spaceTime * ++i);

    // 下拉框选值
    setTimeout(() => {
        // 用事件模拟
        const input = $('#yh_5 input')[0];
        chrome.runtime.sendMessage({
            name: 'inputText',
            text: '500万元以下设备器具一次性扣除',
            x: getElementLeft(input) + 5,
            y: getElementTop(input) + 5
        });
        setTimeout(() => {
            chrome.runtime.sendMessage({
                name: 'click',
                x: 1,
                y: 1
            });
        }, 400);
    }, spaceTime * ++i);

    setTimeout(() => {
        $('#003_10_3').val(2);
        $('#003_10_4').val(2);
        $('#003_10_5').val(2);
        $('#003_10_6').val(2);
        $('#003_10_7').val(2);
    }, spaceTime * ++i);

    // 切换到第三个 tab
    setTimeout(() => {
        $('.mini-tabs-header td').eq(5).click();
    }, spaceTime * ++i);

    
    // 点击申报
    setTimeout(() => {
        $('#sb_save')[0].click();
    }, spaceTime * ++i);

    setTimeout(() => {
        $('#mini-191').click();
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
