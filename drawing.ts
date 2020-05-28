function drawTriangle(target: Image, cx: number, cy: number, heading: number, radius: number) {
    const x1 = cx + radius * Math.cos(heading);
    const y1 = cy + radius * Math.sin(heading);
    // const x2 = cx + radius * Math.cos(heading + (2 * Math.PI / 3));
    // const y2 = cy + radius * Math.sin(heading + (2 * Math.PI / 3));
    // const x3 = cx + radius * Math.cos(heading - (2 * Math.PI / 3));
    // const y3 = cy + radius * Math.sin(heading - (2 * Math.PI / 3));

    target.drawLine(cx, cy, x1, y1, 1);
    // target.drawLine(x1, y1, x2, y2, 1);
    // target.drawLine(x2, y2, x3, y3, 1);
    // target.drawLine(x1, y1, x3, y3, 1);
}