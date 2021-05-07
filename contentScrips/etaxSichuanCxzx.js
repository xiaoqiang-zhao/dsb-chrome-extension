/**
 * @file 四川税务局 / 取数
 */

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // window.fetch('https://etax.sichuan.chinatax.gov.cn/yhs-web/api/excel/down/fplb?fphm=&fpdm=&kprqq=2021-03-01&kprqz=2021-04-01&fplb=00&cxsf=00').then(async res => {
        //     // 向后端发请求

        //     let blob = await res.blob();

        //     const formData = new FormData();

        //     formData.append('file', blob);
        //     formData.append('bName', '');
        //     formData.append('billType', 1);
        //     formData.append('taxType', 1);

        //     window.fetch('http://127.0.0.1:7777/api/upload/jin', {
        //         method: 'POST',
        //         mode: 'no-cors',
        //         body: formData
        //     });
        // });
        sendResponse(0);
    }, 3000);
});

const startDate = new Date();
const startDateStr = `${startDate.getFullYear()}-${addZero(startDate.getMonth())}-${addZero(startDate.getDay())}`;
const endDate = new Date();
const endDateStr = `${endDate.getFullYear()}-${addZero(endDate.getMonth())}-${addZero(endDate.getDay())}`;

function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
}

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

function sendResponse(index) {
    const data = taskList[index];
    window.fetch(data.url).then(async res => {
        // 向后端发请求

        let blob = await res.blob();

        const formData = new FormData();

        formData.append('file', blob);
        formData.append('bName', '');
        formData.append('billType', data.billType);
        formData.append('taxType', data.taxType);
        if (index === 3) {
            formData.append('isOver', 1);
        }

        window.fetch('http://127.0.0.1:8080/userinfo_encrypt_service_war_exploded/api/hedui/excel2DB', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        if (index < 4) {
            sendResponse(index + 1);
        }
    });
}