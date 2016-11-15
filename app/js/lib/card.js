(function ($) {
    var apiUrl = "http://pokeapi.co/api/v2/";
    var type = "pokemon/";
    var pokemonContainer = $(".row");

    for (var i = 1; i < 4; i++) {
        var url = apiUrl + type + i.toString();

        $.get(url)
            .done(function (res) {
                var pokemon = handleData(res);
            });
    }

    function handleData(res) {
        var collectedName = pokeName(res);
        var pokemonImage = getImage(res.forms[0].url);
        pokemonContainer.append(collectedName);
    }

    function pokeName (res) {
        var pokeAbilities = res.abilities;
        var abilityName = '';
        var pokemonStats = '';
        //console.log(pokeAbilities);

        var pokemonName = $("<h1></h1>", {
            text: res.name,
            class: 'pokemon__name'
        });

        var div = $("<div></div>", {
            class: "col-4"
        })
            .append(pokemonName);

        $.each(pokeAbilities, function (idx, val) {
            abilityName = val.ability.name;
            pokemonStats = pokestats(abilityName, res.name);
            div.append(pokemonStats);
        });

        //console.log(div);
        div[0].dataset.pokemonName = res.name;

        return div;
    }

    function pokestats (val, name) {
        var item = $("<h2></h2>", {
            text: val
        });

        var container = $("<div></div>", {
            class: "pokemon__list"
        }).append(item);

        return container;
    }

    function getImage (url) {
        $.get(url)
            .done(function (res) {
                createImage(res);
            });
    }

    function createImage (res) {
        var image = $("<img />", {
            class: 'pokemon__image',
            src: res.sprites.front_default
        });

        var targetDiv = $(".row").find("[data-pokemon-name='" + res.name + "']");
        targetDiv.prepend(image);
    }
}(jQuery));
