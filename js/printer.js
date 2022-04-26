// 打印函数的入口
function printInterface(){
	var mac_address = document.getElementById("device_name").getAttribute("mac_address");
	var print_number = document.getElementById("printNumber").value;
	if (print_number < 1) {
		return;
	}
	for (var i=0; i < print_number; i++){
		print(mac_address);
		console.log(i);
	}
}


// 打印函数
function print(mac_address) {
    if (!mac_address) {
        mac_address = document.getElementById("device_name").getAttribute("mac_address");
    }

    main = plus.android.runtimeMainActivity();
    BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    UUID = plus.android.importClass("java.util.UUID");
    uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    BAdapter = BluetoothAdapter.getDefaultAdapter();
    device = BAdapter.getRemoteDevice(mac_address);
    plus.android.importClass(device);
    bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
    plus.android.importClass(bluetoothSocket);
    if (!bluetoothSocket.isConnected()) {
        console.log('检测到设备未连接，尝试连接....');
        bluetoothSocket.connect();
    }
    console.log('设备已连接');
    if (bluetoothSocket.isConnected()) {
        var info = document.getElementById("info").value;
        info_array = processInfo(info);
        printString(info_array);
        printQrcode(info);
        // printString();
        device = null; //这里关键
        bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误 
        console.log('debug');
    }
}


// 对于输入信息的简单处理
function processInfo(info){
    array = info.split('#');
    info_array = ["位置：", "颜色：", "日期："];
    for (var i=0; i<array.length; i++){
        info_array[i] += array[i];
    }
    return info_array;
}


// 打印字符串
function printString(info_array) {
    ff(1);
    var outputStream = bluetoothSocket.getOutputStream();
    plus.android.importClass(outputStream);
    outputStream.write([0x1B, 0x61, 0x01]); // 居中打印
	outputStream.write([0x1B, 0x45, 0x01]); // 加粗打印
	// outputStream.write([0x1D, 0x21, 0x02]); // 字体放大2倍
    for (var i=0; i<info_array.length; i++){
        outputStream.write(plus.android.invoke("\n"+info_array[i]+"\n", "getBytes", "gbk"));
    }
    outputStream.flush();
    ff(2);
}


// 初始化打印机
function initPrinter() {

	console.log('Print initialization start');
	var outputStream = bluetoothSocket.getOutputStream();
    plus.android.importClass(outputStream);
    outputStream.write([0x1B, 0x40]);
	outputStream.flush();
	console.log('Print initialization end');
}


// 走纸
function ff(n) {

	// bluetoothSocket.close();
	if (!bluetoothSocket.isConnected()) {
		console.log('Disconnected, you need to reconnect, connect');
		bluetoothSocket.connect();
	}

	if (bluetoothSocket.isConnected()) {
		console.log('connection succeeded');
		//initPrinter();
		const line = n || 1;
		var outputStream = bluetoothSocket.getOutputStream();
		plus.android.importClass(outputStream);
        outputStream.write([0x1B, 0x64, line]);
		outputStream.flush();
	}

}


// 打印二维码
/**
   * @Description: QR code print
 * @Author: EricLee
 * @Date: 2020-10-15 15:16:10
   * @Param: bytestr {string} The content you want to print
 * @Return: void
 */
function printQrcode(byteStr) {

	// init
    initPrinter();
	console.log(byteStr);
	var moduleSize = 8;
	var bytes = plus.android.invoke(byteStr, 'getBytes', 'gbk');
	var length = bytes.length;
	outputStream = bluetoothSocket.getOutputStream();
	plus.android.importClass(outputStream);
	OutputStreamWriter = plus.android.importClass('java.io.OutputStreamWriter');
	writer = new OutputStreamWriter(outputStream, 'GBK');
	plus.android.importClass(writer);
	console.log(length);
    //adjust position
    writer.write(0x1B);
    writer.write(0x61);
    writer.write(0x01);

	// Cache QR code data
	writer.write(0x1D); // init
	writer.write('(k'); // adjust height of barcode
	writer.write(length + 3); // pl
	writer.write(0); // ph
	writer.write(49); // cn
	writer.write(80); // fn
	writer.write(48); //
	writer.write(byteStr);
	// QR code error correction level
	writer.write(0x1D);
	writer.write('(k');
	writer.write(3);
	writer.write(0);
	writer.write(49);
	writer.write(69);
	writer.write(48);
	// Set the QR code block size
	writer.write(0x1D);
	writer.write('(k');
	writer.write(3);
	writer.write(0);
	writer.write(20); // 通过这个参数可以调节二维码的大小
	writer.write(67);
	writer.write(moduleSize);
	// Print the cached data QR code
	writer.write(0x1D);
	writer.write('(k');
	writer.write(3); // pl
	writer.write(0); // ph
	writer.write(49); // cn
	writer.write(81); // fn
	writer.write(48); // m

	writer.flush();
	// QR code printing end
	ff(4);
	console.log('print Qrcode');
}
