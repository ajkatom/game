generateWinningNumber = function() {
    return Math.floor((Math.random() * 100) + 1);
}

var shuffle = function(arr) {
    var l = arr.length
    var t = 0;
    var i = 0;


    while (l) {


        i = Math.floor(Math.random() * l--);


        t = arr[l];
        arr[l] = arr[i];
        arr[i] = t;
    }

    return arr;
}

var Game = function() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
};

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function() {
    return (this.playersGuess < this.winningNumber);


};
Game.prototype.playersGuessSubmission = function(num) {
    if (num < 1 || num > 100 || typeof num !== 'number') {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        $('#msg').css({ 'color': 'red' });
        $('.container').effect('shake');
        throw $('#msg').text("That is an invalid guess.");
    } else {
        this.playersGuess = num;
    }
    return this.checkGuess(num);
};

Game.prototype.checkGuess = function(num) {
    if (this.pastGuesses.includes(num)) {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        if ($('body').hasClass('ice')) {
            $('body').removeClass('ice');

        }
        return "You have already guessed that number."
    } else if (this.pastGuesses.length === 3 && num !== this.winningNumber) {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        if ($('body').hasClass('ice')) {
            $('body').removeClass('ice');

        }
        $('#msg').css({ 'color': 'red' });
        $('.container').effect('shake');
        setTimeout(function() {
            window.location.reload();
        }, 30000);
        return 'SORRY ONLY 4 GUESSES ALLOWED ,YOU LOOSE,TRY AGAIN '
    } else if (num === this.winningNumber) {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        if ($('body').hasClass('ice')) {
            $('body').removeClass('ice');

        }

        $('.fworks').fireworks({ sound: true, opacity: 0.9, width: '100%', height: '100%' });
        setTimeout(function() {
            window.location.reload();
        }, 30000);
        $('#hint').attr('disabled', 'disabled');
        $('#inputbutton').attr('disabled', 'disabled');

        return 'YOU WIN!!!!!!';

    } else {
        this.pastGuesses.push(num);
    }
    if (Math.abs(num - this.winningNumber) < 10) {
        $(document).ready(function() {
            if ($('body').hasClass('ice')) {
                $('body').removeClass('ice');

            }
            if (!($('.fire').is(":visible"))) {
                $('.fire').show();
            }

            $('.fire').fire({
                speed: 40,
                maxPow: 9,
                gravity: 0,
                flameWidth: 4,
                flameHeight: 1,
                plasm: true,
                fireTransparency: 20,
                fadingFlameSpeed: 8,

            });
        });

        return 'You\'re burning up!';
    }
    if (Math.abs(num - this.winningNumber) < 25) {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        if ($('body').hasClass('ice')) {
            $('body').removeClass('ice');

        }
        return "You\'re lukewarm.";
    }
    if (Math.abs(num - this.winningNumber) < 50) {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        if ($('body').hasClass('ice')) {
            $('body').removeClass('ice');
        }

        return "You\'re a bit chilly.";

    }
    if (Math.abs(num - this.winningNumber) < 100) {
        if ($('.fire').is(":visible")) {
            $('.fire').hide();
        }
        $('body').addClass('ice', 500);
        return "You\'re ice cold!";
    }

};

newGame = function() {
    var game = new Game;

    return game;
}
Game.prototype.provideHint = function() {
    var hArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
    return shuffle(hArr);
}

function enterclick(event) {
    if (event.type === 'click') {
        return true;
    } else if (event.type === 'keypress') {
        var code = event.charCode || event.keyCode;
        if (code === 13) {
            return true;
        }
    } else {
        return false;
    }
}

$(document).ready(function() {
    game = new Game;
    var place = $('#guesses').find('li').first();
    var exc = function(event) {
        if (enterclick(event)) {
            var num = +$('#guess').val();
            $('#msg').text(game.playersGuessSubmission(num));
            if (Math.abs(num - game.winningNumber) < 100 && Math.abs(num - game.winningNumber) > 25) {
                $(place).addClass('cold');
                $('#msg').addClass('cold');
                $('#msg').addClass('center');
            } else {
                $('#msg').removeClass('cold');
            }
            if ($('#msg').text() !== "You have already guessed that number.") {
                $(place).text('_' + num + '_');
                $('#guess').val('');
                place = $(place).next();
            }

        }
    };
    $("#guess").on('keypress', function(event) {
        exc(event);
    });
    $("#inputbutton").on('click', function(event) {
        exc(event);
    });

    $('#reset').on('click', function() {
        $('#msg').text('Are You Sure ? if you are Double click');
        setTimeout(function() {
            $('#msg').text('Feeling Lucky');
        }, 5000);
    });
    $('#reset').on('dblclick', function() {
        window.location.reload();
    });
    $('#hint').on('click', function() {
        $('#hnt').text('YOUR HINTS ARE:' + game.provideHint());
        $('#hint').attr('disabled', 'disabled');
    });




});