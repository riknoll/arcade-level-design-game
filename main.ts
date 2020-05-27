namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    //% blockIdentity=images._tile
    export const tile1 = img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
    //% blockIdentity=images._tile
    export const tile2 = img`
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
    `
    //% blockIdentity=images._tile
    export const tile3 = img`
        f f f f f f f f f f f f f f f f
        f 1 f f f f f f f f f f 1 f f f
        f 1 f f f f f f f f f f 1 f f f
        f 1 f f f f f f f f f f 1 f f f
        f 1 1 1 f 1 1 1 f f 1 1 1 f f f
        f 1 f 1 f 1 f 1 f f 1 f 1 f f f
        f 1 1 1 f 1 1 1 1 f 1 1 1 f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f 1 1 1 f 1 f 1 f f 1 f 1 f f f
        f 1 f 1 f 1 f 1 f f 1 f 1 f f f
        f 1 1 1 f 1 1 1 1 f 1 1 1 f f f
        f f f 1 f f f f f f f f 1 f f f
        f f 1 1 f f f f f f f 1 1 f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
    `
    //% blockIdentity=images._tile
    export const tile4 = img`
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f 3 f 3 f 3 3 f 3 3 3 f 3 3 3 f
        f 3 f 3 f 3 f f 3 f 3 f 3 f 3 f
        f 3 3 3 f 3 3 f 3 3 3 f 3 f 3 f
        f 3 f 3 f 3 f f 3 3 f f 3 f 3 f
        f 3 f 3 f 3 3 f 3 f 3 f 3 3 3 f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
    `
}
tilemap.loadMap(tilemap.createMap(tiles.createTilemap(
            hex`1000100001010101010101010101010101010101010202020202020202020202020202010102020302020202020202020302020101020202020202020202020202020201010202020202020202020202020202010102020202010101010101020202020101020202020102020202010202020201010202020201020402020102020202010102020202010202020201020202020101020202020101020201010202020201010202020202020202010202020202010102020202020202020102020202020101020202020202020201020202020201010202020202020202010202030202010102020202020202020102020202020101010101010101010101010101010101`,
            img`
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                2 . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . 2
                2 . . . . 2 2 2 2 2 2 . . . . 2
                2 . . . . 2 . . . . 2 . . . . 2
                2 . . . . 2 . . . . 2 . . . . 2
                2 . . . . 2 . . . . 2 . . . . 2
                2 . . . . 2 2 . . 2 2 . . . . 2
                2 . . . . . . . . 2 . . . . . 2
                2 . . . . . . . . 2 . . . . . 2
                2 . . . . . . . . 2 . . . . . 2
                2 . . . . . . . . 2 . . . . . 2
                2 . . . . . . . . 2 . . . . . 2
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            `,
            [myTiles.tile0,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4],
            TileScale.Sixteen
        )))
