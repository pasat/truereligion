var TRUE = (function (get) {
    var HomePage = function () {
        $('#site, #primary-footer').addClass('home');
        head.js("/_moovweb_local_assets_/javascript/m_home.js", "/layout/js/jquery.masonry.min.js", function () {
            if (typeof HomePageLoad !== "undefined") {
                HomePageLoad();
            }
        });
    },
	ProductList = function () {
	    head.js("/layout/js/category.js", "/layout/js/jquery.prettyPhoto.js", "/layout/js/productselector.js", "/layout/js/quicklook.js", "/store/os/js/jquery.jplayer.js", function () {
	        if (typeof ProductListLoad !== "undefined") {
	            ProductListLoad();
	        }
	    });
	},
	ProductDetails = function () {
	    head.js("/layout/js/product-details.js", "/layout/js/productselector.js", function () {
	        if (typeof ProductDetailsLoad !== "undefined") {
	            ProductDetailsLoad();
	        }
	    });
	},
	ShoppingCart = function () {
	    $('#lnkBackToTop').click(function () {
	        $('body,html').animate({ scrollTop: 0 }, 800);
	    });
	},
	StoreLocator = function () {
	    head.js("/layout/js/storelocator.js", function () {
	        if (typeof StoreLocatorLoad !== "undefined") {
	            StoreLocatorLoad();
	        }
	    });
	},
	ShopTheLook = function () {
	    head.js("/layout/js/shopthelook.js", "/layout/js/jquery.flexslider.js", "/layout/js/jquery.jqtransform.js", function () {
	        if (typeof ShopTheLookLoad !== "undefined") {
	            ShopTheLookLoad();
	        }
	    });
	},
	FitGuide = function () {
	    head.js("/layout/js/modernizr-2.5.3.min.js", "/layout/js/jquery.easing.min.js", "/layout/js/video.js", "/layout/js/jquery.ba-hashchange.min.js", "/layout/js/jquery.topslider.js", "/layout/js/jquery.zlider.js", "/layout/js/fit-guide.js", "//platform.twitter.com/widgets.js", function () {
	        if (typeof FitGuideLoad !== "undefined") {
	            FitGuideLoad();
	        }
	    });
	},
	CompanyProfile = function () {
	    head.js("/store/os/js/jquery.caroufredsel.js", "/layout/js/press.js", function () {
	        if (typeof CompanyProfileLoad !== "undefined") {
	            CompanyProfileLoad();
	        }
	    });
	},
	WishList = function () {
	    head.js("/layout/js/wishlist.js", function () {
	        if (typeof WishListLoad !== "undefined") {
	            WishListLoad();

	            $("body").delegate(".editButtonClick", "click", function () {
	                setTimeout(function () {
	                    $('.selectBox').selectbox();
	                }, 500);
	            });
	        }
	    });
	},
    Help = function () {
        $('a[class="question"]').css({ cursor: 'pointer' });
        var faqAnswerWidth = $('.faqAnswer').width();
        $('.faqAnswer').css({ width: faqAnswerWidth + 'px' });
        $('.questionsList .faqAnswer').hide();
        $('.question').click(function () {
            $('.questionsList .faqAnswer').slideUp(500);
            if ($(this).siblings('.faqAnswer').is(":hidden")) $(this).siblings('.faqAnswer').slideDown(500);
            return false;
        });
        if (window.location.hash) {
            var hash = window.location.hash;
            if (hash === "#shipping") {
                $("#shipping-answer").show();
            } else if (hash === "#returns") {
                $("#returns-answer").show();
            }
        }
        $('#help-shipping').click(function () {
            $('.questionsList .faqAnswer').hide();
            $("#shipping-answer").show();
        });
        $('#help-returns').click(function () {
            $('.questionsList .faqAnswer').hide();
            $("#returns-answer").show();
        });
    },
    ContestSignUp = function () {
        head.js("/layout/js/contest-signup.js", function () {
            if (typeof ContestSignUpLoad !== "undefined") {
                ContestSignUpLoad();
            }
        });
    },
        EmailSignUp = function () {
            var popUnder = {
                cookieName: "popundercookie",
                cookieExpTime: 1,
                cookieSetValue: 'true',
                windowProperties: "width= 680, height= 500, left=500, top=200, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no",
                getPopUnder: function () {
                    var win2;
                    var url = "/store/MailingListPopup.aspx";
                    window.open(url, "", popUnder.windowProperties).blur();
                    if (!$.browser.msie) {
                        window.focus();
                    }
                }
            };

        setPopUnder = function () {

            $("#sign-in-submit #ContentPlaceHolder1_LoginBtn").click(function () {
                $(this).data('clicked', true);
            });

            $("#register-submit #ContentPlaceHolder1_RegisterBtn").click(function () {
                $(this).data('clicked', true);
            });

            $("#user-utility #signIn").click(function () {
                $(this).data('clicked', true);
            });

            $("body").delegate("a", 'click', function () {
                var set = function (value) {
                    $.cookie(popUnder.cookieName, value, { path: '/', expires: popUnder.cookieExpTime });
                }
                if (($.cookie(popUnder.cookieName) == null)) {
                    if ((!$('#sign-in-submit #ContentPlaceHolder1_LoginBtn').data('clicked')) && (!$("#register-submit #ContentPlaceHolder1_RegisterBtn").data('clicked'))) {
                        if (($.cookie(popUnder.cookieName) == null) && (!$("#user-utility #signIn").data('clicked'))) {

                            popUnder.getPopUnder();
                            set("true");
                        }
                    }
                    else {
                        set("true");
                    }
                }

            });
        } ();
    };
   
    return {
        // Expose privates to public
        GetSection: function (swtch) {
            var load = {
                locator: function () {
                    StoreLocator();
                },
                cart: function () {
                    ShoppingCart();
                },
                detail: function () {
                    ProductDetails();
                },
                list: function () {
                    ProductList();
                },
                shopthelook: function () {
                    ShopTheLook();
                },
                fitGuide: function () {
                    FitGuide();
                },
                home: function () {
                    HomePage();
                },
                companyprofile: function () {
                    CompanyProfile();
                },
                account: function () {
                    WishList();
                },
                help: function () {
                    Help();
                },
                contest: function () {
                    ContestSignUp();
                },
                _default: function () {
                }
            };
            (Object.hasOwnProperty.call(load, swtch) && load[swtch] || load._default)();
        },
        Global: function () {
            head.js("/store/os/js/jquery.onestop.plugins.js", "/store/os/js/jquery.selectbox.0.2.js", "/store/os/js/jquery.cookie.js", function () {
                //Add SelectBox Plug-in to any select control with class .selectBox within site
                $('.selectBox').selectbox();
                //EmailSignUp();
                TRUE.Global.prototype.LoadQuickLook = function (id) {
                    var url = '/store/QuickLook.aspx?productid=' + id + '&action=1';
                    $.ajax({
                        url: url,
                        success: function (html) {
                            positionQuickLook();
                            BuildQuicklookJs();
                            change_unitcost(id);
                            initializeAllProducts('true');
                        },
                        error: function (e) {
                            alert(e.responseText);
                        }
                    });
                };
                //Configure DropDowns per section//
                TRUE.Global.prototype.ConfigureSBDropDowns = function ($sb, sW, bgX, bgY) {
                    $sb.css({ 'width': sW, 'background-position': bgX + ' ' + bgY }).css('visibility', 'visible').children('.sbOptions').css('width', sW);
                    $sb.children('.sbSelector').css('width', sW);
                };
                TRUE.Global.prototype.AddToCart = function (productid, color, size, qty, $msg, callback) {
                    var params = '?productid=' + productid + '&colorid=' + color + '&sizeid=' + size + "&quantity=" + qty + "&ajax-add=1";
                    var url = '/store/os/addtocart.aspx';
                    url += params;
                    $.ajax({
                        url: url,
                        success: function () {
                            if (typeof $msg !== "undefined") {
                                $msg.html(qty + ((parseInt(qty) > 1) ? ' items have been added.' : ' item has been added.'));
                                setTimeout(function () { $msg.empty(); }, 1200);
                            }
                            if (typeof callback !== "undefined") {
                                callback();
                            }
                        }
                    });
                    return false;
                };
                //Get MiniCart Mark-Up//
                TRUE.Global.prototype.GetMiniCartMarkUp = function () {
                    $.ajax({
                        url: '/store/minicart.aspx',
                        cache: false,
                        success: function (html) {
                            $('.cartDropDown').html(html).filter(":not(:animated)").animate({ top: 13, opacity: "show" }, { duration: 300 });
                        }
                    });
                };
                TRUE.Global.prototype.UpdateMiniCartData = function (aw) {
                    updateCartData(aw);
                };
                TRUE.Global.prototype.SetMiniCartEvents = function () {
                    $("header #cart-info").hover(function () {
                        var l = parseInt($(".cartCount").text());
                        l > 0 && TRUE.Global.prototype.GetMiniCartMarkUp();
                        if ($.browser.msie && parseInt($.browser.version, 10) == 7) {
                            //$('.sbHolder, #productMedia, #productDsc, #pagination, .masonry').css('position', 'static');
                            $('.thumbs-extramediaIE7').hide();
                        }
                    }, function () {
                        $(".cartDropDown").fadeOut();
                        if ($.browser.msie && parseInt($.browser.version, 10) == 7) {
                            $('.sbHolder,#productMedia, #productDsc, #pagination, .masonry').css('position', 'relative');
                            $('.thumbs-extramediaIE7').show();
                        }
                    });
                };
                TRUE.Global.prototype.SetMiniCartEvents();
                SLISearchBox = function () {
                    $('#searchfield').ToggleTextBox({ defaultValue: 'Enter Keywords' });
                    $("#searchSubmit").bind("click", function () {
                        var txt = $("#searchfield").val(), search = function () {
                            MM_goToURL("parent", "http://jeans.truereligionbrandjeans.com/search?w=" + txt);
                            return true;
                        };
                        if ("keyword or item #" !== txt) {
                            search.apply();
                        } else {
                            return $(".errmsg").html("Incorrect search value."), setTimeout(function () {
                                $(".errmsg").html("");
                            }, 2500), false;
                        }
                    });
                } (),
				ShippingChart = function () {
				    $('#promo-text').on('click', function (e) {
				        e.preventDefault();
				        $('.overlay').fadeIn('slow');
				        $('#shippingRatesContainer').fadeIn(1000).CenterOnWindow();
				        $('.x, .overlay').on('click', function () {
				            $('#shippingRatesContainer, .overlay').fadeOut();
				        });
				    });
				    $(window).resize(function () {
				        $('#shippingRatesContainer').CenterOnWindow();
				    });
				} (),

				SideNavigation = function () {
				    $('aside#sideNavigation nav h2:not(#comprofileTitle):not(#accountTitle):not(#pressTitle)').removeClass('active');
				    var sideVisible = (typeof isWomens !== "undefined" || typeof isMens !== "undefined" || typeof isKids !== "undefined") ? true : false;
				    if (sideVisible) {
				        if (true === isWomens) {
				            $('aside#sideNavigation nav h2#womensTitle').addClass('active');
				            $("#womensnav").show();
				        } else if (true === isMens) {
				            $('aside#sideNavigation nav h2#mensTitle').addClass('active');
				            $("#mensnav").show();
				        } else if (true === isKids) {
				            $('aside#sideNavigation nav h2#kidsTitle').addClass('active');
				            $("#kidsnav").show();
				        }
				    }
				} ();
            });
        },
        ConfigureDropDowns: function () {
            $('.sbHolder').each(function () {
                var sbW = $(this).width();
                $(this).children('.sbSelector').css('width', sbW);
                $(this).children('.sbOptions').css('width', sbW);
            });
        }
    };
} (TRUE || {}));

$(function () {
	TRUE.GetSection($('.page').attr('id'));
	TRUE.Global();
});

$(window).load(function () {
	TRUE.ConfigureDropDowns();
});

function LoadEmailSignUp() {
	var opts = "width= 680, height= 500, left=500, top=200, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no";
	var url = "/store/MailingListPopup.aspx";
	window.open(url, "", opts);
	window.focus();
}

var timeOut;
openCloseMiniCart = function () {
    $.ajax({
        url: '/store/MiniCart.aspx',
        cache: false,
        success: function (html) {
            $('.cartContents').html(html).showContent('slow', function () {
                timeOut = setTimeout(function () { $('.cartContents').hideContent('fast'); }, 6000);
            });
        }
    });
    render_cart_header("CartItemsLBGet", "CartTotalLBGet");
}

loadMiniCart = function() {
    $.ajax({
            url: '/store/MiniCart.aspx',
            cache: false,
            success: function(html) {
                $('.cartContents').html(html);
                try {
                    TRUE.Global.prototype.UpdateMiniCartData();
                }
                catch(e) {
                    updateCartData();
                }
            }
        });
    render_cart_header("CartItemsLBGet", "CartTotalLBGet");
};

removeItem = function (rid, btn) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: '/store/MiniCart.aspx/RemoveItem',
        data: '{rid:"' + rid + '"}',
        dataType: 'json',
        success: function (msg) {
            if (btn != undefined) {
                $(btn).parents('.cartDropDownProductItem').fadeOut(300);

            }
            loadMiniCart();
        },
        error: function (e) { alert('error: ' + e.responseText); }
    });
}

closeMiniCart = function () {
    $(".cartDropDown").fadeOut();
}

initPopup = function (obj, close) {
    $('.wrapper').height($(document).height());
    $('.wrapper').width($(window).width());
    $('.wrapper, ' + obj).show();
    $(close + ', .wrapper').click(function () {
        $('.wrapper, ' + obj).hide();
    });
};

$(document).ready(function () {

    if (document.location.href.indexOf('PageNo=0') > -1) {
        $(".viewall a b").css({ color: "#FFFFFF" });
    }

    $(".giftcard-select .giftcard select").change(function () {
        if ($(".ErrorText").is(":visible") == true) {
            var value = $(this).val();
            if (value != null && value >= 0) {
                $(".ErrorText").hide();
                $(".AddtoBag").hide();
            }
        }
    });

    if ($(".AddtoBag").length > 0) {
        loadMiniCart();
    }

    $("#sign-in-submit #ContentPlaceHolder1_LoginBtn").click(function () {
        $(this).data('clicked', true);
        set_infinite_cookie("hideModal", "true", "/");
    });

    $("#register-submit #ContentPlaceHolder1_RegisterBtn").click(function () {
        $(this).data('clicked', true);
        set_infinite_cookie("hideModal", "true", "/");
    });

    $("#user-utility #signIn").click(function () {
        $(this).data('clicked', true);
        set_infinite_cookie("hideModal", "true", "/");
    });

    $("a#signin").click(function () {
        $(this).data('clicked', true);
        set_infinite_cookie("hideModal", "true", "/");
    });

    var popUnder = {
        cookieName: "popundercookie",
        cookieExpTime: 1,
        cookieSetValue: 'true'
    }

    $("body").delegate("a", 'click', function () {
        var set = function (value) {
            $.cookie(popUnder.cookieName, value, { path: '/', expires: popUnder.cookieExpTime });
        }

        if (($.cookie(popUnder.cookieName) == null)) {
            if ((!$('#sign-in-submit #ContentPlaceHolder1_LoginBtn').data('clicked')) && (!$("#register-submit #ContentPlaceHolder1_RegisterBtn").data('clicked'))) {
                if (($.cookie(popUnder.cookieName) == null) && (!$("#user-utility #signIn").data('clicked')) && (!$("a#signin").data('clicked'))) {
                    set("true");
                }
            }
            else {
                set("true");
            }
        }
    });

    var seenModal = getCookie("seenEmailModal");
    var popundercookie = getCookie("popundercookie");
    var hideModal = getCookie("hideModal");

    if (seenModal != "true" && popundercookie == "true" && hideModal != "true") {
        showThickbox();
    }

    var defaultMessage = "";
    $("#join-text").focus(function () {
        defaultMessage = $(this).val();
        $(this).val("");
    }).blur(function () {
        if ($(this).val() == 0) {
            $(this).val(defaultMessage);
        }
    }).keydown(function () {
        $(this).removeClass("error");
    });

    $("#join-submit").on("click", function () {
        submitFooterEmail();
    });

    $("#join-text").bind('keypress', function (e) {
        if (e.keyCode == 13) {
            // Enter pressed...
            e.preventDefault();
            submitFooterEmail();
        }
    });

    $("#mFemale").on("click", $(this), function () {
        $("#mFemale").removeClass("error").addClass("normal selected").html("X");
        $("#mMale").removeClass("error selected").addClass("normal").html("");
        $("#mChkBoxGenderFemale").attr("checked", true);
        $("#mChkBoxGenderMale").attr("checked", false);
    });

    $("#mMale").on("click", $(this), function () {
        $("#mMale").removeClass("error").addClass("normal selected").html("X");
        $("#mFemale").removeClass("error selected").addClass("normal").html("");
        $("#mChkBoxGenderFemale").attr("checked", false);
        $("#mChkBoxGenderMale").attr("checked", true);
    });

    $("input#mTxtEmail").focus(function () {
        if ($("#mSignupValidatonMessage").hasClass("error")) {
            $("#mSignupValidatonMessage").removeClass("error").addClass("normal");
            $("#mSignupValidatonMessage").html("All Fields Required");
        }
        $(this).removeClass("error");
    }).blur(function () {
        $(this).removeClass("error");
    }).keydown(function () {
        $(this).removeClass("error");
    });

    $("#mTxtZipCode").focus(function () {
        if ($("#mSignupValidatonMessage").hasClass("error")) {
            $("#mSignupValidatonMessage").removeClass("error").addClass("normal");
            $("#mSignupValidatonMessage").html("All Fields Required");
        }

        $(this).removeClass("error");
    }).blur(function () {
        $(this).removeClass("error");
    }).keydown(function () {
        $(this).removeClass("error");
    });

    $("div#mBtnSubmit").on("click", function () {
        processModalSubscriberSubmit();
    });

    $("#mEmailSignupInputs input").bind('keypress', function (e) {
        if (e.keyCode == 13) {
            // Enter pressed...
            processModalSubscriberSubmit();
        }
    });

    $("#privateSaleNav a").mouseenter(function () {
        $(this).find('em').css('border-bottom', '1px solid #B30F10');
    }).mouseleave(function () {
        $(this).find('em').css('border-bottom', '1px solid transparent');
    });
    if (BrowserDetect.browser === 'Firefox' || (BrowserDetect.browser === 'Explorer' && BrowserDetect.version === 8)) {
        $(this).find('em').css('height', '16px');
    }
});

var updateCartData = function (aw) {
    setTimeout(function () {
        $.ajax({
            url: '/store/os/shoppingcartcost.aspx',
            cache: false,
            success: function (html) {
                var ary = html.split("|");
                1 < ary.length && ($(".cartCount").html(ary[1]), $(".cartTotal").html(ary[0]), $("#cart-info .countItems").html(ary[1] + " items"), $("#cart-info .subTotal span").html(ary[0]));
            },
            error: function () { alert("Error"); }
        });
    }, (aw) ? 1200 : 0);
};

var submitFooterEmail = function () {

    var emailObject = $("#join-text");
    var firstname = "";
    var lastname = "";
    var city = "";
    var state = "";
    var zipcode = "";
    var email = $(emailObject).val();
    var confirmemail = email;
    var address = "";
    var day = "";
    var month = "";
    var gender = "";
    var hearaboutus = "";
    var collectionmethod = "";

    if (validateEmail(email)) {
        if ($(emailObject).hasClass("error")) {
            $(emailObject).removeClass("error");
        }

        var url = '/store/mailinglistsignup.aspx';
        var redirectUrl = "/store/EmailSignup.aspx";

        var params = '?firstname=' + firstname + '&lastname=' + lastname + "&city=" + city + "&state=" + state + "&zipcode=" + zipcode + "&email=" + email + "&confirmemail=" + confirmemail + "&address=" + address + "&day=" + day + "&month=" + month + "&gender=" + gender + "&hearaboutus=" + hearaboutus + "&collectionmethod=" + collectionmethod;
        url += params;

        $(emailObject).val("Processing...").addClass("green");

        $.ajax({
            url: url,
            success: function (transport) {
                $(emailObject).val("");
                set_infinite_cookie("hideModal", "true", "/");
                window.location = redirectUrl + "?email=" + email;
            },
            error: function () {
                $(emailObject).addClass("error").val("Error processing!");
            }
        });


    }
    else {
        $(emailObject).addClass("error").val("Please enter a valid email!");
    }
};


var processModalSubscriberSubmit = function () {
    var firstname = "";
    var lastname = "";
    var city = "";
    var state = "";
    var zipcode = $("#mTxtZipCode").val();
    var email = $('input#mTxtEmail').val();
    var confirmemail = "";
    var address = "";
    var day = "";
    var month = "";
    var gender = "";
    var hearaboutus = "";
    var collectionmethod = $("input#mEmailSignup").val(); //get collection method from hidden input
    var segmentList = "";
    var genderChecked = false;

    if ($("#mChkBoxGenderMale").attr("checked") || $("#mChkBoxGenderFemale").attr("checked")) {
        genderChecked = true;
    }
    else {
        genderChecked = false;
    }

    if (email == "" && genderChecked == false && zipcode == "") {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error");
        $('input#mTxtEmail').addClass("error");
        $("#mFemale").removeClass("normal").addClass("error");
        $("#mMale").removeClass("normal").addClass("error");
        $('#mTxtZipCode').addClass("error");
    }
    else if (email == "" && genderChecked == false) {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error");
        $('input#mTxtEmail').addClass("error");
        $("#mFemale").removeClass("normal").addClass("error");
        $("#mMale").removeClass("normal").addClass("error");
    }
    else if (email == "" && zipcode == "") {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error");
        $('input#mTxtEmail').addClass("error");
        $('#mTxtZipCode').addClass("error");
    }
    else if (genderChecked == false && zipcode == "") {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error");
        $("#mFemale").removeClass("normal").addClass("error");
        $("#mMale").removeClass("normal").addClass("error");
        $('#mTxtZipCode').addClass("error");
    }
    else if (email == "") {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error").html("Valid Email Required");
        $('input#mTxtEmail').addClass("error");
    }
    else if (genderChecked == false) {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error");
        $("#mFemale").removeClass("normal").addClass("error");
        $("#mMale").removeClass("normal").addClass("error");
    }
    else if (zipcode == "") {
        $("#mSignupValidatonMessage").removeClass("normal").addClass("error");
        $('#mTxtZipCode').addClass("error");
    }

    confirmemail = email;
    gender = $("#mChkBoxGenderMale").is(":checked") ? 2 : 1;

    if (email != "" && genderChecked == true && zipcode != "" && gender != "") {
        $("#msignupValidatonMessage").removeClass("error");

        if (validateEmail(email)) {

            var url = "/store/mailinglistsignup.aspx";
            var params = "?firstname=" + firstname + "&lastname=" + lastname + "&city=" + city + "&state=" + state + "&zipcode=" + zipcode + "&email=" + email + "&confirmemail=" + confirmemail + "&address=" + address + "&gender=" + gender + "&hearaboutus=" + hearaboutus + "&collectionmethod=" + collectionmethod;

            url += params;

            $("#mSignupValidatonMessage").html("");
            $("#mSignupValidatonMessage").html("Processing...").addClass("green");

            $.ajax({
                url: url,
                success: function (transport) {

                    $("#mEmailSignupLeft").fadeOut();
                    $("#mOfferDetails").css("opacity", "0");
                    $("#mEmailSignupLeftThankYou").fadeIn();
                    $('input#mTxtEmail').val("");
                    $("#mTxtZipCode").val("");
                    $("#mChkBoxGenderMale, #mChkBoxGenderFemale").removeAttr("checked");

                    //infinite cookie
                    set_infinite_cookie("hideModal", "true", "/");
                },
                error: function () {
                    $("#mSignupValidatonMessage").addClass("error").val("Error processing!");
                }
            });
        }
        else {
            $("#mSignupValidatonMessage").html("");
            $("#mSignupValidatonMessage").html("Valid Email Required").addClass("error");
        }
        return false;
    }
};


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

showThickbox = function() {
    jQuery(document).ready(function ($) {
        tb_show("", "#TB_inline?height=560&width=483&inlineId=mEmailSignupContentHolder", "");
    });
    midnight_cookie("seenEmailModal", "true", "/");// midnight cookie
};


getCookie = function (c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
};

midnight_cookie = function (name, value, path) {
    var now = new Date();
    var expire = new Date();
    expire.setFullYear(now.getFullYear());
    expire.setMonth(now.getMonth());
    expire.setDate(now.getDate() + 2);
    expire.setHours(24);
    expire.setMinutes(0);
    document.cookie = name + "=" + value + "; expires=" + expire.toString() + "; path=" + path;
};

set_infinite_cookie = function (name, value, path) {
    var now = new Date();
    var expire = new Date();
    expire.setFullYear(now.getFullYear());
    expire.setMonth(now.getMonth());
    expire.setDate(now.getDate() + 99999);
    expire.setHours(0);
    expire.setMinutes(0);
    document.cookie = name + "=" + value + "; expires=" + expire.toString() + "; path=" + path;
};

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
		{
		    string: navigator.userAgent,
		    subString: "Chrome",
		    identity: "Chrome"
		},
		{
		    string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"
		},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari",
		    versionSearch: "Version"
		},
		{
		    prop: window.opera,
		    identity: "Opera",
		    versionSearch: "Version"
		},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"
		},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"
		},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"
		},
		{
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE"
		},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Mozilla",
		    versionSearch: "rv"
		},
		{
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"
		}
    ],
    dataOS: [
		{
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
		},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
		},
		{
		    string: navigator.userAgent,
		    subString: "iPhone",
		    identity: "iPhone/iPod"
		},
		{
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"
		}
    ]

};
BrowserDetect.init();