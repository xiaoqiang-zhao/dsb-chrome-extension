/**
 * @file 四川税务局 / 桌面(登录后的第一屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        $('[tab-id="2050304"]').click();
    }, spaceTime);

    setTimeout(() => {
        const link = $('[data-id="82"]').attr('data-href');
        window.location.href = link;
    }, spaceTime * 2);
});
