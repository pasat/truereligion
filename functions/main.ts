####################
### Site Functions
####################

# A compendium of ways to "dump" tables
#
#
# EXAMPLE::
#
# table_dump(".//table") {
#   $("./div[class='some-class']") {
#     add_class("mw-more-scopes")
#   }
# }
#
#
@func XMLNode.table_dump(Text %xpath){
  $(%xpath) {
    name("div")
    add_class("mw-was-table")

    $(".//table | .//tr | .//td | .//th | .//thead | .//tfoot | .//tbody | .//col | .//colgroup | .//caption") {
      %i = index()
      %n = name()
      name("div")
      attributes(data-mw-id: concat("mw-dump-", %n, %i), width: "")
      add_class(concat("mw-was-", %n))
    }

    yield()
  }
}



# Remove Styles Functions
@func XMLNode.remove_external_styles() {
  remove(".//link[@rel='stylesheet'][not(@data-mw-keep)]")
}
@func XMLNode.remove_internal_styles() {
  remove(".//style")
}
@func XMLNode.remove_all_styles() {
  remove(".//link[@rel='stylesheet'][not(@data-mw-keep)]|.//style")
}

# Remove Scripts
@func XMLNode.remove_external_scripts() {
  remove(".//script[@src]")
}
@func XMLNode.remove_internal_scripts() {
  remove(".//script[not(@src)]")
}
@func XMLNode.remove_scripts() {
  remove(".//script")
}
@func XMLNode.remove_desktop_js() {
  remove("//script[@src and (not(@data-keep) or @data-keep='false') and not(contains(@src,'ScriptResource.axd'))]")
}

# Remove HTML Comment Tags
@func XMLNode.remove_html_comments() {
  remove(".//comment()")
}

# Remove existing conflicting meta tags
@func XMLNode.remove_meta_tags() {
  # Remove only existing meta tags for which we will add our own
  remove(".//meta[@name='viewport']|.//meta[@name='format-detection']")
}

# Add Meta Tags
@func XMLNode.insert_mobile_meta_tags() {
  $("/html/head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")
  }
}

# Add Canonical Tag
@func XMLNode.add_canonical_tag() {
  $("/html/head") {
    # Inject a canonical link as long as there isn't already one.
    $canonical_found = "false"
    $(".//link[@rel='canonical']") {
      $canonical_found = "true"
    }
    match($canonical_found) {
      with(/false/) {
        insert("link", rel: "canonical", href: concat("http://", $source_host, $path))
      }
    }
  }
}

# Clean Meta Tags
@func XMLNode.clean_mobile_meta_tags() {
  remove_meta_tags()
  insert_mobile_meta_tags()
  add_canonical_tag()
}

# Add the favicon
@func XMLNode.add_favicon() {
  $("/html/head") {
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
  }
}

# Add home screen icons
@func XMLNode.add_apple_touch_icons() {
  $("/html/head") {
    # The images below are placeholders, get real ones from the client
    # Change to -precomposed to not have the glass effect on the icons
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-57x57.png"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-114x114.png"))
  }
}

# Add the generated stylesheet
@func XMLNode.add_mobile_stylesheet() {
  $("/html/head") {
    $script="true"
    $("./script[1]") {
      $script="false"
      insert_before("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet), data-mw-keep: "true")
    }
    match($script) {
      with("true") {
        insert_before("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet), data-mw-keep: "true")
      }
    }
  }
}

# Add the mobile javascript
# Using the variable-setting logic as relying solely on presence of script tags
# is dangerous when removing js or simply on sites with no js.
@func XMLNode.add_mobile_javascript() {
  $("/html/head") {
    $noscript="true"
    $("./script[1]") {
      $noscript="false"
      insert_before("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
    }
    match($noscript) {
      with("true") {
        insert_bottom("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
      }
    }
  }
}

# Add in our Assets
@func XMLNode.add_assets() {
  add_favicon()
  add_apple_touch_icons()
  add_mobile_stylesheet()
  add_mobile_javascript()
}

# Rewrite meta redirects
@func XMLNode.rewrite_meta_refresh() {
  $("/html/head/meta") {
    %refresh_tag = fetch("@http-equiv")
    match(normalize(%refresh_tag)) {
      with(/refresh/i) {
        attribute("content") {
          value() {
            replace(/(.*?;)(URL=)?(.*)/i) {
              %timeout = $1
              %prefix = $2
              %url = $3
              %url {
                rewrite_link()
              }
              set(%timeout + %prefix + %url)
            }
          }
        }
      }
    }
  }
}

# Rewrite items
@func XMLNode.rewrite_links() {
  $rewriter_url = "false"
  $("/html/body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite_link()
        }
      }
    }
    $("/html/head/base[@href]") {
      $rewriter_url = fetch("./@href")
      $rewriter_url {
        replace(/.*(\/\/[\w\.]+\/).*/, "$1")
      }
      attribute("href") {
        value() {
          rewrite_link()
        }
      }
    }
    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite_link()
        }
      }
    }
  }
  rewrite_meta_refresh()
}

# Absolutize Items
@func XMLNode.absolutize_srcs() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    set($path)
    # remove the query parameters
    replace(/([^\?]+)\?(.*)/, "$1")
    # the 'slash_path' is the path of this page without anything following it's last slash
    replace(/[^\/]+$/, "")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src and not(contains(@src, 'WebResource.axd') or contains(@src, 'ScriptResource.axd'))]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src")
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }
}

@func XMLNode.relocate_scripts() {
  $("/html/body/script") {
    move_to("/html/body", "bottom")
  }
}

# This function lateloads all images and moves scripts to the bottom of the body, place function at end of html.ts
@func XMLNode.lateload() {
  $(".//script") {
    move_to("//html/body")
  }
  $(".//img") {
    attribute("src") {
      name("data-ur-ll-src")
    }
  }
}

@func XMLNode.lazyLoadImages() {
  $(".//img") {
    attribute("src") {
      name("data-src")
    }
  }
}

# The following function below is deprecated in favor of
# a different techinique. Please read this
# http://help.moovweb.com/entries/22405671-a-solution-for-buttons-as-input-images
# before using the btn_delegate function. It won't work on
# lots of sites and is a hack.
#
# BTN DELEGATE :: DEPRECATED
#
# Usage:
# Some input type='image' can't be changed to type='submit'
# This function creates a fake button to click that image input.
# It will sometimes fail though as the button can't have a
# javascript fired click event.
#
# EXAMPLE CSS
# .mw_hide2 {
#   visibility: hidden!important;
#   position: absolute!important;
#   left: -99999px!important;
# }

#  EXAMPLE TS
#
#  $(".//input[@type='submit']") {
#    attributes(id: "mw_id", alt: "mw_alt")
#
#    btn_delegate() {
#      add_class("mw_btn_500000000050")
#      // in a pinch you can do other scoping in here
#    }
#  }
# @func XMLNode.btn_delegate() {
#   %class = fetch("./@class")
#   %mw_id = concat("mw_", name(), "_", fetch("./@id"))
#   %text = fetch("./@alt")
#
#   %text {
#     replace(/_/, " ")
#   }
#
#   insert_before("div", %text, class: %class) {
#     attributes(onclick: concat("var event=arguments[0]||window.event;event.preventDefault;event.stopPropagation;x$('[data-mw-btn-id=\"", %mw_id, "\"]').click()"))
#
#     yield()
#   }
#
#   attributes(data-mw-btn-id: %mw_id)
#   add_class("mw_hide2")
# }

@func Text.inferred_content_type() {
  $inferred_content_type = $content_type
  match($x_requested_with, /XMLHttpRequest/) {
    match($content_type, /html/) {
      match(this(), /\A\s*(\[.*\]|{.*}|".*"|\d+|true|false)\s*\Z/m) {
        $inferred_content_type = "application/json"
      }
    }
  }
  $inferred_content_type
}


##############################################################
#### ---------------------------------------------------- ####
#### ~:~:~:~:~:~:~:~:~ HELPER FUNCTIONS ~:~:~:~:~:~:~:~:~ ####
#### ---------------------------------------------------- ####
##############################################################

################################
# XMLNode.yield_if_not_blank() #
################################
# !HELPER
#
# @desc
# -----
# A control function that yields to any nested Tritium code if the argument string is not empty.
#
# @args
# -----
# @arg Text %str => the string to test for non-emptiness
@func XMLNode.yield_if_not_blank(Text %str) {
  match(%str) {
    with(/^.+$/) {
      yield()
    }
  }
}

############################
# XMLNode.yield_if_blank() #
############################
# !HELPER
#
# @desc
# -----
# A control function that yields to any nested Tritium code if the argument string IS empty.
#
# @args
# -----
# @arg Text %str => the string to test for emptiness
@func XMLNode.yield_if_blank(Text %str) {
  match(%str) {
    with("") {
      yield()
    }
  }
}

#############################
# XMLNode.xpath_from_body() #
#############################
# !HELPER
#
# @desc
# -----
# Constructs an XPath expression with /html/body as the root
#
# @args
# -----
# @arg Text %path => the relative XPath expression
@func XMLNode.xpath_from_body(Text %path) {
  %rel_path = %path
  %rel_path {
    %regex = "^[\\.]?[\\/]?[\\/]?"
    replace(regexp(%regex), "")    
  }
  %abs_path = "/html/body//" + %rel_path
}

############################
# XMLNode.get_image_path() #
############################
# !HELPER
#
# @desc
# -----
# Generates a file path to the default /images directory
#
# @args
# -----
# @arg Text %filename => the relative path, including file name, of an image file under the images directory, e.g. "icons/menu.png"
#
# @return => the full relative path for use with the assets() function
# 
# @usage
# ======
# @example
# --------
# assets(get_image_path('icons/menu.png')) # => assets("images/icons/menu.png")
@func XMLNode.get_image_path(Text %filename) {
  %image_path = "images/" + %filename
}

##############################
# XMLNode.strip_non-digits() #
##############################
# !HELPER
#
# @desc
# -----
# Removes all non-digit characters from a string.
#
# @args
# -----
# @arg Text %str => the string to remove all non-digit characters from
#
# @return => the new string without any non-digits
# 
# @usage
# ======
# @example
# --------
# strip_non_digits(" (19 items)") # => "19"
@func XMLNode.strip_non_digits(Text %str) {
  %new_str = %str
  %new_str {
    replace(/\D/, "")
  }
  %new_str
}

##############################################################
#### ---------------------------------------------------- ####
#### ~:~:~:~:~:~:~:~:~ HEADER FUNCTIONS ~:~:~:~:~:~:~:~:~ ####
#### ---------------------------------------------------- ####
##############################################################

################################
# XMLNode.insert_colored_bar() #
################################
# !GENERATOR
#
# @desc
# -----
# Inserts an empty div for the sole purpose of inserting a colored horizonal rule.
@func XMLNode.insert_colored_bar() {
  insert("div", class: "mw_colored_bar") {
    yield()
  }
}

###################################
# XMLNode.insert_header_top_row() #
###################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a standard Header top row.
@func XMLNode.insert_header_top_row() {
  insert("div", id: "mw_header_top_row") {
    yield()
  }
}

############################
# XMLNode.grab_site_logo() #
############################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for the site's logo.
#
# @args
# -----
# @arg Text %logo_xpath => XPath expression for the logo from the original HTML.
@func XMLNode.grab_site_logo(Text %logo_xpath) {
  insert("div", id: "mw_site_logo") {
    yield()
    move_here(%logo_xpath)
  }
}

##############################
# XMLNode.insert_site_logo() #
##############################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for the site's logo.
#
# @args
# -----
# @arg Text %href => The URL that the logo leads to.
# @arg (Optional) Text %img_src => The image file as a relative path
@func XMLNode.insert_site_logo(Text %href) {
  insert("div", id:"mw_site_logo") {
    insert("a") {
      yield()
    }
  }
}
@func XMLNode.insert_site_logo(Text %href, Text %img_src) {
  insert_site_logo(%href) {
    insert("img", src: asset(get_image_path(%img_src)))
    yield()
  }
}

###################################
# XMLNode.insert_header_buttons() #
###################################
# !GENERATOR
#
# @desc
# -----
# Inserts template header buttons.
#
# @args
# -----
# @arg Text %additional_classes => optionally appends additional classes to the header buttons ul
@func XMLNode.insert_header_buttons() {
  insert("ul", class: "mw_header_btns") {
    yield()  
  }
}
@func XMLNode.insert_header_buttons(Text %additional_classes) {
  insert_header_buttons() {
    add_class(%additional_classes)
    yield()
  }
}

################################
# XMLNode.insert_header_link() #
################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a standard Header link button.
#
# @args
# -----
# @arg Text %id => The HTML element's ID
# @arg Text %href => The URL that this anchor points to.
@func XMLNode.insert_header_link(Text %id, Text %href) {
  insert("li") {
    attribute("id", %id)
    insert("a", href: %href)
    yield()
  }
}
@func XMLNode.insert_account_button(Text %href) {
  insert_header_link("mw_account", %href) {
    yield()
  }
}
@func XMLNode.insert_cart_button(Text %href) {
  insert_header_link("mw_cart", %href) {
    yield()
  }
}
@func XMLNode.insert_cart_button_with_counter(Text %href, Text %xpath) {
  insert_cart_button(%href) {
    $("a") {
      insert("span", id: "mw_cart_counter") {
        text(%xpath)
      }
      %counter_text = fetch("span/text()")
      yield_if_blank(%counter_text) {
        $(xpath_from_body("span[@id='mw_cart_counter']")) {
          text("0")
        }
      }
    }
    yield()
  }
}

###############################
# XMLNode.insert_search_bar() #
###############################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a search bar.
# Yields to the form element.
#
# @args
# -----
# @arg Text %method => 
# @arg Text %action => 
# @arg Text %onsubmit =>
@func XMLNode.insert_search_bar(Text %method, Text %action, Text %onsubmit) {
  insert("div", class: "mw_search_bar") {
    insert("form", method: %method, action: %action, onsubmit: %onsubmit) {
      insert("input", type: "submit", class: "mw_search_btn", value: " ")
      insert("div", class: "mw_search_field_container") {
        insert("input", type: "text", placeholder: "Search", class: "mw_search_field", autocorrect: "off", autocapitalize: "off")
      }
      yield()
    }
  }
}

################################
# XMLNode.insert_menu_button() #
################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a standard Menu button.
# Does NOT insert the Menu content.
# This generator function uses a Uranium Toggler.
#
# @args
# -----
# @arg Text %uranium_id => The Uranium ID that keys this button to a Uranium content div with the same ID.
@func XMLNode.insert_menu_button(Text %uranium_id) {
  insert("li", id: "mw_menu_btn", data-ur-id: %uranium_id, data-ur-toggler-component: "button") {
	  insert("a", href: "#mw_menu_content")
    # yield()
  }
}



#################################
# XMLNode.insert_menu_content() #
#################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a standard Navigation Menu.
# Does NOT insert the Menu button.
# This generator function uses a Uranium Toggler.
#
# Also sets the global variable $menu_content_path
#
# @args
# -----
# @arg Text %uranium_id => The Uranium ID that keys this content to a Uranium button div with the same ID.
@func XMLNode.insert_menu_content(Text %uranium_id) {
  insert("div", id: "mw_menu_content", data-role: "panel") {
    move_to("/html/body/header[@id='mw_header']", "before")
    $menu_content_path = path()
    yield()
  }
}

##############################
# XMLNode.insert_menu_item() #
##############################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a standard Navigation Menu Item inside the standard Navigation Menu.
# This generator function uses a Uranium Toggler.
#
# Also sets the global variable $menu_content_path
#
# @args
# -----
# @arg Text %category => The string to display on the nav item's button. Usually a product category.
# @arg Text %href => The URL of the main category link. If this argument isn't blank, an "All" link is automatically added to the list of sub-links.
@func XMLNode.insert_menu_item(Text %category, Text %href) {
  insert("div", class: "mw_nav_item") {
    insert("div", class: "mw_nav_btn") {
      insert("div", class: "mw_nav_btn_inner") {
        text(%category)
      }
    }
    insert("ul", class: "mw_nav_content") {
      yield_if_not_blank(%href) {
        insert("li", class: "mw_nav_sub_content") {
          insert("a", href: %href) {
            insert("div", class: "mw_nav_sub_content_inner") {
              text("All " + %category)
            }
          }
        }
      }
      yield()
    }
    ur_toggler("div[@class='mw_nav_btn']", "ul[@class='mw_nav_content']")
    move_to($menu_content_path, "bottom")
    $("ul[@class='mw_nav_content']") {
      $menu_item_content_path = path()
    }
  }
}

###################################
# XMLNode.insert_menu_item_link() #
###################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a standard Navigation Menu Item Link inside a standard Navigation Menu Item.
#
# @args
# -----
# @arg Text %subcategory => The string to display on the link. Usually a product subcategory.
# @arg Text %href => The URL that this anchor points to.
@func XMLNode.insert_menu_item_link(Text %subcategory, Text %href) {
  insert("li", class: "mw_nav_sub_content") {
    insert("a", href: %href) {
      insert("div", class: "mw_nav_sub_content_inner") {
        text(%subcategory)
      }
    }
    move_to($menu_item_content_path, "bottom")
    yield()
  }
}

########################################
# XMLNode.insert_menu_top_level_link() #
########################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a top-level Navigation Menu Item Link inside a standard Navigation Menu Item.
#
# @args
# -----
# @arg Text %category => The string to display on the link. Usually a product category.
# @arg Text %href => The URL that this anchor points to.
@func XMLNode.insert_menu_top_level_link(Text %category, Text %href) {
  insert("div", class: "mw_nav_item") {
    insert("a", class: "mw_nav_top_level_link", href: %href) {
      insert("div", class: "mw_nav_top_level_link_inner") {
        text(%category)
      }
    }
    move_to($menu_content_path, "bottom")
  }
}

########################################
# XMLNode.insert_menu_item_separator() #
########################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a navigation menu separator.
#
# @args
# -----
# @arg Text %supercategory => The text to display inside this separator
@func XMLNode.insert_menu_item_separator(Text %supercategory) {
  insert("div", class: "mw_nav_item_separator") {
    text(%supercategory)
    move_to($menu_content_path)
    yield()
  }
}

##############################################################
#### ---------------------------------------------------- ####
#### ~:~:~:~:~:~:~:~:~ FOOTER FUNCTIONS ~:~:~:~:~:~:~:~:~ ####
#### ---------------------------------------------------- ####
##############################################################

######################################
# XMLNode.insert_footer_accordions() #
######################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for accordions in the footer.
@func XMLNode.insert_footer_accordions() {
  insert("div", id: "mw_footer_accordions_container") {
    insert("div", id: "mw_footer_accordions")
  }
}

####################################
# XMLNode.insert_footer_nav_item() #
####################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a navigation item in the footer.
#
# @args
# -----
# @arg Text %category => The string to display on the nav item's button. Usually a footer category.
# @arg Text %href => The URL of the main category link. If this argument isn't blank, an "All" link is automatically added to the list of sub-links.
@func XMLNode.insert_footer_nav_item(Text %category, Text %href) {
  insert("div", class: "mw_nav_item") {
    insert("div", class: "mw_nav_btn") {
      insert("div", class: "mw_nav_btn_inner") {
        text(%category)
      }
    }
    insert("ul", class: "mw_nav_content") {
      yield_if_not_blank(%href) {
        insert("li", class: "mw_nav_sub_content") {
          insert("a", href: %href) {
            text("All " + %category)
          }
        }
      }
      yield()
    }
    ur_toggler("div[@class='mw_nav_btn']", "ul[@class='mw_nav_content']")
    move_to(xpath_from_body("div[@id='mw_footer_accordions']"), "bottom")
    $("ul[@class='mw_nav_content']") {
      $footer_nav_item_content_path = path()
    }
  }
}

#########################################
# XMLNode.insert_footer_nav_item_link() #
#########################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a navigation item link in the footer.
#
# @args
# -----
# @arg Text %subcategory => The string to display on the nav item's button. Usually a footer subcategory.
# @arg Text %href => The URL of the subcategory link.
@func XMLNode.insert_footer_nav_item_link(Text %subcategory, Text %href) {
  insert("li", class: "mw_nav_sub_content") {
    insert("a", href: %href) {
      insert("div", class: "mw_nav_sub_content_inner") {
        text(%subcategory)
      }
    }
    move_to($footer_nav_item_content_path, "bottom")
    yield()
  }
}

##################################
# XMLNode.insert_footer_bottom() #
##################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for the bottom section of the footer.
@func XMLNode.insert_footer_bottom() {
  insert("div", id: "mw_footer_bottom") {
    yield()
  }
}

#####################################
# XMLNode.insert_footer_copyright() #
#####################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a copyright notice in the footer.
#
# @args
# -----
# @arg Text %display # => The text to display inside the copyright notice.
@func XMLNode.insert_footer_copyright(Text %display) {
  insert("div", id: "mw_footer_copyright") {
    text(%display)
  }
}

####################################
# XMLNode.insert_moovweb_callout() #
####################################
# !GENERATOR
#
# @desc
# -----
# Inserts the HTML for a "powered by Moovweb" callout.
#
# @args
# -----
# @arg Text %img_src # => The image to use for the Moovweb callout.
@func XMLNode.insert_moovweb_callout(Text %img_src) {
  insert("div", id: "mw_moovweb_callout") {
    insert("div", id: "mw_moovweb_callout_content") {
      insert("span") {
        text("powered by")
      }
      insert("img", id: "mw_moovweb_logo", src: asset(get_image_path(%img_src)))
    }
  }
}