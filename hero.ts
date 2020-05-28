const HERO_FIRE_INTERVAL = 100; 


let theHero: Sprite;
const TWO_PI = Math.PI * 2;

function createHero() {
    if (theHero) {
        theHero.destroy();
    }
    else {
        scene.createRenderable(10, function (target, camera) {
            if (!theHero) return;
            
            drawTriangle(
                target,
                theHero.x - camera.drawOffsetX,
                theHero.y - camera.drawOffsetY,
                heroHeading,
            10)
        });
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
} 


game.onUpdate(updateHero)

let heroHeading = 0;
let heroFireTimer = 0;
let lastPosition: tiles.Location;


function updateHero() {
    if (!theHero) return;

    // Handle projectile firing
    if (heroFireTimer > 0) {
        heroFireTimer -= control.eventContext().deltaTimeMillis;
    }
    else if (controller.A.isPressed()) {
        heroFireTimer = HERO_FIRE_INTERVAL;
        createHeroProjectile(theHero, heroHeading);
    }

    // If the player has moved more than 30 pixels, recalculate enemy paths
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

        // Strafe if B is pressed
        if (controller.B.isPressed()) {
            theHero.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle))
            return;
        }

        if (angle !== heroHeading) {
            if (Math.abs(heroHeading - angle) < Math.PI) {
                if (heroHeading < angle) {
                    heroHeading += angularVelocity;
                }
                else {
                    heroHeading -= angularVelocity
                }
            }
            else {
                if (heroHeading < angle) {
                    heroHeading -= angularVelocity;
                }
                else {
                    heroHeading += angularVelocity
                } 
            }

            if (heroHeading < 0) heroHeading += TWO_PI;
            else if (heroHeading >= TWO_PI) {
                heroHeading -= TWO_PI;
            }

            if (Math.abs(heroHeading - angle) < 0.1 || Math.abs(heroHeading - TWO_PI - angle) < 0.1) {
                heroHeading = angle;
            }
        }

        theHero.setVelocity(speed * Math.cos(heroHeading), speed * Math.sin(heroHeading))
    }
    else {
        theHero.setVelocity(0, 0);
    }
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}