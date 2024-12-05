const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//http://localhost:3001/api/tags/
router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData= await Tag.findAll({
      include:[{model: Product, through: ProductTag}
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/1
router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData= await Tag.findByPk(
      req.params.id,
      {
      include:[{model: Product, through: ProductTag}
      ]
    });
    if(!tagData){
      res.json({message: "Tag ID Not Found"})
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/
router.post('/', async(req, res) => {
  // create a new tag
  try{
    const tagData= await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/1
router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData= await Tag.update({
      tag_name:req.body.tag_name
    },
    {
      where:{
        id:req.params.id
      }
    }
  );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/1
router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData= await Tag.destroy(
    {
      where:{
        id:req.params.id
      }
    }
  );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
