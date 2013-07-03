$("./body") {
	$("./div[@id='mw_body']") {
		add_class("mw_storelocator")
		attribute("data-role","content")
		
		move_here("//div[@id='site']") {
			$(".//header[@id='primary-header']") {
				add_class("mw_display_none")
			}
			
			$(".//div[@id='primary-footer']") {
				add_class("mw_display_none")
			}
			
			$(".//div[@id='contentWrapper']") {
				$("./aside[@id='sideNavigation']") {
					$("./nav") {
						attribute("id","mw_main_nav")
					}
					add_class("mw_display_none")
				}
				
				$("./div[@id='locator']") {
					$("./div[@id='breadCrumb']") {
						add_class("mw_display_none")
					}
					
					$("./div[@id='locatorContent']") {
						$("./h1") {
							inner() {
								replace("RETAIL STORES" , "Retail Stores")
							}
						}
						
						$("./div[@id='locatorControls']") {
							$("./div[@id='byZip']|./div[@id='byState']|./div[@id='byCountry']") {
								$("./div[contains(@class,'relative')]") {
									$("./input[contains(@class,'button')]") {
										wrap('span', class: 'mw_submit', data-title: 'Submit');
									}
									
									$("./span[contains(@class,'wide')]") {
										add_class("mw_display_none")
									}
								}
							}
						}
						
						$("./div[@id='locatorMap']") {
							add_class("mw_display_none")
						}
					}
				}	
			}
		}
	}
}