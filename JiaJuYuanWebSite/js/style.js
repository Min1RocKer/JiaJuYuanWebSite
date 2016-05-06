$(document).ready(function() {
	//登录 注册
	//登录标识的变化(根据是否登录来判断)
	var userid = getCookie('userId');
	if (userid) {
		$('#logSuccess').css('display', 'block');
		$('#logOrReg').css('display', 'none');
	} else {
		$('#logSuccess').css('display', 'none');
		$('#logOrReg').css('display', 'block');
	}
	//退出
	$('#logout').click(function(){
		delCookie('userId');
		delCookie('token');
		window.location.reload();
	})
	//
	var personal_aside_nav1 = $("#personal_aside_nav1");
	var personal_aside_nav2 = $("#personal_aside_nav2");
	personal_aside_nav1.click(function() {
		$("#triangle2").css("display", "none");
		$("#triangle1").css("display", "block");
		personal_aside_nav1.css("top", "-12px");
		personal_aside_nav2.css("top", "-12px");
		personal_aside_nav1.css("background-color", "#b59983");
		personal_aside_nav2.css("background-color", "#606060");
		$("#personal_info").css("display", "block");
		$("#my_news").css("display", "none");
	});
	personal_aside_nav2.click(function() {
		$("#triangle1").css("display", "none");
		$("#triangle2").css("display", "block");
		personal_aside_nav1.css("top", "0");
		personal_aside_nav2.css("top", "-12px");
		personal_aside_nav1.css("background-color", "#606060");
		personal_aside_nav2.css("background-color", "#b59983");
		$("#personal_info").css("display", "none");
		$("#my_news").css("display", "block");
	});
	$("#personal_info_changeBtn").click(function() {
		$("#pages_icons1").css("display", "none");
		$(".personal_info_right").css("display", "none");
		$(".personal_info_right_change").css("display", "inline-block");
		$("#personal_info_changeBtn").text("更新");
	});

	//回到顶部效果
	$('#backTop').click(function() {
			pageScroll();
		})
		//	//获取验证码
	var countdown = 60;

	function settime(val) {
		if (countdown == 0) {
			val.value = "获取验证码";
		} else {
			val.setAttribute("disabled", true);
			val.value = "重发(" + countdown + ")";
			countdown--;
		}
		setTimeout(function() {
			settime(val);
		}, 1000)
	}
	$('#getValidate').click(function(val) {
			//手机号判断非空和是否符合1开头11位数字
			var phone = $('#loginMobile').val();
			var re = /^1\d{10}$/;
			if (!re.test(phone) || phone.length == 0) {
				alert('请输入有效的手机号码！');
				return;
			}
			var postparam = {
				"loginName": phone,
				"type": '1'
			};
			console.log(val);
			settime(this);
			postData("/api/common/getValidateCode", postparam, function(msg) {
				console.log(msg.result);
				//倒计时
			}, function(msg) {
				alert("发送失败");
				console.log(msg);
			});
		})
		//用户登录
	$('#loginBtn').click(function() {
		var iskeep = document.getElementById("loginCheckbox").checked;
		//手机号判断
		var phone = $('#loginMobile').val();
		var re = /^1\d{10}$/;
		if (!re.test(phone) || phone.length == 0) {
			alert('请输入有效的手机号码！');
			return;
		}
		//验证码判断非空
		var verificationCode = $('#loginValidate').val();
		if (verificationCode.length == 0) {
			alert("验证码不能为空");
			return;
		}
		var postparam = {
			"loginname": phone,
			"validatecode": verificationCode,
			"plat": '3'
		};
		postData("/user/login/validCodeLogin", postparam, function(msg) {
			console.log(msg.result);
			if (iskeep) {
				setCookie('userId', msg.result.userid, 7);
				setCookie('token', msg.result.token, 7);
			} else {
				setCookie('userId', msg.result.userid);
				setCookie('token', msg.result.token);
			}
			window.location.href = 'index.html';
		}, function(msg) {
			alert('登录失败');
		});
		//enter键
	})
})