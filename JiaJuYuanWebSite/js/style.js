$(document).ready(function() {
	//回到顶部效果
	$('#backTop').click(function() {
			pageScroll();
		})
		//获取验证码
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
		})
		//登录标识的变化(根据是否登录来判断)
	var userid = getCookie('userId');
	if (userid) {
		$('#logSuccess').css('display', 'block');
		$('#logOrReg').css('display', 'none');
	} else {
		$('#logSuccess').css('display', 'none');
		$('#logOrReg').css('display', 'block');
	}
	//退出登录
	$('#logout').click(function() {
			delCookie('userId');
			delCookie('token');
			window.location.reload();
		})
		//个人中心-侧边导航框点击效果
	var personal_aside_nav1 = $("#personal_aside_nav1");
	var personal_aside_nav2 = $("#personal_aside_nav2");
	personal_aside_nav1.click(function() {
		$("#triangle2").css("display", "none");
		$("#triangle1").css("display", "block");
		personal_aside_nav1.css("background-color", "#b59983");
		personal_aside_nav2.css("background-color", "#606060");
		$("#personal_info").css("display", "block");
		$("#personal_info .person_info_left").css("display", "inline-block");
		$("#personal_info .personal_info_right").css("display", "inline-block");
		$("#personal_info .personal_info_right_change").css("display", "none");
		$("#personal_info_changeBtn").show();
		$("#personal_info_update").hide();
		$(".address").css('display', 'block');
		$("#my_news").css("display", "none");
	});
	$("#personal_info_changeBtn").click(function() {
		$("#pages_icons1").css("display", "none");
		$(".personal_info_right").css("display", "none");
		$(".personal_info_right_change").css("display", "inline-block");
		$(".address").css('display', 'none');
		$(this).hide();
		$('#personal_info_update').show();
	});
	personal_aside_nav2.click(function() {
		$("#triangle1").css("display", "none");
		$("#triangle2").css("display", "block");
		personal_aside_nav1.css("background-color", "#606060");
		personal_aside_nav2.css("background-color", "#b59983");
		$("#personal_info").css("display", "none");
		$("#my_news").css("display", "block");
	});

	//	个人中心逻辑
	//close
	$('#vipinfo_modal_header i').click(function() {
			$('#vipinfo_modal').hide();
		})
		//取消申请
	$('#vipinfo_modal_cancel').click(function() {
			$('#vipinfo_modal').hide();
		})
		//验证是否是认真商家
	var officeId = $('#officeid').text()
	var isVip = $('#isVip').text()
	if (isVip == 1) {
		$('#pages_icons1').css('display', 'inline-block');
		$('#personal_info_changeBtn span').text("申请变更资料");
		$('#personal_info_changeBtn').unbind('click');
		$('#personal_info_changeBtn').click(function() {
			$('#vipinfo_modal').show();
		})
	}
	//用户申请变更资料
	$('#vipinfo_modal_submit').click(function() {
			var _reason = $('#vipinfo_modal_reason').val();
			if (_reason.length == 0 || _reason == '请填写您的申请理由') {
				alert('申请理由不能为空!');
				return;
			}
			var _userid = getCookie('userId');
			var _token = getCookie('token');
			var postparam = {
				"userId": _userid,
				"token": _token,
				"content": _reason
			};
			postData("/web/user/applyChangeInfo", postparam, function(msg) {
				console.log(msg);
				if (msg.code == 1 || msg.code == '1') {
					alert('提交成功!');
					$('#vipinfo_modal').hide();
				}
			}, function(msg) {
				alert(msg.msg);
			});
		})
		//	非认证用户修改个人信息
	$('#personal_info_update').click(function() {
			var _name = $('#personName').val();
			var _officeName = $('#personofficeName').val();
			var _industry = $('#personindustry').val();
			if (_name.length == 0 || _officeName == 0 || _industry == 0) {
				alert("请确保修改内容不为空!");
				return;
			}
			var _userid = getCookie('userId');
			var _token = getCookie('token');
			var _officeid = $('#officeid').text();
			var postparam = {
				"userId": _userid,
				"token": _token,
				"username": _name,
				"industry": _industry,
				"officeid": _officeid,
				"officename": _officeName
			};
			postData("/web/user/infoEdit", postparam, function(msg) {
				console.log(msg);
				if (msg.code == 1 || msg.code == '1') {
					alert('提交成功!');
					window.location.reload();
				}
			}, function(msg) {
				alert(msg.msg);
			});
		})
		//花色汇-最新花色
	for (var mainl = 0; mainl < menuJson.length; mainl++) {
		var menuStr = "<div class=\"col-xs-140\">\<div id=\"latest_aside_nav\" class=\"latest_aside_nav col-xs-140\" >" + menuJson[mainl].MenuName + "</div></div>";
		var subm = '';
		if (menuJson[mainl].SubMenu) {
			for (var subl = 0; subl < menuJson[mainl].SubMenu.length; subl++) {
				subm += "<div class=\"col-xs-140\"><div class=\"triangle\">" +
					"</div><div class=\"latest_aside_subnav col-xs-140\">" + menuJson[mainl].SubMenu[subl].subname + "</div></div>"
			}
		}
		var content = menuStr + subm;
		$('#latestMenuArea').append(content);
	}
	//调用花色汇==》最新花色 菜单切换效果
	subnavClick();

	//动态生成最新花色内容
	var ml = menudetail.length;
	if (ml > 12) {
		for (var msgl = 0; msgl < 12; msgl++) {
			var msgStr = "<div class=\"latest_content_list_i col-xs-35\">";
			var msgcon1 = "<div class=\"checkdetail\"><img class=\"latest_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"latestColor\" /><label class=\"latest_list_name\">" + menudetail[msgl].title + "</label>";
			var msgcon2 = "<div class=\"latest_list_label\">" + menudetail[msgl].type + "</div><p class=\"latest_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"latest_more center-block\">查看详情</div>";
			var msgcon4 = "<div class=\"latest_list_mouseover\"><div class=\"latest_list_mouseover_bg\"></div><i></i><label>点击查看大图</label></div></div></div>";
			$('#latestMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3 + msgcon4);
		}
		//分页逻辑	
		var pageCount = Math.ceil(ml / 12);
		var dividePagehStr = "<li><a href=\"#\" class=\"first\"></a></li><li><a href=\"#\" class=\"pre\"></a></li>";
		var divideTailStr = "<li><a href=\"#\" class=\"next\"></a></li><li><a href=\"#\" class=\"last\"></a></li>";
		var totalStr = "<li class=\"pagecount\"><span>共</span><span id=\"totalPage\">" + pageCount + "</span><span>页</span></li>"
		var content = "";
		for (var i = 1; i < pageCount + 1; i++) {
			content += "<li><a href=\"#\">" + i + "</a></li>";
		}
		$('#morepage').append(dividePagehStr + content + totalStr + divideTailStr);
		$('.checkdetail').bind({
			mouseover: function(e) {
				$(this).children('.latest_list_mouseover').show();
			},
			mouseout: function(e) {
				$(this).children('.latest_list_mouseover').hide();
			}
		})
	} else {
		for (var msgl = 0; msgl < ml; msgl++) {
			var msgStr = "<div class=\"latest_content_list_i col-xs-35\">";
			var msgcon1 = "<img class=\"latest_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"latestColor\" /><label class=\"latest_list_name\">" + menudetail[msgl].title + "</label>";
			var msgcon2 = "<div class=\"latest_list_label\">" + menudetail[msgl].type + "</div><p class=\"latest_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"latest_more center-block\">查看详情</div>";
			var msgcon4 = "<div class=\"latest_list_mouseover\"><div class=\"latest_list_mouseover_bg\"></div><i></i><label>点击查看大图</label></div></div>";
			$('#latestMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3 + msgcon4);
			$('.checkdetail').bind({
				mouseover: function(e) {
					$(this).children('.latest_list_mouseover').show();
				},
				mouseout: function(e) {
					$(this).children('.latest_list_mouseover').hide();
				}
			})
		}
	}
	//动态生成经典花色内容
	if (ml > 12) {
		for (var msgl = 0; msgl < 12; msgl++) {
			var msgStr = "<div class=\"classical_list col-xs-140\">";
			var msgcon1 = "<img class=\"classical_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"classicalColor\" />";
			var msgcon2 = "<p class=\"classical_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"classical_list_label\">" + menudetail[msgl].type + "</div><div class=\"classical_more\">查看详情</div></div>";
			$('#classicalMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
		}
		//分页逻辑	
		var pageCount = Math.ceil(ml / 12);
		//console.log(pageCount);
		var dividePagehStr = "<li><a href=\"#\" class=\"first\"></a></li><li><a href=\"#\" class=\"pre\"></a></li>";
		var divideTailStr = "<li><a href=\"#\" class=\"next\"></a></li><li><a href=\"#\" class=\"last\"></a></li>";
		var totalStr = "<li class=\"pagecount\"><span>共</span><span id=\"totalPage\">" + pageCount + "</span><span>页</span></li>"
		var content = "";
		for (var i = 1; i < pageCount + 1; i++) {
			content += "<li><a href=\"#\">" + i + "</a></li>";
		}
		$('#classical_morepage').append(dividePagehStr + content + totalStr + divideTailStr);
	} else {
		for (var msgl = 0; msgl < ml; msgl++) {
			var msgStr = "<div class=\"classical_list col-xs-140\">";
			var msgcon1 = "<img class=\"classical_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"classicalColor\" />";
			var msgcon2 = "<p class=\"classical_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"classical_list_label\">" + menudetail[msgl].type + "</div><div class=\"classical_more\">查看详情</div></div>";
			$('#classicalMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
		}
	}
	//查看大图通用事件
	$('.latest_list_mouseover').click(function() {
		var imgurl = $(this).parent().children('.latest_list_image').attr('src');
		window.location.href = "viewBigImage.html?img=" + imgurl + "";
	})
});

//花色汇==》最新花色 菜单切换效果
function subnavClick() {
	var latest_aside_subnav = $(".latest_aside_subnav");
	var triangle = $(".triangle");
	latest_aside_subnav.click(function() {
		latest_aside_subnav.removeClass("latest_aside_subnav_active");
		triangle.removeClass("triangle-right");
		$(this).addClass("latest_aside_subnav_active");
		$(this).siblings(".triangle").addClass("triangle-right");
	});
}