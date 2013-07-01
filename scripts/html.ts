# HTML Transformations go here

$("/html") {
  rewrite_links()
  absolutize_srcs()

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

  @import sections/scaffold.ts
  @import sections/footer.ts
  @import mappings.ts

  # lazyLoadImages()
}

