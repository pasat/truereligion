HomePageLoad = function () {

    // home view model
    function HomeViewModel() {
        var home = this;
        var boxShift = 0;
        home.ini = function () {
            home.shiftBoxes();
            home.resetFooter();
            home.masonry();
        };
        home.linkTile = function (model) { home.redirect(model); };
        home.linkCta = function (model) { home.redirect(model); };
        home.removeTile = function (model) { home.tiles.remove(model); };
        home.showOverlay = function (model) {
            if (model.hasOverlay) {
                $("#" + model.id + ' .gradient-overlay').stop(true, true).fadeIn(200);
            }
        };
        home.hideOverlay = function (model) {
            if (model.hasOverlay) {
                $("#" + model.id + ' .gradient-overlay').stop(true, true).fadeOut(200);
            }
        };
        home.redirect = function (model) {
            if (model !== null && model.url !== null && model.url !== "") {
                window.location = model.url;
            }
        };                
        home.loadTiles = function () {
            var tile1Ctas = [
                    new CallToAction("Shop Mens", "/store/productslist.aspx?categoryid=461&PageNo=0", "home-shop-men"),
                    new CallToAction("Shop Womens", "/store/productslist.aspx?categoryid=462&PageNo=0", "home-shop-women"),
                    new CallToAction("", "javascript:void(0);", "home-see-terms")
                ];
            var data = [
                    new Tile("box1", false, "", "", "", tile1Ctas),
                    new Tile("box2", false, "/fit-guide/women/index.aspx#/legging/halle", "", "", null),
                    new Tile("box3", true,  "/Womens_California_Sun/pl/c/7130.html", "California Sun", "", null),
                    new Tile("box4", true,  "/Womens_New_Arrivals/pl/c/1001.html", "New Arrivals", "large", null),
                    new Tile("box5", true,  "/Mens_California_Sun/pl/c/7111.html", "California Sun", "small", null),
                    new Tile("box6", false, "http://truereligionstitched.tumblr.com/", "", "", null),
                    new Tile("box7", false, "/fit-guide/men/index.aspx#/slim/rocco", "", "", null),
                    new Tile("box8", true,  "/Mens_New_Arrivals/pl/c/2001.html", "New Arrivals", "large", null),
                    new Tile("box9", true, "/Womens_Red_White_True/pl/c/7129.html ", "Red White & True", "", null),
                    new Tile("box10", true, "/Mens_Summer_Plaids/pl/c/7112.html", "Summer Plaids", "small", null)
                ];
            return data;
        };
        home.shiftBoxes = function () {
            if (($(window).width() < 1280) && boxShift == 0) {
                $("#box4").insertAfter($("#box6"));
                $("#box8").insertAfter($("#box4"));
                boxShift = 1;
                $('#masonry-grid').masonry('reload');
            } else if (($(window).width() > 1280) && boxShift == 1) {
                $("#box4").insertAfter($("#box3"));
                boxShift = 0;
                $('#masonry-grid').masonry('reload');
            }
        };
        home.resetFooter = function () {
            $("#primary-footer").width($("#site").width());
        };
        home.masonry = function () {
            $('#masonry-grid').masonry({
                itemSelector: '.masonry-box',
                columnWidth: 152,
                gutterWidth: 6,
                isAnimated: true,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        };
        home.title = "True Religion";
        home.tiles = home.loadTiles("TRUE");
    };

    // tile model
    var Tile = function (id, hasOverlay, url, rolloverCaption, rolloverCaptionCss, callsToAction) {
        var tile = this;
        tile.id = id;
        tile.url = url;
        tile.rolloverCaption = rolloverCaption;
        tile.rolloverCaptionCss = "gradient-overlay-caption " + rolloverCaptionCss;
        tile.callsToAction = callsToAction;
        tile.hasOverlay = hasOverlay;
    };

    // cta model
    var CallToAction = function (label, url, cls) {
        var cta = this;
        cta.label = label;
        cta.url = url;
        cta.cls = cls;
    };

    // bind & initialize
    var hvm = new HomeViewModel();
    ko.applyBindings(hvm);
    hvm.ini();

    // event handlers
    $('.home-see-terms .cta').click(function (e) {
        $('.termsMask').height($(document).height()).show();
        $('.termsPopContainer').fadeIn(600).css({ 'top': '40%' });
        e.stopPropagation();
        e.preventDefault();
    });
    $('.termsPopContainer .close-terms-modal, .termsMask').click(function (e) {
        $('.termsPopContainer').hide();
        $('.termsMask').hide();
        e.stopPropagation();
        e.preventDefault();
    });
    
    $(window).resize(function () { hvm.shiftBoxes(); });
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    if (window.addEventListener != null) {
        window.addEventListener(orientationEvent, function () { hvm.resetFooter(); }, false);
    }
};