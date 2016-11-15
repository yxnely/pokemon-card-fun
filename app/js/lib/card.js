(function ($) {
    var apiUrl = "http://pokeapi.co/api/v2/";
    var type = "pokemon/";
    var pokemonContainer = $(".row");

    for (var i = 1; i < 4; i++) {
        var url = apiUrl + type + i.toString();

        $.get(url)
            .done(function (res) {
                var pokemon = handleData(res);
                pokemonContainer.append(pokemon);
            });
    }

    function handleData(res) {
        var pokemonImage = getImage(res.forms[0].url);
        console.log(res.forms[0].url);

        var pokemonName = $("<h1></h1>", {
            text: res.name
        });

        var pokemonWeight = $("<h2></h2>", {
            text: res.weight
        });

        var div = $("<div></div>", {
            class: "col-4"
        })
            .append(pokemonName)
            .append(pokemonWeight);

        return div;
    }

    function getImage (url) {
        $.get(url)
            .done(function (res) {
                console.log(res);
            });
    }
}(jQuery));
