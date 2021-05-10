/**
 * @file 四川税务局 / 桌面(登录后的第一屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', async function() {
    // 关闭弹框
    await listion();
    

    // 点击“我要办税”Tab
    // setTimeout(() => {
    //     $('.tabList').eq(1).click();
    // }, spaceTime * 2);
    // // 点击“税费申报及缴纳”跳转页面
    // setTimeout(() => {
    //     const linkDom = $('[data-title="税费申报及缴纳"]');
    //     const link = linkDom.attr('data-url');
    //     window.location.replace('https://etax.sichuan.chinatax.gov.cn' + link);
    // }, spaceTime * 3);
});

async function listion() {
    await sleep();
    const btn = $('.knowBtn');
    btn.each((index, element) => {
        if (element.innerText === '关闭') {
            element.click();
        }
    });
}