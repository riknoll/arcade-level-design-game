class TriangleSprite extends sprites.BaseSprite {
    protected heading: number;

    constructor(public target: Sprite) {
        super(target.z + 1);
        this.heading = 0;
    }

    __update(camera: scene.Camera, dt: number) {
        if (this.target.flags & sprites.Flag.Destroyed) this.destroy();

        if (this.target.vx || this.target.vy) {
            this.heading = Math.atan2(this.target.vy, this.target.vx)
        }
    }

    __drawCore(camera: scene.Camera) {
        if (this.target.isOutOfScreen(camera)) return;
        drawTriangle(
            screen,
            this.target.x - camera.drawOffsetX,
            this.target.y - camera.drawOffsetY,
            this.heading,
            10)
    }

    destroy() {
        game.currentScene().allSprites.removeElement(this);
    }
}

function drawTriangle(target: Image, cx: number, cy: number, heading: number, radius: number) {
    const x1 = cx + radius * Math.cos(heading);
    const y1 = cy + radius * Math.sin(heading);
    const x2 = cx + radius * Math.cos(heading + (2 * Math.PI / 3));
    const y2 = cy + radius * Math.sin(heading + (2 * Math.PI / 3));
    const x3 = cx + radius * Math.cos(heading - (2 * Math.PI / 3));
    const y3 = cy + radius * Math.sin(heading - (2 * Math.PI / 3));

    target.drawLine(cx, cy, x1, y1, 1);
    // target.drawLine(x1, y1, x2, y2, 1);
    // target.drawLine(x2, y2, x3, y3, 1);
    // target.drawLine(x1, y1, x3, y3, 1);
}