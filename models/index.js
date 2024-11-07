// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { ForeignKeyConstraintError } = require('../config/connection');

// Categories have many Products
Category.hasMany(Product,{
  foreignKey: "category",
  onDelete: "CASCADE"
})

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey: "category_id",
  as: 'productCategory'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
  through:{
    model: ProductTag
  }
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through:{
    model: ProductTag
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
