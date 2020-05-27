
let theHero: Sprite;
const TWO_PI = Math.PI * 2;

function createHero() {
    if (theHero) {
        theHero.destroy();
    }

    const heroImage = img`
        . . . . 3 3 3 3 3 3 3 . . . .
        . . 3 3 3 3 3 3 3 3 3 3 3 . .
        . 3 3 3 3 3 3 3 3 3 3 3 3 3 .
        . 3 3 3 3 3 3 3 3 3 3 3 3 3 .
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        . 3 3 3 3 3 3 3 3 3 3 3 3 3 .
        . 3 3 3 3 3 3 3 3 3 3 3 3 3 .
        . . 3 3 3 3 3 3 3 3 3 3 3 . .
        . . . . 3 3 3 3 3 3 3 . . . .
    `
    theHero = sprites.create(heroImage, SpriteKind.Player);
    scene.cameraFollowSprite(theHero);
    tiles.placeOnRandomTile(theHero, myTiles.tile4)
    const ts = new TriangleSprite(theHero);
} 


game.onUpdate(updateHero)

let heading = 0;
let lastPosition: tiles.Location;


function updateHero() {
    if (!theHero) return;
    

    if (!lastPosition || calculateDistance(theHero.x, theHero.y, lastPosition.x, lastPosition.y) > 30) {
        lastPosition = tilemap.locationOfSprite(theHero);
        updatePaths();
    }
    const angularVelocity = 0.15;
    const speed = 75;
    const dx = controller.dx();
    const dy = controller.dy();

    if (dx || dy) {
        let angle = Math.atan2(dy, dx);
        if (angle < 0) angle += TWO_PI;

        if (angle !== heading) {
            if (Math.abs(heading - angle) < Math.PI) {
                if (heading < angle) {
                    heading += angularVelocity;
                }
                else {
                    heading -= angularVelocity
                }
            }
            else {
                if (heading < angle) {
                    heading -= angularVelocity;
                }
                else {
                    heading += angularVelocity
                } 
            }

            if (heading < 0) heading += TWO_PI;

            if (Math.abs(heading - angle) < 0.1 || Math.abs(heading - TWO_PI - angle) < 0.1) {
                heading = angle;
            }
        }

        theHero.setVelocity(speed * Math.cos(heading), speed * Math.sin(heading))
    }
    else {
        theHero.setVelocity(0, 0);
    }
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}