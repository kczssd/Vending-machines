# 洛必答无人零售

用于微信小程序平台和h5的双端售货机程序

## 安装使用
下载后使用``yarn``安装

## 技术栈

> **taro、mockjs、ts、hox、less**

+ 开发框架：[taro](https://taro-docs.jd.com/taro/docs/README/index.html)
+ Mock：[Mockjs](http://mockjs.com)
+ 状态管理：[hox](https://github.com/umijs/hox)

## 项目结构

```tex
robbita
├── config                          // 配置文件夹
│   ├── dev.js
│   ├── index.js
│   └── prod.js
├── mock                            // mock文件夹
│   └── api.ts
├── src
│   ├── font                        // 图片字体
│   ├── img                         // 图片
│   ├── interface                   // 类型文件夹
│   ├── modules                     // 组件文件夹
│   │   └── goods                   // 列表页商品
│   ├── pages                       
│   │   ├── detail
│   │   └── index
│   ├── tools
│   │   ├── basicInfo.ts            // 机器号信息
│   │   ├── goods.ts                // 商品信息
│   │   ├── pay.ts                  // 支付接口
│   │   └── request.ts              // 请求接口
│   ├── app.config.ts
│   ├── app.less
│   ├── app.tsx
│   └── index.html
├── .editorconfig
├── .eslintrc.js
├── babel.config.js
├── global.d.ts
├── package.json
├── project.config.json
├── project.tt.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

+ 配置了两个全局变量一个API、一个WEAPI。要使用mock（``localhost:9999``）手动在``config/index``中切换。h5的代理在``config/dev``

中配置。其他相关页面和全局配置需要修改详见**taro**文档。

+ 列表页布局没有采用scrollView组件，主要是当时为了适配瀑布流式布局。后续可以更改。
+ radio和label当初是考虑到分类很多这么写的，在h5上适配不是很理想。建议后续修改。
+ less中语法可以优化，可以提变量出来。后续建议统一使用绝对单位书写。
+ 报错信息可以抽离。

