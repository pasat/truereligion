/*
  Mappings

  Mappings are matchers that we use to determine if we should execute a
  bit of Tritium during an execution. Aka, run something when we are
  are on a certain page.

  Example starting code:
*/

match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")

     match($host){
			with(/jeans\.truereligionbrandjeans\.com/){
		
		   match($path) {
		
		     with(/search/) {
		       log("--> Importing pages/search.ts in mappings.ts")
		       @import pages/search.ts
		       @import sections/nav.ts
		       @import sections/header.ts
		     }
		     
		     else() {
		       log("--> No page match in mappings.ts")
		     }
		   }
		 }
		 
		 with(/truereligionbrandjeans\.com/){
		
			 match($path) {
				  with(/index|^\/$/) {
				    log("--> Importing pages/home.ts in mappings.ts")
				    @import pages/home.ts
				    @import sections/header.ts
				  }
				  
				  with(/store\/productdetails/) {
				    log("--> Importing pages/product.ts in mappings.ts")
				    @import pages/product.ts
				    @import sections/header.ts
				  }
				  
				  with(/store\/shoppingcart/) {
				    log("--> Importing pages/cart.ts in mappings.ts")
				    @import pages/cart.ts
				    @import sections/header.ts
				  }
				  
				  else() {
				    log("--> No page match in mappings.ts")
				  }
				}
			}
		}
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import pages/error.ts
  }
}
