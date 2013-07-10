# The main file executed by Tritium. The start of all other files.
match($path){
  with(/shoppingcartcost.aspx/){} 
  with(/minicart.aspx/){}

  else(){
    match(inferred_content_type()) {
      with(/html/) {
        # Rewrite the xmlns nodes before the html parser clobbers them
        replace(/\<(\/?)(\w+)\:\w+\>/, "$2_mwns_")

        # Force UTF-8 encoding. If you'd like to auto-detect the encoding,
        # simply remove the "UTF-8" argument.  e.g. html(){ ... }
        html("UTF-8") {
          @import "device_detection.ts"

          # This file is meant to be used while the site is being built
          # and the project might be in the production environment. This will help to
          # ensure that the project can live on a prod environment, but not
          # be world accessible.

          # Coming Soon...
          # Comment out the line below once you begin working
          # @import "coming_soon.ts"

          

          @import "html.ts"
        }

        # Rewrite the xmlns nodes to restore them
        replace(/(\<(\/?)(\w+))_mwns_(\:\w+\>)/, "$1$4")
      }
      # with(/plain/i) {
      #   @import plain.ts
      # }
      with(/javascript/) {
         @import "ajax.ts"
      }
      else() {
        log("Passing through " + $content_type + " unmodified.")
      }
    }


  }
}
