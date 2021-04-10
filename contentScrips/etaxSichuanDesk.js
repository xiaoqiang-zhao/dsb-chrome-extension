/**
 * @file 四川税务局 / 桌面(登录后的第一屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        $('.knowBtn').click();
    }, spaceTime);
    setTimeout(() => {
        $('.tabList').eq(1).click();
    }, spaceTime * 2);
    setTimeout(() => {
        const linkDom = $('[data-title="税费申报及缴纳"]');
        const link = linkDom.attr('data-url');
        window.location.href = 'https://etax.sichuan.chinatax.gov.cn/' + link;
    }, spaceTime * 3);
});
