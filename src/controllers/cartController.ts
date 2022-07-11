import { Request, Response, NextFunction} from 'express';
import { productPersistence } from "../persistence/productsDB";
import { cartPersistence } from '../persistence/cart';


class CartController {

    checkProductExist (req: Request, res: Response, next: NextFunction) {
        const idProd = Number(req.params.id);;
        const producto = cartPersistence.getProductsCart(idProd);

        if(producto === undefined) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        next();
    }

    getProducts(req: Request, res: Response) {
        const idProd = Number(req.params.id);
    
       res.json({
            ID : cartPersistence.id,
            timestamp : cartPersistence.timestamp,
             productListCart: cartPersistence.getProductsCart(idProd)
        });

    }

    addProductsCartID(req: Request, res: Response) {
        const idProd = Number(req.params.id);

        const productToAdd = productPersistence.get(idProd);
        
        cartPersistence.addProductsCart(productToAdd);

        res.json({
            msg : 'Product added successfully'
        });
    }

    deleteProductCart(req: Request, res: Response) {
        const idProd = Number(req.params.id);
        
        cartPersistence.deleteProductsCart(idProd);

        res.json({
            msg : 'Product deleted successfully'
        });
    }


}

export const cartController = new CartController();
