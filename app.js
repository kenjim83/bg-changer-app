FLICKR_DOMAIN = "https://api.flickr.com/services/rest/";


var getInputText = function(formDiv){
    return $(formDiv).find('#searchBox').val();
}

var buildUrl = function(searchText){
    return URI(FLICKR_DOMAIN)
        .addSearch('method', 'flickr.photos.search')
        .addSearch('api_key', 'd7be097cdcb95fa4892d84dd82e6088d')
        .addSearch('format', 'json')
        .addSearch('per_page', 1)
        .addSearch('text', searchText)
        .toString();
}

var renderBgFromResponse = function(response){
    var photoObj = response.photos.photo[0];
    var imgUrl = 'https://farm' + photoObj.farm + '.staticflickr.com' +
                '/' + photoObj.server + '/' + photoObj.id + '_' + photoObj.secret + '.jpg';
    document.documentElement.style.background = 'url(' + imgUrl + ') no-repeat center center fixed';
    document.documentElement.style.backgroundSize = 'cover';
}

var searchHandler = function(e){
    // e.preventDefault();
    var inputText = $('#searchBox').val();
    // console.log(e.keyCode);
    // var inputText = getInputText(this);
    var finalUrl = buildUrl(inputText);

    $.ajax({
        url: finalUrl,
        dataType: 'jsonp',
        jsonpCallback: 'jsonFlickrApi'
    })
    .done(renderBgFromResponse);
};




$(document).ready(function(){
    $('#searchBox').keyup(searchHandler);
    // $('#searchForm').on('submit', searchHandler);
});




