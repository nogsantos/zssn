/**
 * @description
 *  Survivor Entity
 * @namespace 
 *  v1/Survivor
 * 
 * @author Fabricio Nogueira
 */
export class Survivor {
    private _id: string;
    private _name: string;
    private _age: number;
    private _gender: string;
    private _lonlat: string;
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

    get age(): number {
        return this._age;
    }
    set age(param: number) {
        this._age = param;
    }

    get gender(): string {
        return this._gender;
    }
    set gender(param: string) {
        this._gender = param;
    }

    get lonlat(): string {
        return this._lonlat;
    }
    set lonlat(param: string) {
        this._lonlat = param;
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
