!(function($, w){
	const play_line_json =  [
		{"name":"纯净1","url":"https://z1.m1907.cn/?jx=","t":"m"},
		{"name":"B站1","url":"https://vip.parwix.com:4433/player/?url=","t":"m"},
		{"name":"BL","url":"https://vip.bljiex.com/?v="},
		{"name":"CK","url":"https://www.ckplayer.vip/jiexi/?url="},
		{"name":"CHok","url":"https://www.gai4.com/?url="},
		{"name":"大侠","url":"https://api.10dy.net/?url="},
		{"name":"爱跟","url":"https://vip.2ktvb.com/player/?url=","t":"m"},
		{"name":"冰豆","url":"https://api.qianqi.net/vip/?url="},
		{"name":"百域","url":"https://jx.618g.com/?url="},
		{"name":"ckmov","url":"https://www.ckmov.vip/api.php?url="},
		{"name":"大幕","url":"https://jx.52damu.com/dmjx/jiexi.php?url="},
		{"name":"迪奥","url":"https://123.1dior.cn/?url="},
		{"name":"福星","url":"https://jx.popo520.cn/jiexi/?url="},
		{"name":"跟剧","url":"https://www.5igen.com/dmplayer/player/?url="},
		{"name":"RDHK","url":"https://jx.rdhk.net/?v=","t":"m"},
		{"name":"H8","url":"https://www.h8jx.com/jiexi.php?url="},
		{"name":"IK","url":"https://vip.ikjiexi.top/?url="},
		{"name":"解析","url":"https://ckmov.ccyjjd.com/ckmov/?url="},
		{"name":"解析la","url":"https://api.jiexi.la/?url="},
		{"name":"久播","url":"https://jx.jiubojx.com/vip.php?url="},
		{"name":"九八","url":"https://jx.youyitv.com/?url="},
		{"name":"老板","url":"https://vip.laobandq.com/jiexi.php?url="},
		{"name":"乐多","url":"https://api.leduotv.com/wp-api/ifr.php?isDp=1&vid=","t":"m"},
		{"name":"乐喵","url":"https://jx.hao-zsj.cn/vip/?url="},
		{"name":"Mao","url":"https://qd.hxys.tv/m3u8.php?url="},
		{"name":"M3U8","url":"https://jx.m3u8.tv/jiexi/?url="},
		{"name":"MUTV","url":"https://jiexi.janan.net/jiexi/?url="},
		{"name":"明日","url":"https://jx.yingxiangbao.cn/vip.php?url="},
		{"name":"磨菇","url":"https://jx.wzslw.cn/?url="},
		{"name":"诺诺","url":"https://www.ckmov.com/?url="},
		{"name":"诺讯","url":"https://www.nxflv.com/?url="},
		{"name":"OK","url":"https://okjx.cc/?url="},
		{"name":"PM","url":"https://www.playm3u8.cn/jiexi.php?url="},
		{"name":"盘古","url":"https://www.pangujiexi.cc/jiexi.php?url="},
		{"name":"全民","url":"https://jx.quanmingjiexi.com/?url="},
		{"name":"SSAMAO","url":"https://www.ssamao.com/jx/?url="},
		{"name":"思云","url":"https://jx.ap2p.cn/?url="},
		{"name":"思古","url":"https://api.sigujx.com/?url="},
		{"name":"思古2","url":"https://api.bbbbbb.me/jx/?url="},
		{"name":"思古3","url":"https://jsap.attakids.com/?url="},
		{"name":"淘电影","url":"https://jx.vodjx.top/vip/?url="},
		{"name":"维多","url":"https://jx.ivito.cn/?url="},
		{"name":"小蒋","url":"https://www.kpezp.cn/jlexi.php?url="},
		{"name":"小狼","url":"https://jx.yaohuaxuan.com/?url="},
		{"name":"星驰","url":"https://vip.cjys.top/?url="},
		{"name":"月亮","url":"https://api.yueliangjx.com/?url="},
		{"name":"云端","url":"https://jx.ergan.top/?url="},
		{"name":"云析","url":"https://jx.yparse.com/index.php?url="},
		{"name":"0523","url":"https://go.yh0523.cn/y.cy?url="},
		{"name":"17云","url":"https://www.1717yun.com/jx/ty.php?url="},
		{"name":"66","url":"https://api.3jx.top/vip/?url="},
		{"name":"116","url":"https://jx.116kan.com/?url="},
		{"name":"200","url":"https://vip.66parse.club/?url="},
		{"name":"8090","url":"https://www.8090g.cn/?url="}
	];
	let parseUrl;

	let list = '';
	for(let i in play_line_json) {
		list += `<div class="item" id="parseItem" data-url="${play_line_json[i].url}">${play_line_json[i].name}</div>`
	};
	
	let url = play_line_json[Math.floor(Math.random() * play_line_json.length)].url;
	
	$(document).on('click', function() {
		$('#list').removeClass('open')
	})
	$('#parseUrl').on('input', e => {
		parseUrl = e.target.value
	});
	$('#parseUrl').on('keydown', event => {
		if(event.keyCode == "13") {
			$('#save').click()
		}
	});
	$('#save').on('click', e => {
		if(!parseUrl) {
			toast('视频链接不能为空！（◐ˍ◑）')
			return
		}
		$('.video_wrap').fadeIn()
		$('.wrap').fadeOut()
		$('#videoPlayer').html('<p>加载中，请耐心等待</p>')
		startParse(url + parseUrl)
	});

	$('#list').html(list);

	$('.parse_way').on('click', function () {
		event.stopPropagation()
		$('#list').toggleClass('open')
	});
	$('#list').on('click', '#parseItem', function () {
		startParse($(this).data('url') + parseUrl)
		$(this).parent().removeClass('open')
	});
	
	$('.close_palyer').on('click', () =>{
		$('#videoPlayer').empty()
		$('.video_wrap').fadeOut()
		$('.wrap').fadeIn()
	});
	function startParse (url) {
		$('#videoPlayer').html(
		`
			<iframe
			 src="${url}"
			 class="t-iframe"
			 scrolling="no"
			 security="restricted"
			 frameborder="no"
			 border="0"
			 marginwidth="0"
			 marginheight="0"
			 scrolling="no"
			 sandbox="allow-forms allow-popups allow-scripts allow-same-origin">
			</iframe>
		`
		)
	}
	let timeer;
	function toast(t) {
		// $('.toast').empty()
		
		if($('.toast div').length > 0) clearTimeout(timeer)
		$('.toast').html(`<div>${t}</div>`)
		timeer = setTimeout(() => {
			$('.toast').empty()
		}, 2000)
		
	}
})(jQuery, window)