$(function(){
    $(window).on('hashchange', function(e){debugger
        var newURL = e.originalEvent.newURL,
            oldURL = e.originalEvent.oldURL;

        var newHash = '',
            oldHash = '';

        if (newURL.indexOf('#!') !== -1) {
            newHash = newURL.substr(newURL.indexOf('#!') + 2);
        }

        if (oldURL.indexOf('#!') !== -1) {
            oldHash = oldURL.substr(oldURL.indexOf('#!') + 2);
        }

        if (oldHash == '') {
            oldHash = 'index';
        }

        $('#'+oldHash).hide();
        $('#'+newHash).show();

    });
})
