$(document).ready(function() {
	//花色汇-最新花色
	//获取花色菜单
	postData("/web/decorative/proTypeList", '', function(msg) {
		//console.log(msg.result);
		var rs = msg.result;
		var menuJson = pickMenu(rs);
		console.log(menuJson);
		for (var mainl = 0; mainl < menuJson.length; mainl++) {
			var subm = '';
			if (mainl == 0) {
				subm = "<div class=\"col-xs-140\"><div class=\"triangle\">" +
					"</div><div class=\"latest_aside_subnav col-xs-140\" code=\"" + menuJson[mainl].MenuId + "\" isparent=\"1\">全部</div></div>";
			} else {
				subm = "<div class=\"col-xs-140\"><div class=\"triangle\">" +
					"</div><div class=\"latest_aside_subnav col-xs-140\" code=\"" + menuJson[mainl].MenuId + "\" isparent=\"1\">全部</div></div>";
			}
			var menuStr = "<div class=\"col-xs-140\">\<div id=\"latest_aside_nav\" class=\"latest_aside_nav col-xs-140\" >" + menuJson[mainl].MenuName + "</div></div>";
			if (menuJson[mainl].sub.length != 0) {
				for (var subl = 0; subl < menuJson[mainl].sub.length; subl++) {
					subm += "<div class=\"col-xs-140\"><div class=\"triangle\">" +
						"</div><div class=\"latest_aside_subnav col-xs-140\" code=\"" + menuJson[mainl].sub[subl].subId + "\" isparent=\"0\">" + menuJson[mainl].sub[subl].subName + "</div></div>"
				}
			}
			var content = menuStr + subm;
			$('#latestMenuArea').append(content);
			var MenuGp = $('#latestMenuArea .col-xs-140');
			console.log(typeof MenuGp);
		}
		//调用花色汇==》最新花色 菜单切换效果
		subnavClick();
	}, function(msg) {
		alert(msg.msg);
	});
	//动态生成经典花色内容
	var ml = menudetail.length;
	if (ml > 12) {
		for (var msgl = 0; msgl < 12; msgl++) {
			var msgStr = "<div class=\"classical_list col-xs-140\">";
			var msgcon1 = "<img class=\"classical_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"classicalColor\" />";
			var msgcon2 = "<p class=\"classical_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"classical_list_label\">" + menudetail[msgl].type + "</div><div class=\"classical_more\"><a href=\"perCompanyColor.html\">查看详情</a></div></div>";
			$('#classicalMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
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
		$('#classical_morepage').append(dividePagehStr + content + totalStr + divideTailStr);
	} else {
		for (var msgl = 0; msgl < ml; msgl++) {
			var msgStr = "<div class=\"classical_list col-xs-140\">";
			var msgcon1 = "<img class=\"classical_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"classicalColor\" />";
			var msgcon2 = "<p class=\"classical_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"classical_list_label\">" + menudetail[msgl].type + "</div><div class=\"classical_more\"><a href=\"perCompanyColor.html\">查看详情</a></div></div>";
			$('#classicalMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
		}
	}
	//动态生成分公司花色内容
	var ml = menudetail.length;
	if (ml > 12) {
		for (var msgl = 0; msgl < 12; msgl++) {
			var msgStr = "<div class=\"per_content_list_i col-xs-35\">";
			var msgcon1 = "<div class=\"checkdetail\"><img class=\"per_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"perColor\" /><div class=\"per_list_mouseover\"><div class=\"per_list_mouseover_bg\"></div><i></i><label>点击查看大图</label></div></div>";
			var msgcon2 = "<label class=\"per_list_name\">" + menudetail[msgl].title + "</label><div class=\"per_list_label\">" + menudetail[msgl].type + "</div><p class=\"per_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"per_more center-block\">查看详情</div></div></div>";
			$('#perMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
		}
		$('.checkdetail').bind({
			mouseover: function(e) {
				$(this).children('.per_list_mouseover').show();
			},
			mouseout: function(e) {
				$(this).children('.per_list_mouseover').hide();
			}
		})
	} else {
		for (var msgl = 0; msgl < ml; msgl++) {
			var msgStr = "<div class=\"per_content_list_i col-xs-35\">";
			var msgcon1 = "<div class=\"checkdetail\"><img class=\"per_list_image\" src=\"" + menudetail[msgl].img + "\" alt=\"perColor\" /><div class=\"per_list_mouseover\"><div class=\"per_list_mouseover_bg\"></div><i></i><label>点击查看大图</label></div></div>";
			var msgcon2 = "<label class=\"per_list_name\">" + menudetail[msgl].title + "</label><div class=\"per_list_label\">" + menudetail[msgl].type + "</div><p class=\"per_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"per_more center-block\">查看详情</div></div></div>";
			$('#perMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
			$('.checkdetail').bind({
				mouseover: function(e) {
					$(this).children('.per_list_mouseover').show();
				},
				mouseout: function(e) {
					$(this).children('.per_list_mouseover').hide();
				}
			})
		}
	}
	//花色汇-最新花色
	//获取分公司花色菜单
	postData("/web/decorative/proTypeList", '', function(msg) {
		var rs = msg.result;
		var menuJson = pickMenu(rs);
		for (var mainl = 0; mainl < menuJson.length; mainl++) {
			var menuStr = "<div class=\"col-xs-140\">\<div id=\"per_aside_nav\" class=\"per_aside_nav col-xs-140\" >" + menuJson[mainl].MenuName + "</div></div>";
			var subm = '';
			if (menuJson[mainl].sub.length != 0) {
				for (var subl = 0; subl < menuJson[mainl].sub.length; subl++) {
					subm += "<div class=\"col-xs-140\"><div class=\"per_triangle\">" +
						"</div><div class=\"per_aside_subnav col-xs-140\">" + menuJson[mainl].sub[subl].subName + "</div></div>"
				}
			}
			var content = menuStr + subm;
			$('#perMenuArea').append(content);
		}
		//调用花色汇==》分公司 菜单切换效果
		persubnavClick();
	}, function(msg) {
		alert(msg.msg);
	});
	//查看大图通用点击事件
	$('.latest_list_mouseover').click(function() {
		imgurl = $(this).parent().children('.latest_list_image').attr('src');
		window.location.href = "viewBigImage.html?img=" + imgurl + "";
	})
	//首页点击效果
	$("#index_desinav_new").click(function() {
		$("#triangle_classic").css("display", "none");
		$("#triangle_new").css("display", "block");
		$("#index_desinav_new").css("background-color", "#f6edda");
		$("#index_desinav_classic").css("background-color", "#f5f4f4");
	});
	$("#index_desinav_classic").click(function() {
		$("#triangle_classic").css("display", "block");
		$("#triangle_new").css("display", "none");
		$("#index_desinav_new").css("background-color", "#f5f4f4");
		$("#index_desinav_classic").css("background-color", "#f6edda");
	});

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
		//组织参数
		var t = $(this);
		var pages = resetContent(t, 1);
		console.log(resetContent(t, 1));
		console.log(pages);
		//分页
		laypage({
				cont: 'paging',
				pages: 10,
				groups:6,
				jump: function(obj) {
					$('#latestMsgArea').empty();
					resetContent(t,obj.curr);
				}
			})
		//
	});
}
//花色汇==》分公司花色 菜单切换效果
function persubnavClick() {
	var per_aside_subnav = $(".per_aside_subnav");
	var triangle = $(".per_triangle");
	per_aside_subnav.click(function() {
		per_aside_subnav.removeClass("per_aside_subnav_active");
		triangle.removeClass("triangle-right");
		$(this).addClass("per_aside_subnav_active");
		$(this).siblings(".per_triangle").addClass("triangle-right");
	});
}
//最新花色 ====>更新右边的区域
function resetContent(thisJDom, pageNumber) {
	$('#latestMsgArea').empty();
	var _userid = getCookie('userId');
	var _token = getCookie('token');
	var typeCode = thisJDom.attr('code');
	var isp = parseInt(thisJDom.attr('isparent'));
	var pages = '';
	var postparam = {
		"userId": _userid,
		"token": _token,
		"pageNo": pageNumber,
		"pageSize": 12,
		"type": 0,
		"isParent": isp,
		"proType": typeCode
	}
	postData("/web/decorative/webDecorativeList", postparam, function(msg) {
		console.log(msg.result);
		var menudetail = msg.result.papers;
		//处理花色数据
		var ml = menudetail.length;
		pages = Math.ceil(ml/1);
		console.log(pages);
		var mlg = '';
		if(ml>=12){
			mlg = 12;
		}
		else{
			mlg = ml;
		}
		for (var msgl = 0; msgl <1 ; msgl++) {
			var msgStr = "<div class=\"latest_content_list_i col-xs-35\">";
			var msgcon1 = "<div class=\"checkdetail\"><img class=\"latest_list_image\" src=\"" + menudetail[msgl].smallimage + "\" alt=\"latestColor\" /><div class=\"latest_list_mouseover\"><div class=\"latest_list_mouseover_bg\"></div><i></i><label>点击查看大图</label></div></div>";
			var msgcon2 = "<label class=\"latest_list_name\">" + menudetail[msgl].title + "</label><div class=\"latest_list_label\">" + menudetail[msgl].type + "</div><p class=\"latest_company\">" + menudetail[msgl].companyname + "</p>";
			var msgcon3 = "<div class=\"latest_more center-block\">查看详情</div></div></div>";
			$('#latestMsgArea').append(msgStr + msgcon1 + msgcon2 + msgcon3);
		}
		$('.checkdetail').bind({
			mouseover: function(e) {
				$(this).children('.latest_list_mouseover').show();
			},
			mouseout: function(e) {
				$(this).children('.latest_list_mouseover').hide();
			}
		})
	}, function(msg) {
		alert(msg.msg);
	});
	return pages;
}