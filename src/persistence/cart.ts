import generateRandomString from './../utils/generateCode'
import fs from 'fs';
import path from 'path';

const filePathProduct = path.resolve(__dirname, './../data/cart.json');

interface cart {
    id : string,
    productos : Array<object>,
    timestamp : number
}

class Cart implements cart {
    id = generateRandomString(5);
    timestamp = Date.now();
    productos = new Array;

    addProductsCart(data : object) {
        this.productos.push(data);

        const arrayString = JSON.stringify(this.productos, null, '\t')
        fs.writeFileSync(filePathProduct, arrayString);
    }

    getProductsCart(id: number | undefined = undefined) {
        if(id) {
            return this.productos.find(element => element.id == Number(id));
        }
        return this.productos;
    }

    deleteProductsCart(id : number) {
        this.productos = this.productos.filter(aProduct => aProduct.id !== id);

        const arrayString = JSON.stringify(this.productos, null, '\t')
        fs.writeFileSync(filePathProduct, arrayString);
    }
} 


export const cartPersistence = new Cart();