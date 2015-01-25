// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };



// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
//Declaration and initialisation
var score = -3;
var label_score;
var player;
var pipes;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("batman", "assets/flappy_batman.png");
    game.load.image("playerImg", "assets/rsz_panda.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.audio("displacement", "assets/SPRING_B.WAV");
    game.load.image("pipe", "assets/pipe_mint.png");
    game.load.image("background", "assets/clouds.png");
    game.load.audio("crash", "assets/SHATTER.WAV");




}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, "background");

    player = game.add.sprite(40, game.world.centerY, "playerImg");
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = -90;
    player.body.gravity.y = 500;

    game.input.onDown.add(clickHandler);

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(player_jump);
    label_score = game.add.text(20, 20, "0");

    pipes = game.add.group();
    game.add.text(260, 20, "The Panda Hop",
        {font: "30px Superclarendon", fill: "#FF4D4D"});

    pipe_interval = 1;
    game.time.events
        .loop(pipe_interval * Phaser.Timer.SECOND, generatePipe);

}
function add_pipe_block(x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generatePipe() {
    var gapStart = game.rnd.integerInRange(1,3);
    var gapEnd = game.rnd.integerInRange(5,6);

    for(var count = 0; count <8; count++) {
        if (count < gapStart || count >= gapEnd) {
            add_pipe_block(700, count*50);
        }
    }
    changeScore();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);

}

function clickHandler(mouse) {
    game.add.sprite(mouse.x, mouse.y, "playerImg");

}

function spaceHandler (event) {
    game.sound.play("score");
    changeScore();
}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}
function player_jump() {
    player.body.velocity.y = -200;
    game.sound.play("displacement");
}

function game_over () {
    game.sound.play("crash");
    alert("GAME OVER");
    game.destroy();


}