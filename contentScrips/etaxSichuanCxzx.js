/**
 * @file 四川税务局 / 取数
 */

document.addEventListener('DOMContentLoaded', function() {
    await sleep();

    const currentTaskData = await getCurrentTask();

    if (currentTaskData) {
        if (currentTaskData.taskType === '批量核对') {
            taskList.forEach((item, index) => {
                sendResponse(item, currentTaskData, index < 3 ? 0 : 1);
            });
        }
    }

    // 等待发送完成
    await sleep(10000);
});

function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
}

const startDate = new Date();
const startDateStr = `${startDate.getFullYear()}-${addZero(startDate.getMonth())}-${addZero(startDate.getDay())}`;
const endDate = new Date();
const endDateStr = `${endDate.getFullYear()}-${addZero(endDate.getMonth())}-${addZero(endDate.getDay())}`;

const taskList = [
    // 销货方，专票
    {
        url: `https://etax.sichuan.chinatax.gov.cn/yhs-web/api/excel/down/fplb?fphm=&fpdm=&kprqq=${startDateStr}&kprqz=${endDateStr}&fplb=00&cxsf=00`,
        billType: 1,
        taxType: 1
    },
    // 销货方，普票
    {
        url: `https://etax.sichuan.chinatax.gov.cn/yhs-web/api/excel/down/fplb?fphm=&fpdm=&kprqq=${startDateStr}&kprqz=${endDateStr}&fplb=01&cxsf=00`,
        billType: 1,
        taxType: 2
    },
    // 购货方，专票
    {
        url: `https://etax.sichuan.chinatax.gov.cn/yhs-web/api/excel/down/fplb?fphm=&fpdm=&kprqq=${startDateStr}&kprqz=${endDateStr}&fplb=00&cxsf=01`,
        billType: 2,
        taxType: 1
    },
    // 购货方，普票
    {
        url: `https://etax.sichuan.chinatax.gov.cn/yhs-web/api/excel/down/fplb?fphm=&fpdm=&kprqq=${startDateStr}&kprqz=${endDateStr}&fplb=01&cxsf=01`,
        billType: 2,
        taxType: 2
    }
];

function sendResponse(data, currentTaskData, isOver) {
    // const data = taskList[index];
    window.fetch(data.url).then(async res => {
        // 向后端发请求

        let blob = await res.blob();

        const formData = new FormData();

        formData.append('file', blob);
        formData.append('bName', currentTaskData.bName);
        formData.append('companyName', currentTaskData.companyName);
        formData.append('billType', data.billType);
        formData.append('taxType', data.taxType);
        formData.append('isOver', isOver);

        window.fetch('http://121.196.103.30:8080/api/hedui/excel2DB', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
    });
}
