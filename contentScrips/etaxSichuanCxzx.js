document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.fetch('https://etax.sichuan.chinatax.gov.cn/yhs-web/api/excel/down/fplb?fphm=&fpdm=&kprqq=2021-03-01&kprqz=2021-04-01&fplb=00&cxsf=00').then(async res => {
            // 向后端发请求

            let blob = await res.blob();

            const formData = new FormData();

            formData.append('file', blob);
            formData.append('bCompanyName', '');
            formData.append('companyName', '');

            // jin 进货方
            // gou 购货方
            window.fetch('http://127.0.0.1:7777/api/upload/jin', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
        });
    }, 3000);
});