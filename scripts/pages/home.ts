$("./body") {
	$(".//script[contains(@src,'/layout/js/main.js')]") {
    attributes(src: asset('javascript/m_main.js'))
	}
	insert_at("bottom", "script", data-keep: "true", type: "text/javascript", src: asset("javascript/home.js"))
	
	$("./div[@id='mw_body']") {
		add_class("mw_home")
		attribute("data-role","content")
		
		move_here("//div[@id='contentWrapper']") {
			$("./aside[@id='sideNavigation']") {
				$("./nav") {
					attribute("id","mw_main_nav")
				}
				add_class("mw_display_none")
			}
		}
	}
	
	$("./div[@id='site']") {
		add_class("mw_display_none")
	}
}