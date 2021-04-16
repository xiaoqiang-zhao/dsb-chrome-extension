/**
 * @file 重庆税务局 / 企业所得税报销
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const btn = $('#mini-183 span');
        if (btn.length > 0) {
            btn.click();
        }
        setTimeout(() => {
            const btn = $('#mini-185 span');
            if (btn.length > 0) {
                btn.click();
            }
            // spaceTime 2
        }, spaceTime);
    // spaceTime 1
    }, spaceTime);

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
                    subtract: 500
                };
                // 项目，从业人数 + 总资产
                $('#001_9_1').val(businessIncomeTax.jobStart);
                $('#001_9_2').val(businessIncomeTax.jobStart);
                $('#001_10_1').val(businessIncomeTax.propertyStart);
                $('#001_10_2').val(businessIncomeTax.propertyEnd);

                // 选中 "国家限制或禁止行业" 否
                $('#gjxzhjzhy input[value="N"]').attr('checked', '');

                // 预缴税款计算
                $('#001_14_5').val(businessIncomeTax.operatingIncome);
                $('#001_15_5').val(businessIncomeTax.operatingCosts);
                $('#001_16_5').val(businessIncomeTax.totalProfit);
                $('#001_18_5').val(businessIncomeTax.subtract);
            
        });
    }, spaceTime * 3);
    
    // 打开  第一个 Tab 的 第一个弹框
    setTimeout(() => {
        const btns = $('.txt-indent-2 span');
        btns.eq(0).click();
    }, spaceTime * 4);
    // 选中操作
    setTimeout(() => {
        // $('#mini-grid-table-bodyjmGrid_7 tr').eq(2).find('input').prop('checked', true);
        // $('#mini-grid-table-bodyjmGrid_7 tr').eq(2).find('input').attr('checked', '');
        const checketbox = $('#mini-grid-table-bodyjmGrid_7 tr').eq(2).find('input');
        chrome.runtime.sendMessage({
            name: 'click',
            x: getElementLeft(checketbox) + 3,
            y: getElementTop(checketbox) + 3
        });
    }, spaceTime * 5);
    // 点击保存
    setTimeout(() => {
        $('#jmWin_7 .btn-blue').click();
    }, spaceTime * 6);

    // 打开  第一个 Tab 的 第二个弹框 ...

    // 切换到第二个 tab
    // setTimeout(() => {
    //     $('.mini-tabs-header td').eq(3).click();
    //     // $('#yh_1 input').eq(0).val('其他行业研发设备加速折旧');
    //     setTimeout(() => {
    //         // 点击下拉框，发现第一次没办法触发
    //         // $('#yh_1 .mini-buttonedit-button').click();
    //         // $('#mini-55 tr').eq(1).click();

    //         // 尝试直接输入 “其他行业研发设备加速折旧”
    //         // 直接用赋值的方式触发不了后面可输入事件
    //         // $('#yh_1 input').val('其他行业研发设备加速折旧');

    //         // 用事件模拟
    //         const input = $('#yh_1 input')[0];
    //         chrome.runtime.sendMessage({
    //             name: 'inputText',
    //             text: '其他行业研发设备加速折旧',
    //             x: getElementLeft(input) + 5,
    //             y: getElementTop(input) + 5
    //         });
    //     }, 200);
    //     setTimeout(() => {
    //         chrome.runtime.sendMessage({
    //             name: 'click',
    //             x: 1,
    //             y: 1
    //         });
    //     }, 400);
    // }, spaceTime * 1);
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
