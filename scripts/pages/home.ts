$("./body") {
	$("./div[@id='mw_body']") {
		add_class("mw_home")
		attribute("data-role","content")
		
		move_here("//div[@id='contentWrapper']")
	}
}