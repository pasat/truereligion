$("./body") {
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