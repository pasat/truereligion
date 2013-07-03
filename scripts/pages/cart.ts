$("./body") {
	$("./div[@id='mw_body']") {
		add_class("mw_cart")
		attribute("data-role","content")
		
		move_here("//div[@id='contentWrapper']") {
			$("./aside[@id='sideNavigation']") {
				$("./nav") {
					attribute("id","mw_main_nav")
				}
				add_class("mw_display_none")
			}
			
			$("./div[@id='cart']") {
				$("./div[@id='breadCrumb']") {
					add_class("mw_display_none")
				}
				
				$("./div[@id='cartContent']") {
					$("./table[@id='cartGrid']") {
						$(".//td[@class='cartItemButtons']") {
							$(".//span[contains(@class,'wide')]") {
								add_class("mw_display_none")
							}
							
							$(".//input[contains(@class,'lnkBtnRemove')]") {
								wrap('a', class: 'mw_remove', data-title: 'Remove');
							}
							
							$(".//input[contains(@class,'lnkBtnUpdate')]") {
								wrap('a', class: 'mw_update', data-title: 'Update');
							}
						}
					}
					
					$("./div[@id='cartButtons']") {
						$("./div[contains(@class,'relative')]") {
							$("./input[contains(@class,'lnkBtnCheckout')]") {
								wrap('a', class: 'mw_checkout', data-title: 'Checkout');
							}
							
							$("./span[contains(@class,'red')]") {
								add_class("mw_display_none")
							}
						}
					}
					$("./div[@id='bottomNav']") {
						add_class("mw_display_none")
					}
				}
			}
		}
	}
	
	$("./div[@id='site']") {
		add_class("mw_display_none")
	}
}