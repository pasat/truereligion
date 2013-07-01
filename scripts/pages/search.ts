$("./body") {
	$("./div[@id='mw_body']") {
		add_class("mw_search")
		attribute("data-role","content")
		
		move_here("//div[@id='contentWrapper']") {
			$("./aside[@id='sideNavigation']") {
				$("./div[@class='leftnav']") {
					$("./div[@id='list']") {
						$("./div[@id='breadCrumb']") {
							add_class("mw_display_none")
						}
						
						$("./div[@class='main-content']") {
							move_here("./div[@id='merchTopResults']","top")
							
							$("./div[@id='grid']") {
								$("./div[@class='sli_clear']") {
									remove()
								}
							}
						}
					}
				}
				$("./div[@id='primary-footer']") {
					add_class("mw_display_none")
				}
			}
		}
	}
	
	$("./div[@id='site']") {
		add_class("mw_display_none")
	}
}