/**
 * @description
 *  Inventory Entity
 * @namespace 
 *  v1/Survivor
 * 
 * @author Fabricio Nogueira
 */
export class Inventory {
    private _id: string; //location      
    private _name: string;
    private _quantity: number;
    private _points: number;
    private _created_at: string;
    private _updated_at: string;

    get id(): string {
        return this._id;
    }
    set id(param: string) {
        this._id = param;
    }

    get name(): string {
        return this._name;
    }
    set name(param: string) {
        this._name = param;
    }

    get quantity(): number {
        return this._quantity;
    }
    set quantity(param: number) {
        this._quantity = param;
    }

    get points(): number {
        return this._points;
    }
    set points(param: number) {
        this._points = param;
    }

    get created_at(): string {
        return this._created_at;
    }
    set created_at(param: string) {
        this._created_at = param;
    }

    get updated_at(): string {
        return this._updated_at;
    }
    set updated_at(param: string) {
        this._updated_at = param;
    }

}
