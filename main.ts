namespace SpriteKind {
    export const Goal = SpriteKind.create()
    export const Ball = SpriteKind.create()
    export const Defense = SpriteKind.create()
}
// Function for kicking the ball
function kickBall (player2: Sprite) {
    if (player2.overlapsWith(ball)) {
        directionX = ball.x - player2.x
        directionY = ball.y - player2.y
        ball.vx = directionX * 2
        ball.vy = directionY * 2
    }
}
// Function to check if a goal was scored
function checkGoal () {
    if (ball.overlapsWith(goal1)) {
        score2 += 1
        ball.setPosition(80, 60)
    }
    if (ball.overlapsWith(goal2)) {
        score1 += 1
        ball.setPosition(80, 60)
    }
}
// Function to create players
function createPlayers () {
    player1 = sprites.create(img`
        . . . . . . . c c c . . . . . . 
        . . . . . . c b 5 c . . . . . . 
        . . . . c c c 5 5 c c c . . . . 
        . . c c b c 5 5 5 5 c c c c . . 
        . c b b 5 b 5 5 5 5 b 5 b b c . 
        . c b 5 5 b b 5 5 b b 5 5 b c . 
        . . f 5 5 5 b b b b 5 5 5 c . . 
        . . f f 5 5 5 5 5 5 5 5 f f . . 
        . . f f f b f e e f b f f f . . 
        . . f f f 1 f b b f 1 f f f . . 
        . . . f f b b b b b b f f . . . 
        . . . e e f e e e e f e e . . . 
        . . e b c b 5 b b 5 b f b e . . 
        . . e e f 5 5 5 5 5 5 f e e . . 
        . . . . c b 5 5 5 5 b c . . . . 
        . . . . . f f f f f f . . . . . 
        `, SpriteKind.Player)
    controller.player1.moveSprite(player1, 100, 100)
    player2 = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    controller.player2.moveSprite(player2, 100, 100)
}
// Function to create the ball, goals, and defenses
function createBallAndGoals () {
    ball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f 1 1 f f . . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . f f 1 1 f 1 1 1 f f . . . 
        . . . f 1 1 1 f f 1 f 1 f . . . 
        . . . f 1 1 1 f 1 1 1 f f . . . 
        . . . f f 1 1 1 f 1 f f f . . . 
        . . . f f 1 f f 1 1 1 f . . . . 
        . . . . f f 1 1 f 1 f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Ball)
    ball.setPosition(80, 60)
    ball.setStayInScreen(true)
    goal1 = sprites.create(img`
        ......1111111.................
        ......1111111.................
        .....11111111.................
        ...111111.....................
        ..1111111.....................
        .111111.......................
        111111........................
        11111.........................
        1111..........................
        111...........................
        1111..........................
        11111.........................
        .111111.......................
        .1111111111111................
        ..111111111111................
        ....1111111111................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        `, SpriteKind.Goal)
    goal1.setPosition(10, 60)
    goal2 = sprites.create(img`
        ...........111111111....
        ...........11111111111..
        ...........11111111111..
        .................11111..
        ...................111..
        ...................111..
        ...................111..
        ...................111..
        ...................111..
        .................11111..
        .................11111..
        .................11111..
        ................1111....
        ...........111111111....
        ...........111111111....
        ...........11111111.....
        `, SpriteKind.Goal)
    goal2.setPosition(150, 60)
}
let player2: Sprite = null
let player1: Sprite = null
let score1 = 0
let goal2: Sprite = null
let score2 = 0
let goal1: Sprite = null
let directionY = 0
let directionX = 0
let ball: Sprite = null
// Game loop
createPlayers()
createBallAndGoals()
game.onUpdate(function () {
    kickBall(player1)
    kickBall(player2)
    checkGoal()
    if (score1 >= 5) {
        game.splash("Player 1 Wins!")
        game.reset()
    }
    if (score2 >= 5) {
        game.splash("Player 2 Wins!")
        game.reset()
    }
})
