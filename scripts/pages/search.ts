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
							
							$("./div[@id='sli_topbox']") {
								move_here("//div[@id='sli_facets']","after") {
									attribute("data-ur-set","toggler")
									
									inner_wrap("div") {
										attribute("data-ur-toggler-component","content")
										attribute("data-ur-state","disabled")
									}
									inject_top("<h2 data-ur-toggler-component='button' data-ur-state='disabled'>Narrow your search</h2>")
									
									$(".//div[@class='sli_facet_container']") {
										inject_top("<div class='mw_filter_price' data-ur-set='toggler'></div>")
										inject_top("<div class='mw_filter_size' data-ur-set='toggler'></div>")
										inject_top("<div class='mw_filter_color' data-ur-set='toggler'></div>")
										inject_top("<div class='mw_filter_category' data-ur-set='toggler'></div>")
										
										
										$("./h3[1]") {
											attribute("data-ur-toggler-component","button")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_category']")
										}
										
										$("./ul[@class='sli_facets'][1]") {
											attribute("data-ur-toggler-component","content")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_category']")
										}
										
										$("./h3[1]") {
											attribute("data-ur-toggler-component","button")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_color']")
										}
										
										$("./ul[@class='sli_facets'][1]") {
											attribute("data-ur-toggler-component","content")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_color']")
										}
										
										$("./h3[1]") {
											attribute("data-ur-toggler-component","button")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_size']")
										}
										
										$("./ul[@class='sli_facets'][1]") {
											attribute("data-ur-toggler-component","content")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_size']")
										}
										
										$("./h3[1]") {
											attribute("data-ur-toggler-component","button")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_price']")
										}
										
										$("./ul[@class='sli_facets'][1]") {
											attribute("data-ur-toggler-component","content")
											attribute("data-ur-state","disabled")
											move_to("//div[@class='mw_filter_price']")
										}
									}
								}
							}
							
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