const Product = require('../models/ProductSchema');
const fs = require('fs')
exports.create = async(req,res) => {
    const {filename} = req.file;
    //these names have to match with frontend names
    const {productName, productDescription,productPrice, productCategory, productQuantity} = req.body;
    try{
        let product = new Product()
        product.fileName = filename;
        product.productName = productName;
        product.productDesc = productDescription;
        product.productPrice = productPrice;
        product.productCategory = productCategory;
        product.productQty = productQuantity;

        await product.save();
        res.json({
            successMessage:`${productName} was created`,
           product 
        })

    } catch(err){
        console.log(err,'ProductController.Create Error')
        
    res.status(500).json({
        errorMessage: "Please try again later",
    });
    }
}
exports.readAll = async (req, res) => {
	try {
		const products = await Product.find({}).populate(
			'productCategory',
			'category'
		);

		res.json({ products });
	} catch (err) {
		console.log(err, 'productController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
}
exports.read = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);

		res.json(product);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});	
    }
}

exports.update = async (req, res) => {
	//
    const productId = req.params.productId;
    req.body.fileName = req.file.filename;
    const oldProduct = await Product.findByIdAndUpdate(productId,req.body);
    fs.unlink(`unloads/${oldProduct.fileName}`, (err) => {
        if (err) throw err;
        console.log('Image Successfully deleted from filesystem');
    });
    res.json({ 
        successMessage: 'Successfully updated product'
    })
}

exports.delete = async (req,res) => {
    try{
        const productId = req.params.productId;
        const deleteProduct = await Product.findByIdAndDelete(productId);
        fs.unlink(`uploads/${deleteProduct.fileName}`,(err) =>{
            if(err) throw err;
            console.log("Image successfully deleted from filesystem", deleteProduct.fileName);

        });
        res.json(deleteProduct);

    } catch(err){
        console.log(err,"product controller delete error");
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }

}