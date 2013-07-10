%menu_uranium_id = "navigation_menu"

$('./body') {
	remove('.//script[contains(@src, "jquery")]');

	$("./header[@id='mw_header']") {
    add_class("mw_logo_center")
    attribute("data-role","content")

    #### Insert a colored bar at the top of the header
    insert_colored_bar()

    #### Insert the top row of the site header, including buttons and logo
    insert_header_top_row() {
      insert_header_buttons("left") {
        insert_menu_button(%menu_uranium_id)
      }
      insert_header_buttons("right") {
        %cart_counter_text = strip_non_digits(fetch(xpath_from_body("div[@id='cart-info']/a/span[@class='cartCount']/text()"))) # CHANGE THIS
        insert_cart_button_with_counter("/store/shoppingcart.aspx", %cart_counter_text) # CHANGE THIS
      }
      grab_site_logo("/html/body//a[@id='mainLogo']") # CHANGE THIS

      $("./div[@id='mw_site_logo']") {
	      $("./a[@id='mainLogo']") {
			    inject_top("True Religion Brand Jeans")
	      }
      }
    }

    #### Insert a search form under the site header
    #insert_search_bar("get", "search.php", "return check_small_search_form()") # CHANGE THIS

    move_here("//div[@id='searchContainer']") {
		attribute("class","mw_search_bar")


		## Search Page
		$("./form") {
			move_here(".//input[@id='searchSubmit']","top") {
				add_class("mw_search_btn")
			}
		}

		$(".//input[@id='sli_search_1']") {
			add_class("mw_search_field")

			wrap("div") {
				add_class("mw_search_field_container")
			}
		}

		## Home Page
		$("./input[@id='searchfield']") {
			add_class("mw_search_field")

			wrap("div") {
				add_class("mw_search_field_container")
			}
		}
		$("./a[@id='searchSubmit']") {
			add_class("mw_search_btn")
			move_to("//div[@id='searchContainer']","top")
		}
    }
  }

  ##### Insert the navigation menu
  insert_menu_content(%menu_uranium_id)

  #### Traverse the original site's navigation and send the menu links to the constructed header
  #### EVERYTHING BELOW THIS LINE SHOULD BE MODIFIED FOR YOUR SITE ####

  $(xpath_from_body("nav[@id='mw_main_nav']")) {
    $("h2/a") {
      insert_menu_item(fetch("text()"), "")
    }

    $("div[contains(@id,'womensnav')]") {
	    add_class("mw_nav_sub_content")

		  move_to("//div[@class='mw_nav_item'][1]//ul[@class='mw_nav_content']")
    }

    $("div[contains(@id,'mensnav')]") {
	    add_class("mw_nav_sub_content")

		  move_to("//div[@class='mw_nav_item'][2]//ul[@class='mw_nav_content']")
    }

    $("div[contains(@id,'kidsnav')]") {
	    add_class("mw_nav_sub_content")

		  move_to("//div[@class='mw_nav_item'][3]//ul[@class='mw_nav_content']")
    }

    $("div[contains(@id,'pressnav')]") {
	    add_class("mw_nav_sub_content")

		  move_to("//div[@class='mw_nav_item'][4]//ul[@class='mw_nav_content']")
    }
  }

  $(xpath_from_body("div[@id='user-utility']")) {
	  $("a[contains(@id,'signIn')]") {
	    add_class("mw_nav_btn_link")
	    wrap("div", class: "mw_nav_btn") {
			  wrap("div", class: "mw_nav_item") {
				  move_to("/html/body/div[@id='mw_menu_content']")
			  }
	    }

		  move_to("//div[@class='mw_nav_item'][6]//ul[@class='mw_nav_content']")
    }
  }

  $(xpath_from_body("div[@id='header-nav']")) {
	  $("ul/li[2]/a") {
	    add_class("mw_nav_btn_link")
	    wrap("div", class: "mw_nav_btn") {
			  wrap("div", class: "mw_nav_item") {
				  move_to("/html/body/div[@id='mw_menu_content']")
			  }
	    }

		  move_to("//div[@class='mw_nav_item'][7]//ul[@class='mw_nav_content']")
    }
  }

  $(xpath_from_body("div[@id='header-nav']")) {
	  $("ul/li[3]/a") {
	    add_class("mw_nav_btn_link")
	    wrap("div", class: "mw_nav_btn") {
			  wrap("div", class: "mw_nav_item") {
				  move_to("/html/body/div[@id='mw_menu_content']")
			  }
	    }

		  move_to("//div[@class='mw_nav_item'][8]//ul[@class='mw_nav_content']")
    }
  }

  $(xpath_from_body("div[@id='header-nav']")) {
	  $("ul/li[1]") {
	    wrap("div", class: "mw_nav_btn") {
			  wrap("div", class: "mw_nav_item") {
				  move_to("/html/body/div[@id='mw_menu_content']")
			  }
	    }

		  move_to("//div[@class='mw_nav_item'][9]//ul[@class='mw_nav_content']")
    }
  }

  ## To insert a visual separator in the navigation menu
  insert_menu_item_separator("Account") {
    move_to("../*[5]", "after")
  }
	insert_menu_item_separator("More Options") {
    move_to("../*[7]", "after")
  }
  ## To insert a link at the same level as the navigation menu accordions
  # insert_menu_top_level_link("Example Top Level Link", "www.example.com")

  $(".//script") {
	    text(){
	        rewrite_link();
	    }
	    move_to("/html/body", "bottom");
	}

	remove("script[contains(@src, 'steelhouse')]");

	$(".//div[@class='aspNetHidden']"){
	    move_to("/html/body/div[@id='mw_body']", "top");
	}

	remove(".//form[contains(@id, 'HtmlForm')]");

	$(".//span[@id='mw_cart_counter']"){
	    attributes(class: "cartCount");
	}

	$("div[@id='mw_body']"){
	    insert_top("div", class: "cartDropDown");
	    inner_wrap("form", onsubmit: $form_onsubmit, action: $form_action, method: "post", id: $form_id);
	}
}


