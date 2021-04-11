/**
 * @file 重庆税务局 / 桌面(登录后的第一屏)
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', function() {
    // 展示 “我要办税” Tab 下的图标内容
    setTimeout(() => {
        $('#wdxx').removeClass('active');
        $('#wybs').addClass('active');
    }, spaceTime);

    setTimeout(() => {
        $('#wybs .wybs_line .wybs_list').eq(2).mouseover(); // .children('.tc_xxbg').css('display', 'block');
    }, spaceTime * 2);

    setTimeout(() => {

        $.ajax({
            type: 'post',
            data: 'postData={"fqxdm":"112005","ctrl":"WBLoginCtrl_queryYhQxTree"}',
            url: 'ajax.sword?ctrl=WBLoginCtrl_queryYhQxTree',
            dataType: "json",
            success(resData) {
                const data = JSON.parse(resData.data[0].value)[7];
    
                $.ajax({
                    type: 'post',
                    data: {"url": 'null', "wbxtDm": data.wbxtDm, "qxDm" : data.qxDm},
                    url: '/download.sword?ctrl=LogindesCtrl_queryKeyValue',
                    dataType: "json",
                    success (resData) {
                        const keyValue = resData.key;
                        let reUrl = resData.reUrl;
                        const param = "cssParam=" + encodeURIComponent(keyValue) + "&xtBz=WSBS&wbxtDm=" + data.wbxtDm + "&";
                        reUrl += "&" + param + "r=" + Math.random();
    
                        const h1 = screen.availHeight - 40;
                        const w1 = screen.availWidth;
    
                        window.open(decodeURI(reUrl), "", "height=" + h1 + ",width=" + w1 + ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
                    }
                });
            }
        });
    }, spaceTime * 3);

    // setTimeout(() => {
    //     const linkDom = $('[data-title="税费申报及缴纳"]');
    //     const link = linkDom.attr('data-url');
    //     window.location.href = 'https://etax.sichuan.chinatax.gov.cn/' + link;
    // }, spaceTime * 3);
});
