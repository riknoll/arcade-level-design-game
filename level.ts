tilemap.onMapLoaded(function (tm: tilemap.WorldMap) {
    tilemap.coverAllTiles(myTiles.tile3, myTiles.tile2)
    tilemap.coverAllTiles(myTiles.tile4, myTiles.tile2)
    
    createHero();

    for (const t of tiles.getTilesByType(myTiles.tile3)) {
        createEnemy(t)
    }
}) 