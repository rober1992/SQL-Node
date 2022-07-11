import { productPersistence } from "../persistence/productsDB";
import { Request, Response, NextFunction} from 'express';


const tableName = 'productos';

class ProductController {

    checkAddProduct (err: Error, req: Request, res: Response, next: NextFunction) {

        const { name, price, description, thumbnail, stock } = req.body;

        if (!name || !price || !description || !thumbnail || !stock ||  
            typeof name !== 'string' || 
            typeof description !== 'string' ||
            typeof thumbnail !== 'string' ||
            isNaN(stock) ||
            isNaN(price)) {
        return res.status(400).json({
            msg: 'Campos del body invalidos',
            error : err
        });
        }

    next();
    }

    checkProductExist (req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const producto = productPersistence.get(Number(id));

        if(!producto) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        next();
    }

    async getProducts(req: Request, res: Response) {
        const total = await productPersistence.get();
        res.render('main', { products : total} );
    };
        

    async addProduct(req: Request, res: Response) {
        console.log(req.body);
        await productPersistence.add(req.body);
        res.redirect('/api/products');
    }

    async updateProduct(req: Request, res: Response) {
        const {id} = req.params;
        const productUpdated = await productPersistence.update(Number(id),req.body)

        res.json({
            msg : 'Producto actualizado con exito',
            data : productUpdated
        })
    }

    delete(req: Request, res: Response) {
        const {id} = req.params;
        productPersistence.delete(Number(id));

        res.json({
            msg : 'Producto borrado con exito'
        })
    }
}

export const productController = new ProductController();