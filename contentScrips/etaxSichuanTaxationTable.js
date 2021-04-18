/**
 * @file 四川税务局 / 增值税小规模纳税人申报 税种列表页
 */
// 间隔时间 800 毫秒
const spaceTime = 3000;

const tableIndex = [2, 3, 4, 1];

// 加载index
let nowTableIndex = 0;

// mock数据
const data = {
    //农业
    agriculturalProductsTaxation: {
        count: 12,
        price: 24,
        taxAmount: 241
    },
    // 不动产
    realEstate: {
        count: 13,
        price: 21,
        taxAmount: 2411
    },
    // 旅客运输
    passengerTransportation: {
        count: 112,
        price: 222,
        taxAmount: 2414
    },
    // 红色票
    redInkInvoice: {
        taxAmount: 0
    },
};

// 表格3 id集合
const ids = [
    {
        key: 'agriculturalProductsTaxation',
        ids: {
            count: '003_11_3',
            price: '003_11_4',
            taxAmount: '003_11_5'
        }
    },
    {
        key: 'realEstate',
        ids: {
            count: '003_15_3',
            price: '003_15_4',
            taxAmount: '003_15_5'
        }
    },
    {
        key: 'passengerTransportation',
        ids: {
            count: '003_16_3',
            price: '003_16_4',
            taxAmount: '003_16_5'
        }
    },
    {
        key: 'redInkInvoice',
        ids: {
            taxAmount: '003_28_3'
        }
    },
]

document.addEventListener('DOMContentLoaded', async function () {
    // 小规模纳税人

    await sleep(spaceTime)
    // 关闭弹层
    $("#closeZcTip").click();

    const trs = $('#content-table').find('tr');

    // 检查列表数据是否加载完成
    await getNode(trs.eq(0).find('td').eq(2), (node) => node.text())


    //执行自动填表流程
    const fn = async () => {
        await editTable(tableIndex[nowTableIndex], trs);
        if (nowTableIndex < tableIndex.length - 1) {
            nowTableIndex++;
            fn();
        } else {

            // 填写完成了

            await sleep(1000);

            $('#sb_save')[0].click();

            await sleep(500);

            let popupCount = 5;
            const popup = async () => {
                let popupContentNode = $('.mini-messagebox-content-text');

                let popupContent = popupContentNode.text()
                console.log(popupContent, $(".mini-panel-title").text())


                if (popupContent === '发票数据比对中，请稍后...') {
                    await sleep(2000);
                }
                if ($(".mini-panel-title").text() === '一窗式比对结果') {
                    // 等待比对结果返回
                    console.log('**等待比对结果返回**');
                    const errList = [];
                    // 检查是否有不通过的字段
                    const errs = $(".ycsbdjgList .txt-red");

                    errs.each(function () {
                        errList.push(errs.parent().prev().text())
                    })

                    if (errs.length) {
                        console.error('**申报数据有错误**', errList);
                    }

                    return;
                }

                if (!popupContentNode.html()) {
                    return;
                }

                const cancel = $('.mini-panel-footer .mini-button').eq(1);
                // 没有取消，直接点确定
                if (cancel.css('display') !== 'none' && cancel.find('span').text() === '取消') {
                    $('.mini-panel-footer .mini-button').eq(0)[0].click();
                    await sleep(1000);
                    if (popupCount >= 0) {
                        popup();
                        popupCount--;
                    }
                } else {
                    throw `申报错误，请检查数据。。。。。。`
                }
            }

            popup();
        }
    }

    fn();
});


// 自动打开表单、填写表单
async function editTable(index, trs) {
    // 打开表单
    const btn2 = openTaxation(index, trs);

    console.log('打开表单', btn2);

    btn2[0].click();

    await sleep(spaceTime);

    const iframe = $(".mini-panel-body").eq(0).find('iframe').eq(0).contents();

    console.log('表', index, '-开始打开表格弹窗',);
    // 确保弹窗数据加载完成
    await getNode(index === 1 ? iframe.find('.nsrsbh').eq(0) : iframe.find('.nsrmc').eq(0), (node) => node.text())
    console.log('表', index, '-展示数据');

    await sleep(200);

    // 填写第三个表
    if (index === 3) {

        let ev = new CustomEvent('blur', { bubbles: true, cancelable: true });

        ids.forEach(async (v) => {
            await sleep(50);
            const nowData = data[v.key];
            Object.keys(v.ids).forEach(async v2 => {

                await sleep(50);

                // 写入数据
                iframe.find(`#${v.ids[v2]}`).val(nowData[v2])[0].dispatchEvent(ev);
            })
        });
        await sleep(10 * 50 + 100);

    }

    // 保存
    iframe.find('#sb_save')[0].click();

    await sleep(200);

    const text = iframe.find('.mini-messagebox-content-text').eq(0).text();


    if (!/保存成功/.test(iframe.find('.mini-messagebox-content-text').eq(0).text())) {
        //   throw `表${index} 保存错误，请检查数据`
        const cancel = iframe.find('.mini-panel-footer .mini-button').eq(1);
        if (cancel.css('display') !== 'none' && cancel.find('span').text() === '取消') {
            iframe.find('.mini-panel-footer .mini-button')[0].click();
        } else {
            throw `表${index} 保存错误，请检查数据`
        }
    }

    if (/保存中，请稍后/.test(iframe.find('.mini-messagebox-content-text').eq(0).text())) {
        await sleep(300);
    }

    await sleep(200);
    // 关闭保存弹窗
    iframe.find('.mini-panel-footer .mini-button')[0].click();
    await sleep(2000);
}

// 获取第几个税务的填写 或者 重填
function openTaxation(index) {
    const trs = $('#content-table').find('tr');
    const btns = trs.eq(index).find('td').eq(2).find('.btn[data-type]');
    let btnIndex = 0;

    console.log(btns.eq(0), btns.eq(0).css('display'));
    if (btns.eq(0).css('display') === 'none') {
        btnIndex = 1;
    }
    return btns.eq(btnIndex);
}



function sleep(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time))
}


function getNode(node, fn, index = 0) {
    return new Promise((resolve, reject) => {

        if (index === 15) return reject('no node');
        setTimeout(() => {
            if (fn(node)) {
                resolve(node);
            }
            else {
                index++
                return getNode(node, fn, index);
            }
        }, 2000)
    })
}