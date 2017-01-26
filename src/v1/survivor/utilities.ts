/**
 * @description
 *  Utilities for Survivor
 * @namespace 
 *  v1/Survivor
 * 
 * @author Fabricio Nogueira
 */
export class Utilities {
    /**
     * Location string pattern
     * 
     * @param  Array<string> lonlat The Longitud and Latitud
     * @return string point pattern
     */
    static locationPattern(lonlat: Array<string> | string): string {
        return (lonlat !== null) ?
            `POINT (${lonlat[1]} ${lonlat[0]})` :
            `POINT (0 0)`;
    }
    /**
     * Parse location from String `POINT (0 0)` to  Array [0, 0]
     * 
     * @param  Array<string> | string lonlat The Longitud and Latitud
     * @returns Array<String> Lontitud, Latitud
     */
    static locationParse(lonlat: Array<string> | string): Array<string> {
        try {
            if (typeof lonlat !== "string") {
                return [
                    lonlat[0],
                    lonlat[1]
                ];
            }
            let a = lonlat.substr(7, lonlat.length - 1);
            let b = a.substr(-a.length, a.length - 1).split(" ");
            return [
                b[1],
                b[0]
            ];
        } catch (error) {
            return [];
        }
    }

}
