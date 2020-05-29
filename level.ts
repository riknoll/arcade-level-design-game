namespace SpriteKind {
    export const Static = SpriteKind.create();
}

class LevelSelect {
    protected levels: tilemap.WorldMap[] = [];
    protected preview: Sprite;
    protected leftArrow: Sprite;
    protected rightArrow: Sprite;
    protected currentLevel = 0;
    public selected = false;

    protected scale = 4;
    protected tileColor = [0, 1, 0, 7, 3, 11];

    protected emptyMap = tilemap.createMap(tiles.createTilemap(
        hex`0a0008000202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202`,
        img`
            . . . . . . . . . .
            . . . . . . . . . .
            . . . . . . . . . .
            . . . . . . . . . .
            . . . . . . . . . .
            . . . . . . . . . .
            . . . . . . . . . .
            . . . . . . . . . .
        `,
        [myTiles.tile0, myTiles.tile1, myTiles.tile2, myTiles.tile3, myTiles.tile4, myTiles.tile5, myTiles.tile6, myTiles.tile7],
        TileScale.Sixteen
    ))

    constructor() {}

    public setLevels(levels: tilemap.WorldMap[]) {
        this.levels = levels;
        this.initSprites();
        this.drawLevel(this.currentLevel);
    }

    protected initSprites() {
        this.clearSprites();

        const leftArrowImage = img`
            . . . . . . . 1 1
            . . . . . . 1 1 1
            . . . . . 1 1 1 1
            . . . . 1 1 1 1 .
            . . . 1 1 1 1 . .
            . . 1 1 1 1 . . .
            . 1 1 1 1 . . . .
            1 1 1 1 . . . . .
            . 1 1 1 1 . . . .
            . . 1 1 1 1 . . .
            . . . 1 1 1 1 . .
            . . . . 1 1 1 1 .
            . . . . . 1 1 1 1
            . . . . . . 1 1 1
            . . . . . . . 1 1
        `
        const rightArrowImage = leftArrowImage.clone();
        rightArrowImage.flipX();

        this.leftArrow = sprites.create(leftArrowImage, SpriteKind.Static);
        this.leftArrow.left = 10;
        this.rightArrow = sprites.create(rightArrowImage, SpriteKind.Static);
        this.rightArrow.right = 150;

        this.preview = sprites.create(img`.`, SpriteKind.Static);
        this.preview.setFlag(SpriteFlag.Ghost, true);
    }

    protected clearSprites() {
        if (this.preview) this.preview.destroy();
        if (this.leftArrow) this.leftArrow.destroy();
        if (this.rightArrow) this.rightArrow.destroy();

        this.preview = undefined;
        this.leftArrow = undefined;
        this.rightArrow = undefined;
    }

    public drawLevel(idx: number) {
        const level = this.levels[idx].tilemap;
        if (level) {
            const rows = level.height;
            const cols = level.width;

            const preview: Image = image.create(
                (cols * this.scale),
                (rows * this.scale))

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const t = level.getTile(c, r);
                    this.drawTile(this.tileColor[t], preview, c * this.scale, r * this.scale, this.scale);
                }
            }

            this.preview.setImage(preview);
            this.preview.x = 80;
            this.preview.y = 60;
        }
    }

    protected drawTile(idx: number, map: Image, x: number, y: number, scale: number) {
        map.fillRect(x, y, scale, scale, idx);
    }

    public changeLevel(increment: boolean) {
        if (increment) {
            this.currentLevel = (this.currentLevel + 1) % this.levels.length;
        } else {
            this.currentLevel = (this.currentLevel + this.levels.length - 1) % this.levels.length;
        }
        this.drawLevel(this.currentLevel);
    }

    public selectLevel() {
        this.clearSprites();
        this.selected = true;
        tilemap.loadMap(this.levels[this.currentLevel]);
    }

    public clearLevel() {
        const kinds = [SpriteKind.Player, SpriteKind.Enemy, SpriteKind.Projectile, SpriteKind.PlayerProjectile, SpriteKind.EnemyProjectile];
        kinds.forEach(function (kind) {
            sprites.allOfKind(kind).forEach(s => {
                s.destroy();
            });
        })
        theHero = undefined;

        tilemap.loadMap(this.emptyMap);
        scene.centerCameraAt(80, 60);
        this.selected = false;
        this.initSprites();
        this.drawLevel(this.currentLevel);
    }
}

const selector = new LevelSelect();

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!selector.selected) selector.changeLevel(false);
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!selector.selected) selector.changeLevel(true);
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!selector.selected) selector.selectLevel();
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (selector.selected) selector.clearLevel();
})

tilemap.onMapLoaded(function (tm: tilemap.WorldMap) {
    if (selector.selected) {
        tilemap.coverAllTiles(myTiles.tile3, myTiles.tile2)
        tilemap.coverAllTiles(myTiles.tile4, myTiles.tile2)
        
        createHero();

        for (const t of tiles.getTilesByType(myTiles.tile3)) {
            createEnemy(t)
        }
    }
})