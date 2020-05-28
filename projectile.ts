namespace SpriteKind {
    export const PlayerProjectile = SpriteKind.create();
    export const EnemyProjectile = SpriteKind.create();
}

class Projectile {
    public static instances: Projectile[];
    protected static needsCleanup: boolean;
    protected static updateProjectiles() {
        const tm = game.currentScene().tileMap;
        if (!tm) return;

        const enemies = sprites.allOfKind(SpriteKind.Enemy);
        const players = sprites.allOfKind(SpriteKind.Player);

        for (const projectile of Projectile.instances) {
            projectile.checkWalls(tm);

            if (projectile.isEnemyProjectile()) {
                projectile.checkCollisions(players);
            }
            else {
                projectile.checkCollisions(enemies);
            }
        }

        if (Projectile.needsCleanup) {
            Projectile.needsCleanup = false;
            Projectile.instances = Projectile.instances.filter(p => !p.isDestroyed());
        }
    }

    constructor(public sprite: Sprite) {
        sprite.setFlag(SpriteFlag.Ghost, true);
        sprite.setFlag(SpriteFlag.AutoDestroy, true);

        if (!Projectile.instances) {
            Projectile.instances = [];
            game.onUpdate(function() {
                Projectile.updateProjectiles();
            });
        }

        Projectile.instances.push(this);
    }

    checkWalls(tm: tiles.TileMap) {
        if ((this.sprite.flags & sprites.Flag.Destroyed) || 
            tm.isObstacle(this.sprite.x >> tm.scale, this.sprite.y >> tm.scale)) {
            this.destroy();
        }
    }

    checkCollisions(toCheck: Sprite[]) {
        const x = Fx8(this.sprite.x);
        const y = Fx8(this.sprite.y);

        for (const sprite of toCheck) {
            if (testPoint(x, y, sprite._hitbox)) {
                this.destroy();
                return;
            }
        }
    }

    destroy() {
        if (!(this.sprite.flags & sprites.Flag.Destroyed)) {
            this.sprite.destroy();
        }
        Projectile.needsCleanup = true;
    }

    isDestroyed() {
        return !!(this.sprite.flags & sprites.Flag.Destroyed)
    }

    isEnemyProjectile() {
        return this.sprite.kind() == SpriteKind.EnemyProjectile;
    }
}

function createEnemyProjectile(enemy: EnemyState, speed = 100) {
    const projectile = sprites.create(
        img`
            7 7
            7 7
        `,
        SpriteKind.EnemyProjectile
    );
    
    projectile.x = enemy.sprite.x;
    projectile.y = enemy.sprite.y

    projectile.setVelocity(
        Math.cos(enemy.heading) * speed,
        Math.sin(enemy.heading) * speed
    );

    const p = new Projectile(projectile);
}

function testPoint(x: Fx8, y: Fx8, hitbox: game.Hitbox) {
    return !(x < hitbox.left || x > hitbox.right || y < hitbox.top || y > hitbox.bottom)
}