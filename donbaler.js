(function(a){
	a.fn.extend({
		Donbaler:function(b){
			var c={
				username:"donbaler",
				count:3,
				image_size:30,
				convert_links:1,
				loader_text:"در حال بارگزاری آخرین ارسالها ..."
			};
			var b=a.extend(c,b);
			return this.each(function(){
				var c=b;
				var d=a(this);
				a(d).append('<p id="Donbaler_loader" style="display:none;">'+c.loader_text+"</p>");
				a("#Donbaler_loader").slideDown();
				a.getJSON("http://donbaler.com/1/statuses/user_timeline/"+c.username+".json?count="+c.count+"&callback=?",function(b){
					a.each(b,function(b,e){
						a("#Donbaler_loader").slideUp("fast");
						a("#Donbaler_profile").text("");
						a("#Donbaler_profile").append('<div id="Donbaler_picture"><img src="'+e.user["profile_image_url"]+'" alt="'+e.user["name"]+'" width="30px" height="30px"></div><p id="donbaler-username"><a href="http://donbaler.com/'+c.username+'" target="_balnk">'+e.user["name"]+'</a></p><p style="color:#888888;">@'+c.username+'</p><table class="counts"><tr><td style="text-align:right"><a href="http://donbaler.com/'+c.username+'/tab:updates/filter:posts" target="_balnk"><span>'+e.user["statuses_count"]+'</span><br />پـسـت</a></td> <td style="text-align:center"><a href="http://donbaler.com/'+c.username+'/tab:coleagues/filter:followers" target="_balnk"><span>'+e.user["followers_count"]+'</span><br />دنبال‌کننده</a></td> <td style="text-align:left"><a href="http://donbaler.com/'+c.username+'/tab:coleagues/filter:ifollow" target="_balnk"><span>'+e.user["friends_count"]+"</span><br />دنبال‌شده</a></td></tr></table>");
						a("#Donbaler_profile").fadeIn("slow");
						a("#Donbaler_profile").append("");
						jtweet='<div id="dnbabzarak">';
						if(c.image_size!=0){
							today=new Date;
							jtweet+='<div id="Donbaler_tweet">';
						}
						var f=e.text;
						var g=e.created_at;
						if(c.convert_links!=0){
							f=f.replace(/(http\:\/\/[-a-z0-9._~:\/?#@!$&\'()*+,;=%]*)/g,'<a target="_blank" href="$1">[لینک]</a>');
							f=f.replace(/@([A-Za-z0-9\/_]*)/g,'<a target="_blank" href="http://donbaler.com/$1">@$1</a>');
							f=f.replace(/#([A-Za-z0-9\/\.آ-ی]*)/g,'<a target="_blank" href="http://donbaler.com/search/posttag:$1">#$1</a>')
						}
						jtweet+='<div id="Donbaler_text">';
						jtweet+=f;
						jtweet+="<br />";g=g.replace(/201.{1}/,"");
						g=g.replace(/\+00.{2}/,"");
						jtweet+='<a href="http://donbaler.com/'+e.user["screen_name"]+"/statuses/"+e.id+'" id="Donbaler_date">';
						jtweet+="</a></div>";
						jtweet+="</div>";
						a(d).append(jtweet);
					});
				})
			})
		}
	})
})(jQuery);