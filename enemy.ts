class EnemyState {
    public static instances: EnemyState[];

    public heading: number;
    public targetX: number;
    public targetY: number;
    public angularVelocity: number;
    public speed: number;
    public path: tiles.Location[];

    constructor(public sprite: Sprite) {
        this.heading = 0;
        this.speed = 50;
        this.angularVelocity = 0.2;

        if (!EnemyState.instances) {
            EnemyState.instances = [];

            game.onUpdate(updateEnemies)
        }

        EnemyState.instances.push(this);
    }

    update() {
        if (this.sprite.flags & sprites.Flag.Destroyed) {
            this.destroy();
            return;
        }
        else if (this.targetX == null || this.targetY == null) {
            this.sprite.setVelocity(0, 0);
            return;
        }
        else if ((this.targetY - this.sprite.y) ** 2 + (this.targetX - this.sprite.x) ** 2 < 6) {
            this.targetX = null;
            this.targetY = null;
            this.advancePath();
            return;
        }

        let angle = Math.atan2(this.targetY - this.sprite.y, this.targetX - this.sprite.x);

        if (angle < 0) angle += TWO_PI;

        if (angle !== this.heading) {
            if (Math.abs(this.heading - angle) < Math.PI) {
                if (this.heading < angle) {
                    this.heading += this.angularVelocity;
                }
                else {
                    this.heading -= this.angularVelocity
                }
            }
            else {
                if (this.heading < angle) {
                    this.heading -= this.angularVelocity;
                }
                else {
                    this.heading += this.angularVelocity
                }
            }

            if (this.heading < 0) this.heading += TWO_PI;

            if (Math.abs(this.heading - angle) < 0.3 || Math.abs(this.heading - TWO_PI - angle) < 0.3) {
                this.heading = angle;
            }
        }

        this.sprite.setVelocity(this.speed * Math.cos(this.heading), this.speed * Math.sin(this.heading))
    }

    moveTo(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
    }

    pathTo(target: Sprite, occupiedMap: Bitmask) {
        this.path = scene.aStar(tilemap.locationOfSprite(this.sprite), tilemap.locationOfSprite(target));
        // Toss the first position (the current location)
        this.path.shift();

        // We also want to replace the end position so that the enemies don't pile up
        let end = this.path.pop();
        while (end && occupiedMap.get(tilemap.locationColumn(end), tilemap.locationRow(end))) {
            end = this.path.pop();
        }
        if (!end) return;

        occupiedMap.set(tilemap.locationColumn(end), tilemap.locationRow(end));

        this.path.push(end)
        this.advancePath()
    }

    advancePath() {
        if (this.path && this.path.length) {
            const next = this.path.shift();
            this.targetX = next.x;
            this.targetY = next.y;
        }
    }

    destroy() {
        EnemyState.instances.removeElement(this);
    }
}

function updateEnemies() {
    for (const state of EnemyState.instances) {
        state.update();
    }
}

class Bitmask {
    protected mask: Buffer;

    constructor(public width: number, public height: number) {
        this.mask = control.createBuffer(Math.ceil(width * height / 8));
    }

    set(col: number, row: number) {
        const cellIndex = col + this.width * row;
        const index = cellIndex >> 3;
        const offset = cellIndex & 7;
        this.mask[index] |= (1 << offset);
    }

    get(col: number, row: number) {
        const cellIndex = col + this.width * row;
        const index = cellIndex >> 3;
        const offset = cellIndex & 7;
        return (this.mask[index] >> offset) & 1;
    }
}


let _pathLock = false;
function updatePaths() {
    if (_pathLock) return;
    control.runInBackground(_updatePathsCore)
}

function _updatePathsCore() {
    _pathLock = true;
    let mask = new Bitmask(tilemap.tilemapColumns(), tilemap.tilemapRows());
    for (const state of EnemyState.instances) {
        state.pathTo(theHero, mask)
        pause(1);
    }
    _pathLock = false;
}

function createEnemy(location: tiles.Location) {
    const enemyImage = img`
        . . . . 7 7 7 7 7 7 7 . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 . .
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . . 7 7 7 7 7 7 7 7 7 7 7 . .
        . . . . 7 7 7 7 7 7 7 . . . .
    `;

    const enemy = sprites.create(enemyImage, SpriteKind.Enemy);
    tiles.placeOnTile(enemy, location);
    const ts = new TriangleSprite(enemy);
    const es = new EnemyState(enemy);
}



