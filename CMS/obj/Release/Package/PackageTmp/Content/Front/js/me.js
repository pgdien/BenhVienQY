$(function(){
	$('#fbutton').click(function() {
		$('#pic').click();
		//$('input[type=file]').click();
   		return false;
	});
	
	$(".microformat").hover(function(){
	  $(this).find('.autohide').show();
	   }, function(){
		  $(this).find('.autohide').hide();
	});

	$('select.url_dropdown').on('change',function() { window.location.href = $(this).val();});

	$('.bxslider').bxSlider({  auto: true, autoControls: true });
	
	$(".box_nullstyle").hover(
		function () { $(this).find("a.butthree").stop().fadeTo(200, 1);}, 
		function () { $(this).find("a.butthree").stop().fadeTo(200, 0);}
	);
	$(".butthree").stop().fadeTo(0, 0);
	$(document).on("click","#btnlogin_cm",function(e){
          var dataString = "alive_hoten=" + $('#alive_hoten').val() + "&alive_email=" + $('#alive_email').val() + "&alive_dienthoai=" + $('#alive_dienthoai').val() + "&alive_url=" + $('#alive_url').val() + "&alive_comment=" + $('#alive_comment').val() + "&alive_domain=" + $('#alive_domain').val();
          $.ajax({
              type: "POST",
              url: "/alive_comment",
              data: dataString,
              
              success: function(response)
              {

                 var obj = jQuery.parseJSON(response);
                 if(obj.error > 0){
                  $('#alive_message').html(obj.ms);
               }else{
                   location.reload();
            }
           
        }
      });
      });
	$(document).on("click","#btn_alive_cm",function(e){
          var dataString = "alive_url=" + $('#alive_url').val() + "&alive_comment=" + $('#alive_comment').val() + "&alive_domain=" + $('#alive_domain').val();
          $.ajax({
              type: "POST",
              url: "/alive_comment",
              data: dataString,
              beforeSend: function() {
              $('#js_new_feed_comment').addClass('alive_update');
             },
              success: function(response)
              {
				$('#js_new_feed_comment').removeClass('alive_update');
                 var obj = jQuery.parseJSON(response);
                 if(obj.error > 0){
                 alert(obj.ms);
               }else{
                   $('#js_new_feed_comment').html(obj.ms);
            }
           
        }
      });
      });
});	
	function On_focus(id1,id2)
		{
			$("#"+id2).hide();
			$("#"+id1).show();
			$('#'+id1).focus();
		}
	function On_out(id1,id2)
		{
			if($("#"+id1).val().length < 1)
				{
					$("#"+id1).hide();
					$("#"+id2).show();
				}
		}
	function Admin_MENU(id)
		{
			$(".qlchung").hide();
			$("#"+id).show('slow');
		}	
	function center_modal(modal_id) {
    
		var that 			= $('#'+modal_id);
		var modalheight 	= that.outerHeight();
		
		var top, left, topx, leftx;
		
		top 	= Math.max($("#overlay").height() - that.outerHeight(), 0) / 2;
		left 	= Math.max($("#overlay").width() - that.outerWidth(), 0) / 2;
		topx 	= top  + $("#overlay").scrollTop();
		leftx 	= left + $("#overlay").scrollLeft();
		
		that.css({'top' : topx, 'left' : leftx, "position":"absolute","z-index":9999});
	}
	function close_modal(){
		$('html').removeClass("ov");
		$('#overlay').hide();
		$('.modal_window').hide();
		//history.pushState(null, null, url);
	} 
	function ShowColorPicker()
		{
			$("#left_global_panel_id").toggle();
		}
	function show_modal(modal_id,modal_true){  
		var window_width 	= $(window).width();  
		var window_height 	= $(document).height();
		var that 			= $('#'+modal_id);
	
		$("#overlay").css({'display' : 'block'});
		if(modal_true)
			{
				$("#overlay_in").removeAttr('onclick');
				$("#overlay_in").css({'height' : 0,'cursor':'auto'});
			}
		else
			{
				$("#overlay_in").attr('onclick', 'close_modal();');
				$("#overlay_in").css({'height' : that.height(),'cursor':'pointer'});
			}	
		$('html').addClass("ov");
		center_modal(modal_id);
		that.show();
	}
	
	function Change_Tabs(name,tongso,id)
		{
			var i ;
			for(i=1;i<=tongso;i++)
			{
				if(i==id)
				{
					$("#"+name+id).addClass('active');				
					$("#content_"+name+id).show();
				}
				else
				{
					$("#"+name+i).removeClass('active');
					$("#content_"+name+i).hide();
				}
			}
		}
	function ajaxloader(name,url)
		{
			$("#"+name).html("<img src='<?=$fullpath?>/images/loading/loading7.gif' alt='loading bang.vn'/>");
			$("#"+name).load(url);	
		}
	function ShowLostPass()
		{
			$("#lostpass").show();
		}
	function MM_jumpMenu(targ,selObj,restore){ //v3.0
	  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
	  if (restore) selObj.selectedIndex=0;
	}
	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	
	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}
	
	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}
	function checkadminlogin()
		{
			var mk = $("#adminmatkhau").val();
			if($("#admintentruycap").val()=='') 
				{
					alert("Hãy nhập vào tên truy cập của bạn!");
					admintentruycap.focus();
					return false;
				}
			if($("#adminmatkhau").val()=='') 
				{
					alert("Hãy nhập vào mật khẩu của bạn!");
					adminmatkhau.focus();
					return false;
				}	
			document.getElementById('adminmatkhau').value = MD5('bang.vn'+document.getElementById('adminmatkhau').value);
			return true;
		}
	function CheckRegForm()
	{
		with (document.TheForm)
		{
				if (tentruycap.value=="")
				{
						alert("Hãy nhập vào tên truy cập của bạn!");
						tentruycap.focus();
						return false;
				}
				if (matkhau.value=="")
				{
						alert("Mật khẩu truy cập của bạn là gì?");
						matkhau.focus();
						return false;
				}
				matkhau.value = MD5('bang.vn'+matkhau.value);
			}
		return true;
	}
	function QuickBox()

		{

			var o = $('#quick_box'); 

			if (o.css('display') == 'none') {

				o.show();

				//a.hide();

			} else {

				o.hide();

				//a.show();

			}

		}
	function checkinput(id,NOWTIC)
	{
		$('#'+id).text(Num2Word(NOWTIC));
	}
function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}	
function CheckValueIn(byid,byvalu,byprice,bymoney,byword,idfullprice,idfullmoney)
	{		
		var aMax 	 = document.getElementById([byid]).value;
		var aSoluong = document.getElementById([byvalu]).value;
		var aGia 	 = document.getElementById([byprice]).innerHTML;
		var aTien 	 = document.getElementById([bymoney]).innerHTML;
		
		var tempMAX = parseInt(aMax);
		var tempVAX = parseInt(aSoluong);
		var tempGAX = parseInt(aGia);
		var tempTIX = parseInt(aTien);
		
		if(tempVAX > tempMAX) 
			{
				alert('Giá trị không được lớn hơn '+tempMAX);	
				document.getElementById([byvalu]).value	= tempMAX;
			}
		if(tempVAX < 1) 
			{
				alert('Giá trị không được nhỏ hơn 1');	
				document.getElementById([byvalu]).value	= 1;
			}
		NOWTIC = 	tempGAX * document.getElementById([byvalu]).value;
		
		document.getElementById([bymoney]).innerHTML = 	NOWTIC; //addCommas(NOWTIC)
		document.getElementById([idfullmoney]).innerHTML = 	addCommas(NOWTIC); //addCommas(NOWTIC)

		//document.getElementById([byword]).innerHTML = '<i>'+Num2Word(NOWTIC)+'</i>';
		
		var TOTO  = 	document.getElementById('maxvalue').value;
		var mySum = 0;
		for(c=1;c<TOTO;c++)
			{
				myVa	= document.getElementById(['fullmoney'+c]).innerHTML;
				mySum	+= parseInt(myVa);
			}
		document.getElementById('ttmoney').innerHTML = 	addCommas(mySum)
		document.getElementById('tt2word').innerHTML = '<i>'+Num2Word(mySum)+'</i>';
	}		
function numbersonly(e, decimal) 
	{
		var key;
		var keychar;
		if (window.event) {
		   key = window.event.keyCode;
		}
		else if (e) {
		   key = e.which;
		}
		else {
		   return true;
		}
		keychar = String.fromCharCode(key);
		////
		
		if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
		   return true;
		}
		else if ((("0123456789").indexOf(keychar) > -1)) {
		   return true;
		}
		else if (decimal && (keychar == ".")) { 
		  return true;
		}
		else return false;
	}
function Num2Word(num,fmt) 
	{
		num = Math.round(num).toString(); // round value
		if (num == 0) return 'chưa thiết lập giá bán hoặc giá bán là thương lượng'; // if number given is 0, return and exit
	//_ locals
		// word numbers
		var wnums = [
		['trăm','ngàn','triệu','tỷ','ngàn tỷ','ngàn ngàn tỷ'],
		['một','nhất','mười','',' '],
		['hai','thứ hai','hai mươi',0,0],
		['ba','ba','ba mươi',0,0],
		['bốn','bốn','bốn mươi',0,0],
		['năm','lăm','năm mươi',0,0],
		['sáu','sáu','sáu mươi',0,0],
		['bảy','bảy','bảy mươi',0,0],
		['tám','tám','tám mươi',0,0],
		['chín','chín','chín mươi',0,0],
		['mười',],
		['mười một','hai mốt'],
		['mười hai','hai mươi hai'],
		['mười ba',],
		['mười bốn','bốn mươi'],
		['mười lăm',],
		['mười sáu',],
		['mười bảy',],
		['mười tám',],
		['mười chín',]
		];
	
		// digits outside triplets
		var dot = (num.length % 3) ? num.length % 3 : 3;
		var sets = Math.ceil(num.length/3);
		var rslt = '';	
		for (var i = 0; i < sets; i++) 
		{ // for each set of triplets
			var subt = num.substring((!i) ? 0 : dot + (i - 1) * 3,(!i) ? dot : dot + i * 3);
			if (subt != 0) 
			{ // if value of set is not 0...
				var hdec = (subt.length > 2) ? subt.charAt(0) : 0; // get hundreds digit
				var ddec = subt.substring(Math.max(subt.length - 2,0),subt.length); // get double digits
				var odec = subt.charAt(subt.length - 1); // get one's digit
				// hundreds digit
				if (hdec != 0) rslt += ' ' + wnums[hdec][0] + ' trăm ' + ((fmt && ddec == 0) ? ' ' : '');
				// add double digit
				if (ddec < 20 && 9 < ddec) 
				{ // if less than 20...
					// add double digit word
					rslt += ' ' + ((fmt) ? ((wnums[ddec][1]) ? wnums[ddec][1] : wnums[ddec][0] + ' ') : wnums[ddec][0]);
				} 
				else 
				{ // otherwise, add words for each digit...
					// add "and" for last set without a tens digits
					if ((0 < hdec || 1 < sets) && i + 1 == sets && 0 < ddec && ddec < 10) rslt += 'và ';
					// tens digit
					if (19 < ddec) rslt += wnums[ddec.charAt(0)][(wnums[ddec.charAt(0)][2]) ? 2 : 0] + ((i + 1 == sets && odec == 0 && fmt) ? 'tieth' : ' ') + ((0 < odec) ? ' ' : ' ');
					// one's digit
					if (0 < odec) rslt += wnums[odec][(i + 1 == sets && fmt) ? 1 : 0];
				}
				// add place for set
				if (i + 1 < sets) rslt += ' ' + wnums[0][sets - i - 1] + ' '; // if not last set, add place
			} 
			else if (i + 1 == sets && fmt) 
			{ // otherwise, if this set is zero, is the last set of the loop, and the format (fmt) is cardinal
				rslt += ' '; // add cardinal "th"
			}
		}
	//_ return result
		var str1='mươi  năm';
		var str2='mươi lăm';
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		str1='mươi  một';
		str2='mươi mốt';
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		rslt=rslt.replace(str1,str2);
		//alert(rslt);
		return rslt+' đồng';
	}		
////////
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}	
function ShowHidden(divid)
	{
		$('#'+divid).slideToggle();
	}
function Check_Shopping_Cart()
{
	with (document.TheFormX)
	{		
			if (tendaydu.value=="")
			{
					alert("Xin vui lòng nhập vào họ tên người liên hệ!");
					tendaydu.focus();
					return false;
			}
			if (email.value=="")
			{
					alert("Hãy nhập vào địa chỉ Email mà bạn đang sử dụng");
					email.focus();
					return false;
			}
			else
			{
					if(email.value.indexOf("@")<0||email.value.indexOf(".")<0)
					{
							alert("Địa chỉ email phải đúng cú pháp, ví dụ: info@bang.vn!");
							email.focus();
							return false;
					}
			}
			if (diachi.value=="")
			{
					alert("Xin vui lòng nhập vào địa chỉ liên lạc của bạn!");
					diachi.focus();
					return false;
			}
			if (dienthoai.value=="")
			{
					alert("Xin vui lòng nhập vào số điện thoại để chủ eShop liên lạc với bạn nhanh nhất!");
					dienthoai.focus();
					return false;
			}

		}

	return true;

}	
function SetCurrency_by_id(id)
	{
		var myvalue = $("#"+id).val();
		myvalue = myvalue.replace(/\,/g,'');
		myvalue = addCommas(myvalue);
		$("#"+id).val(myvalue);
	}
function SetCurrency()
	{
		var myvalue = $("#giaban").val();
		myvalue = myvalue.replace(/\,/g,'');
		myvalue = addCommas(myvalue);
		$("#giaban").val(myvalue);
	}
function Check_RegMember()
	{
		var u = $("#reg_tentruycap").val();
		var e = $("#reg_email").val();
		var p = $("#reg_matkhau").val();
		if(u=='') 
			{
				alert("Xin vui lòng nhập vào Tên Truy Cập \n+Tên Truy Cập phải lớn hơn 6 ký tư\n+Và bắt đầu bằng 1 chữ từ A-Z!̣");
				$("#reg_tentruycap").focus();
				return false;
			}
		if (e=="")
			{
					alert("Hãy nhập vào địa chỉ Email mà bạn đang sử dụng");
					$("#reg_email").focus();
					return false;
			}
			else
			{
					if(e.indexOf("@")<0||e.indexOf(".")<0)
					{
							alert("Địa chỉ email phải đúng cú pháp, ví dụ: kyvo@pavietnam.vn!");
							$("#reg_email").focus();
							return false;
					}
			}
		if(p=='') 
			{
				alert("Xin vui lòng nhập vào Mật Khẩu");
				$("#reg_matkhau").focus();
				return false;
			}	
		$("#reg_matkhau").val(MD5('bang.vn'+p));	
		return true;	
	}
function NewsLetter()
	{
		var e = $("#newsletter_id").val();
		if(e.indexOf("@")<0||e.indexOf(".")<0)
			{
					alert("Địa chỉ email phải đúng cú pháp, ví dụ: info@tenmien.vn!");
					$("#newsletter_id").focus();
					return false;
			}
		var url = '/AjBat/NewsLetter';	
		$.post(url,{email:e},function(data){
			result = parseInt(data);
			
			if	(result==1) { alert('Lỗi:\n+ Email không đúng chuẩn.');}			
			else if	(result==2) { alert('Lỗi:\n+ Email đã tồn tại trong hệ thống!');}
			else if	(result==0) { alert('THANKS:\n+ Cảm ơn bạn đã đăng ký trên hệ thống của chúng tôi!');}
			else location.reload();
		});	

	}	
function Check_LoginMember2(uid,pid)
	{
		var mk = $("#"+pid).val();
		if($("#"+uid).val()=='') 
			{
				alert("Hãy nhập vào tên truy cập của bạn!");
				$("#"+uid).focus();
				return false;
			}
		if(mk=='') 
			{
				alert("Hãy nhập vào mật khẩu của bạn!");
				mk.focus();
				return false;
			}	
		$("#"+pid).val(MD5('bang.vn'+mk));
		return true;
	}
function Check_LoginMember(uid,pid)
	{
		var mk = $("#"+pid).val();
		if($("#"+uid).val()=='') 
			{
				alert("Hãy nhập vào tên truy cập của bạn!");
				$("#"+uid).focus();
				return false;
			}
		if(mk=='') 
			{
				alert("Hãy nhập vào mật khẩu của bạn!");
				mk.focus();
				return false;
			}	
		$("#"+pid).val(MD5('bang.vn'+mk));
		return true;
	}	
function Check_MemberChangePass(p1,p2)
	{
		var mk1 = $("#"+p1).val();
		var mk2 = $("#"+p2).val();
		if($("#"+p1).val()=='') 
			{
				alert("Nhập vào mật khẩu hiện tại của bạn");
				$("#"+p1).focus();
				return false;
			}
		if($("#"+p2).val()=='') 
			{
				alert("Nhập vào mật khẩu MỚI của bạn");
				$("#"+p2).focus();
				return false;
			}	
		$("#"+p1).val(MD5('bang.vn'+mk1));
		$("#"+p2).val(MD5('bang.vn'+mk2));
		return true;
	}	
function Check_LossMember(pemail)
	{
		var e = $("#"+pemail).val();
		
		if (e=="")
			{
					alert("Hãy nhập vào địa chỉ Email mà bạn đang sử dụng");
					$("#"+pemail).focus();
					return false;
			}
		else
			{
					if(e.indexOf("@")<0||e.indexOf(".")<0)
					{
							alert("Địa chỉ email phải đúng cú pháp, ví dụ: kyvo@pavietnam.vn!");
							$("#"+pemail).focus();
							return false;
					}
			}
		return true;	
	}
function PleazeLogin()
	{
		alert('Vui lòng đăng nhập trước khi tiếp tục.');	
	}	
function ajax_action(id,ty)
	{
		var url			= "/LoveAjax/"+ty;
		
		$.post(url,{comment_id:id,ty:ty},function(result){
			result = parseInt(result);
			if(result==0)
				{
					alert('Vui lòng đăng nhập trước khi tiếp tục!');					
				}
			else if(result==1)
				{
					if(ty==1) 	alert('Bạn đã chọn THÍCH sản phẩm này rồi :)');
					else		alert('Bạn đã chọn MUỐN sản phẩm này rồi :)');
				}	
			else
				{	
					if(ty==1) 
						{
							var love = parseInt($("#love_"+id).html());
							$("#love_"+id).html(love+1);
							alert('Bạn đã chọn THÍCH sản phẩm này!');
						}
					else
						{
							var want = parseInt($("#want_"+id).html());
							$("#want_"+id).html(want+1);
							alert('Bạn đã chọn MUỐN sản phẩm này!');
						}	
				}
		});
	}
function hex(x) 
	{
		var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}	
function rgb2hex(rgb) 
	{
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}	
function setcolor(rgb)
	{
		var nameofcolor = $("#id_mausac_color");
		var hex = rgb2hex(rgb);
		nameofcolor.val(hex);
		nameofcolor.css("background-color",hex);
	}	
function SetImg(setdiv,url_img,ty)
	{
		var nameofimg = $("#"+setdiv);
		nameofimg.css("background-image","url('/"+url_img+"')");
		if(ty==1) nameofimg.html("<img src='/"+url_img+"' width='300' height='290'>");
	}
function ShowOp(value)
	{
		$(".optx").hide();
		if(value>0) $("#op"+value).show();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	