$(function () {
    var newsTemplate = $.templates("#news-item-template");
    var $header = $(".header");
    var $menu = $("#sections");
    var $spin = $("#spin");
    var $news = $("#news");
    $spin.hide();
    setTimeout(function () {
        console.log("Debug...");
        $menu.val("home");
        $menu.change();
    }, 500);
    $menu.change(function () {
        var val = $menu.val();
        if (!val) {
            $header.removeClass("dataLoaded");
            $news.hide()
                .empty();
            return;
        }
        $spin.show();
        var url = "//api.nytimes.com/svc/topstories/v2/" + val + ".json";
        url += '?' + $.param({
            'api-key': "7dd8ef3de3434176a64908eb393d70db"
        });
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (result) {
            var data = result.results.filter(function (r) { return r.multimedia && r.multimedia.length > 0; })
                .slice(0, 12)
                .map(function (val) {
                var img = val.multimedia.slice(0).reverse()[0];
                return {
                    "title": val.title,
                    "text": val.abstract,
                    "linkUrl": val.short_url,
                    "img": img.url,
                    "imgCap": img.caption
                };
            });
            var htmlOutput = newsTemplate.render(data);
            $news.html(htmlOutput);
            $header.addClass("dataLoaded");
            $news.show();
        }).fail(function (err) {
            throw err;
        }).always(function () {
            $spin.hide();
        });
    });
});
