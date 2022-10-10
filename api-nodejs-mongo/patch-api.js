app.patch('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Not Found' });
  
    if(req.body.name) product.name = req.body.name;
    if(req.body.price)  product.price = req.body.price;
  
    res.json(product);
  });

  