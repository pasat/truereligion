log("--> Running ajax.ts")

# match($path) {
#   # Match the Ajax path
#   with(/foo/) {
#     html_fragment() {
#       log("--> Importing ajax/foo.ts in ajax.ts")
#       @import ajax/foo.ts
#     }
#   }
# }

match($path) {
   with(/store\/productdetails/) {
     html_fragment() {
        remove('.//meta | .//link | .//script | .//title');
     }
   }
}

# needed for product images
# replace("%24", "$")
# replace("&amp;", "&")