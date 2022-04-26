// address="" 搜索蓝牙  //address=设备mac地址 自动配对给出mac地址的设备
function searchDevices(address){
    // 注册类
    var main = plus.android.runtimeMainActivity();
    var IntentFilter = plus.android.importClass('android.content.IntentFilter');
    var BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter');
    var BluetoothDevice = plus.android.importClass('android.bluetooth.BluetoothDevice');
    var BAdapter = BluetoothAdapter.getDefaultAdapter();
    console.log('开始搜索设备');
    var filter = new IntentFilter();
    var bdevice = new BluetoothDevice();
    var un = null;
    var paired_vlist = document.getElementById('selectedDevice'); // 注册容器用来显示配对设备
    paired_vlist.innerHTML = ''; // 清空容器
    var button1 = document.getElementById('searchButton');
    button1.value = '正在搜索请稍候';
    button1.disabled = true;
    BAdapter.startDiscovery();
    var receiver;
    receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
        onReceive: function(context, intent){// 实现 onReceiver 回调函数
            plus.android.importClass(intent); // 通过 intent 实例引入 intent 类，方便以后的 '.' 操作
            console.log(intent.getAction()); // 获取 action
            if (intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED"){
                main.unregisterReceiver(receiver); // 取消监听
                button1.disabled = false;
                button1.value = "搜索打印设备";
                console.log("搜索结束");
            } 
            else {
                BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                if (BleDevice.getBondState() != bdevice.BOND_NONE){
                    if(BleDevice.getName() != un ){ //判断防止重复添加
                        console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());  
                        var li2 = document.createElement('li'); //注册  
                        un = BleDevice.getName();                 
                        li2.innerText = un;
                        li2.setAttribute('id', BleDevice.getAddress()); //打印机mac地址  
                        li2.setAttribute('onclick', 'registerDevice(innerText, id)'); //注册click点击列表进行打印  
                        paired_vlist.appendChild(li2);
                    }  
                }
            }
        }
    });

    filter.addAction(bdevice.ACTION_FOUND);
    filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
    filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
    filter.addAction(BAdapter.ACTION_STATE_CHANGED);

    main.registerReceiver(receiver, filter); // 注册监听
}


function registerDevice(text, id_name){
    mui.plusReady(function() {
        plus.nativeUI.confirm('是否选择此打印设备？',function(e){
            if(e.index===0){
                var device = document.getElementById("device_name");
                device.value = text;
                device.setAttribute("mac_address", id_name);
            }
        });
    });
}
 