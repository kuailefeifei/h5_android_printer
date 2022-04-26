/*
该函数的作用是在 h5 页面生成二维码，
并且填充一些必要的元素
*/
function makeCode() //生成二维码
{	
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 100,
        height: 100
    });
	if($('#info').val() === ''){
             $(this).text('原始条码不能为空!');
		     $("#info").focus(); //清空并获得焦点
             }
	var kwtiaoma=$("#info").val();
	var strs=kwtiaoma.split("#");
	//alert(strs[0]);
	var position=$("#position");//根据文本框的id找到这个文本框，并将其变成jquery对象
    position.text(strs[0]);
	var color=$("#color");//根据文本框的id找到这个文本框，并将其变成jquery对象
    color.text(strs[1]);
	var date=$("#date");//根据文本框的id找到这个文本框，并将其变成jquery对象
    date.text(strs[2]);
	var bh = document.getElementById("info").value;
    qrcode.makeCode(bh);
}
