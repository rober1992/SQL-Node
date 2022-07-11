import generateRandomString from '../utils/generateCode';
import { mySQLDB } from '../services/db';


interface addProduct {
    name : string,
    price : number,
    description : string,
    thumbnail : string,
    stock : number,
}


class Productos {

    async get(id: number | undefined = undefined) {
        if(id) {
            return  mySQLDB.from('productos').where({ id: id }).select();
        }
        return mySQLDB.from('productos').select();;
    }

    async add(data : addProduct) {

        const newProduct = {
            name : data.name,
            price : data.price,
            description : data.description,
            thumbnail : data.thumbnail,
            stock : data.stock,
            code : generateRandomString(5)
        }

        return mySQLDB('productos').insert(newProduct);
    }


    async update (id : number, data : addProduct) {
        return mySQLDB.from('productos').where({ id }).update(data);
    }


    async delete(id : number) {
        return mySQLDB.from('productos').where({ id }).del();
    }
}

export const productPersistence = new Productos();
