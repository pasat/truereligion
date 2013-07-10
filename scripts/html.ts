# HTML Transformations go here

$("/html[1]") {
  rewrite_links()
  absolutize_srcs()

  $("./head") {
    insert("link", rel: "stylesheet", type: "text/css", href: "http://fonts.googleapis.com/css?family=Francois+One")
	}

  # Add the mobile meta tags
  clean_mobile_meta_tags()

  # Needed to begin mobilizing
  # remove_all_styles()
  remove_html_comments()

  $(".//link[contains(@href,'layout/css/main.css')]") {
		remove()
	}

  # Late load all the images on the site
  # lateload()

  # Remove all script tags not marked with "data-keep" attribute
  # remove_desktop_js();

  # Include mw_analytics file to track the mobile site
  @import "mw_analytics.ts"

  add_assets()

  $('./body'){
    $('.//form[contains(@id, "HtmlForm")]'){
      $form_onsubmit = fetch('@onsubmit');
      $form_action = fetch('@action');
      $form_id = fetch('@id');
    }
  }

  @import sections/scaffold.ts
  @import sections/footer.ts
  @import mappings.ts

  # lazyLoadImages()
}

