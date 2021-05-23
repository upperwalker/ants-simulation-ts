import { AntsScene } from "../scenes/ants.scene";
import { Point } from "../types/point";
import { Grid } from "./grid";

export class Sensor {

    constructor(public grid: Grid) {}

    isInsideSector(point: Point, center: Point, sectorStart: Point, sectorEnd: Point, radiusSquared: number) {

        const relPoint: Point = {
            x: point.x - center.x,
            y: point.y - center.y
        }

        return !this.areClockwise(sectorStart, relPoint) &&
            this.areClockwise(sectorEnd, relPoint) &&
            this.isWithinRadius(relPoint, radiusSquared);
    }

    areClockwise(v1: Point, v2: Point) {
        return -v1.x*v2.y + v1.y*v2.x > 0;
    }

    isWithinRadius(v: Point, radiusSquared: number) {
            return v.x*v.x + v.y*v.y <= radiusSquared;
    }
}
