/**
 * 重庆税务局 / (一般纳税人)增值税 - 表格填写页
 */

 document.addEventListener('DOMContentLoaded', async function() {
    // 等该页面加载完成
    await sleep();

    // 无任务可做
    const currentTaskData = await getCurrentTask();
    if (!currentTaskData) {
        return;
    }

    await sleep();
    const iframe = $("#indexContent").contents().find('#now_TTAXPZZL_Banben').contents().find('#BB_0101000011').contents();
    // 表2： 本期进项税额
    currentTaskData.businessData
    // 农产品收购发票或者销售发票
    iframe.find('#FIELD_0101000002_6_1').val(currentTaskData.businessData.agriculturalProductsCopies); // 份数
    iframe.find('#FIELD_0101000002_6_2').val(currentTaskData.businessData.agriculturalProductsMoney); // 金额
    iframe.find('#FIELD_0101000002_6_3').val(currentTaskData.businessData.agriculturalProductsTax); // 税额
    // 本期用于购建不动产的扣税凭证
    iframe.find('#FIELD_0101000002_9_1').val(currentTaskData.businessData.realEstateCopies); // 份数
    iframe.find('#FIELD_0101000002_9_2').val(currentTaskData.businessData.realEstateMoney); // 金额
    iframe.find('#FIELD_0101000002_9_3').val(currentTaskData.businessData.realEstateTax); // 税额
    // 本期用于抵扣的旅客运输服务扣税凭证
    iframe.find('#FIELD_0101000002_10_1').val(currentTaskData.businessData.passengerTransportationCopies); // 份数
    iframe.find('#FIELD_0101000002_10_2').val(currentTaskData.businessData.passengerTransportationMoney); // 金额
    iframe.find('#FIELD_0101000002_10_3').val(currentTaskData.businessData.passengerTransportationTax); // 税额
    // 红字专用发票信息表注明的进项税额
    iframe.find('#FIELD_0101000002_20_3').val(currentTaskData.businessData.redCross);
    
    await sleep(300);

    // 点击保存按钮
    iframe.find('#return_save')[0].click();
});