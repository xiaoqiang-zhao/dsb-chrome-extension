/**
 * @file 四川税务局 / 税费申报及缴纳(登录后的第二屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    // 点击左侧菜单“企业所得税申报”
    // setTimeout(() => {
    //     $('[tab-id="2050304"]').click();
    // }, spaceTime);
    // // 点击中间内容区“居民企业（查账征收）企业所得税月（季） 度申报” 打开新页面
    // setTimeout(() => {
    //     const link = $('[data-id="82"]').attr('data-href');
    //     window.location.href = link;
    // }, spaceTime * 2);

    // 小规模纳税人
    setTimeout(() => {
        // $('[data-id="70"]').click();
        // const link = $('[data-id="70"]')[0];
        // $('[data-id="70"]').click();
        const link = $('[data-id="10101"]');
        const url = link.attr('data-href');
        window.open(url);
    }, spaceTime);

    // setTimeout(() => {

    // }, spaceTime);
});
