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
## 参考链接
- [h5开发 连接蓝牙打印机 打印标签](https://www.cnblogs.com/pingfanren/p/11532854.html)
- [github BluetoothPrinter](https://github.com/qihang666/BluetoothPrinter)
- [csdn | h5 连接蓝牙打印机，打印条码，二维码](https://blog.csdn.net/u011298872/article/details/112695272)