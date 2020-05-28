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

    constructor() {}

    public setLevels(levels: tilemap.WorldMap[]) {
        this.levels = levels;
        this.drawArrows();
        this.drawLevel(this.currentLevel);
    }

    protected drawArrows() {
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
    }

    public drawLevel(idx: number) {
        if (!this.preview) {
            this.preview = sprites.create(img`.`, SpriteKind.Static);
            this.preview.setFlag(SpriteFlag.Ghost, true);
        }
        if (!this.rightArrow) {
            this.drawArrows();
        }

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
        this.preview.destroy();
        this.rightArrow.destroy();
        this.leftArrow.destroy();
        this.selected = true;
        tilemap.loadMap(this.levels[this.currentLevel]);
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

tilemap.onMapLoaded(function (tm: tilemap.WorldMap) {
    tilemap.coverAllTiles(myTiles.tile3, myTiles.tile2)
    tilemap.coverAllTiles(myTiles.tile4, myTiles.tile2)
    
    createHero();

    for (const t of tiles.getTilesByType(myTiles.tile3)) {
        createEnemy(t)
    }
})