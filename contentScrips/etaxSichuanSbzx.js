/**
 * @file 四川税务局 / 增值税小规模纳税人申报 附加税申报
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

document.addEventListener('DOMContentLoaded', async function() {
    // 小规模纳税人

    await sleep(spaceTime)

    const node = await getNode($('#table_001 .nsrsbh').eq(0), (node) => {
       return node.text()
    })

    console.log('开始')
    
    $('.mini-messagebox-buttons .mini-button')[0].click();

    await sleep(1000);

    $('#sb_save')[0].click();

    await sleep(500);

    $('.mini-panel-footer .mini-button')[0].click();

    await sleep(500);

    $('.mini-panel-footer .mini-button')[0].click();

    console.log('申报成功------')
});



// 工具函数
function sleep(time) {
    return new Promise((v) => setTimeout(() => v(), time))
}


// 检查dom是否存在
function getNode(node, fn, index = 0) {
    return new Promise((resolve, reject) => {

        if (index === 10) return reject('no node');
        setTimeout(() => {
            if(fn(node)) {
                resolve(node);
            }
            else {
               index++
               return getNode(node, fn, index);
            }
        }, 2000)
    })
}