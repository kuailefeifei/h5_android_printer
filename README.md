# h5_android_printer
 connect printer via bluetooth on android device
## 简介
该项目使用 h5 + javascript 语法，实现连接佳博蓝牙打印机打印字符串和二维码的功能，调用的 javascript 脚本主要包括 searchDevices.js, printer.js 和 utils.js。
## 文件介绍
- index.html 是静态文件，包含浏览器渲染的元素内容
- js 文件夹下使用的脚本文件主要包括
    - 寻找蓝牙设备的 searchDevices.js 文件
    - 负责打印字符串和二维码的 printer.js 文件
    - 可以在 web 页面生成二维码和填充相关元素的 utils.js 文件
- css 文件夹下的 style.css 文件负责定义文本样式
- 其余文件是使用 HBuilder 软件创建项目时自动生成的
## 如何使用 HBuilder 打包成 apk 文件
- 首先需要下载 HBuilder 应用，以及拥有一个 HBuilder 开发者账号 (登录网址 https://dev.dcloud.net.cn/)
- 在本地使用 HBuilder 创建一个项目，云端也会同步这个应用名称
- 在云端点击进入该应用，生成证书并将证书下载到本地
- 在 HBuilder 中配置 manifest 文件，需要用到证书的一些信息，都可以在云端获取到
- 在项目中完成所有代码的编写，然后可以选择 (运行 -> 运行到手机或模拟器) 进行测试
- 代码经过本地测试之后就可以打包了，选择 (发行 -> 原生 app 云打包)，完成整个项目的 app 打包过程
## 参考链接
- [h5开发 连接蓝牙打印机 打印标签](https://www.cnblogs.com/pingfanren/p/11532854.html)
- [github BluetoothPrinter](https://github.com/qihang666/BluetoothPrinter)
- [csdn | h5 连接蓝牙打印机，打印条码，二维码](https://blog.csdn.net/u011298872/article/details/112695272)
- [Programmer Sought](https://www.programmersought.com/article/22959803619/)
