/**
 * @file 四川税务局 / 桌面(登录后的第一屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    // 点击左侧菜单“企业所得税申报”
    setTimeout(() => {
        $('[tab-id="2050304"]').click();
    }, spaceTime);
    // 点击中间内容区“居民企业（查账征收）企业所得税月（季） 度申报” 打开新页面
    setTimeout(() => {
        const link = $('[data-id="82"]').attr('data-href');
        window.location.href = link;
    }, spaceTime * 2);
});
