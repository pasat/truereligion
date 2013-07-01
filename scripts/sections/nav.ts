$("./body") {
	inject_top(read("nav.html")) {
		add_class("mw_display_none")
		attribute("id","mw_main_nav")
	}
}