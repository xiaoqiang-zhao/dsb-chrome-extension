# 代税宝浏览器插件

## 介绍

自动化报税，节省人力成本。RPA 机器人流程自动化。

## 需求描述

需要完成重亲与四川两地的自动报税，每个地区又分为一般纳税人和小规模纳税人两种，需要点击和填写。

重庆报税流程(图形验证码版)
https://www.kdocs.cn/l/csTmaFzWF5bt

四川报税流程(手机验证码版)
https://www.kdocs.cn/l/ceCgUVTmyzSi

## 设计思路

在平台侧 / 信息上传 页面准备好所需数据，数据示例:

```js
const data = {
    regionType: 2,
    list: [
        {
            // 公司名
            companyName: '重庆妍协臣科技有限公司',
            // 信用代码
            creditCode: '91500114MA60D4NB68',
            mobile: 'ranyong7307575',
            // 登录密码
            password: '75531682',
            // 小规模纳税人
            payTaxesTypeList: 0,
            // 小规模 - 增值税
            // 企业所得税
            businessIncomeTax: {
                // 报税进度 todo / doing / success / fail
                status: '',
                // 季初从业人数
                jobStart: 10,
                // 季末从业人数
                jobEnd: 12,
                // 季初资产总额
                propertyStart: 110,
                // 季末资产总额
                propertyEnd: 120,
                // 营业收入
                operatingIncome: 20000,
                // 营业成本
                operatingCosts: 15000,
                // 利润总额
                totalProfit: 5000,
                // 减：不征税收入
                subtract: 500
            }
        }
    ]
}
```

## 参考资料

[extensions mv3](https://developer.chrome.com/docs/extensions/mv3/)

[chromedevtools](https://chromedevtools.github.io/devtools-protocol/)
