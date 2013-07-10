$("./body") {
	$("./div[@id='mw_body']") {
		add_class("mw_product")
		attribute("data-role","content")

		move_here("//div[@id='contentWrapper']") {
			$("./aside[@id='sideNavigation']") {
				$("./nav") {
					attribute("id","mw_main_nav")
				}
				add_class("mw_display_none")
			}

			$("./div[@id='detail']") {
				$("./div[@class='productsDetailsMain']") {
					$("./div[@id='productMedia']") {
						$("./div[@id='MainImageRegion']") {
							$("./img") {
								remove()
							}
              insert_bottom("div", id: "mw-img-holder")
						}
						$("./div[@class='thumbs-extramedia']") {
							$(".//img") {
								copy_to("./ancestor::div[@id='productMedia']/div[@id='MainImageRegion']/div[@id='mw-img-holder']", "bottom")
							}
              remove()
						}
						$("./div[@id='MainImageRegion']") {
              attributes(data-ur-set: "carousel", data-ur-carousel-component: "view_container", data-ur-id: "mw-img-carousel", data-ur-autoscroll: "enabled", data-ur-center: "enabled", data-ur-fill: "1", data-ur-autoscroll-delay: "3000", data-ur-android3d: "enabled")
              $("./div") {
                attributes(data-ur-carousel-component: "scroll_container")
                $("./img") {
                  attribute("src") {
                    value() {
                      replace(/\_t\.jpg/, ".jpg")
                    }
                  }
                  attribute("id") {
                    value() {
                      append("-carousel")
                    }
                  }
                  attribute("data-ur-carousel-component", "item")
                }
              }
              insert_bottom("div", data-ur-carousel-component: "dots")
						}
					}
					$("./div[@id='productDsc']") {
						$("./div[@id='productActions']") {
							$("./div[@class='wishlistbuttonclass']") {
								$("./input[@class='addtowishlistclass']") {
							    wrap('a', class: 'mw_AddToWishList', data-title: 'Add to Wishlist');
								}
							}

							$("./a[@class='sc']") {
								add_class("mw_size_chart")
								attribute("data-title","Size Chart")
							}
						}
					}
					$("./div[@id='alsoBought']") {
						$("./div[@class='assocProdItem']") {
							attribute("data-ur-carousel-component","item")
						}

						inner_wrap("div") {
							attribute("data-ur-carousel-component","scroll_container")
						}

						inject_bottom("<div data-ur-carousel-component='button' data-ur-carousel-button-type='prev'>Prev</div>")
						inject_bottom("<span data-ur-carousel-component='count'> -- count -- </span>")
						inject_bottom("<div data-ur-carousel-component='button' data-ur-carousel-button-type='next'>Next</div>")

						inner_wrap("div") {
							attribute("data-ur-set","carousel")
							attribute("data-ur-carousel-component","view_container")
						}

						move_here(".//div[@id='headAlsoBought']","top")
					}

					$("./div[@id='recViewed']") {
						$("./div[@class='assocProdItem']") {
							attribute("data-ur-carousel-component","item")
						}

						inner_wrap("div") {
							attribute("data-ur-carousel-component","scroll_container")
						}

						inject_bottom("<div data-ur-carousel-component='button' data-ur-carousel-button-type='prev'>Prev</div>")
						inject_bottom("<span data-ur-carousel-component='count'> -- count -- </span>")
						inject_bottom("<div data-ur-carousel-component='button' data-ur-carousel-button-type='next'>Next</div>")

						inner_wrap("div") {
							attribute("data-ur-set","carousel")
							attribute("data-ur-carousel-component","view_container")
						}

						move_here(".//div[@id='headRecentlyViewed']","top")
					}
				}
			}
		}
	}

	$("./div[@id='site']") {
		add_class("mw_display_none")
	}
}
