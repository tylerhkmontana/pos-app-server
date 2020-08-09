const express = require('express')
const router = express.Router()

const Item = require('../models/Item.js')
const Category = require('../models/Category.js')

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.find({})
    const categories = await Category.find({})

    res.status(200).json({
      items,
      categories
    })
  } catch(err) {
    res.locals.error = {
      message: "Can't get categories",
      status: 500
    }
    next(err)
  }
})

router.get('/category', async (req, res, next) => {
  try {
    res.status(200).send(await Category.find({}))
  } catch(err) {
    res.locals.error = {
      message: "Can't get categories",
      status: 500
    }
    next(err)
  }
})

router.get('/item', async (req, res, next) => {
  try {
    res.status(200).send(await Item.find({}))
  } catch(err) {
    res.locals.error = {
      message: "Can't get items",
      status: 500
    }
    next(err)
  }
})


router.post('/category', async (req, res, next) => {
  const { name, orderType } = req.body
  
  try {
    if(await Category.findOne({ name })) {
      res.locals.error = {
        message: "The category already exists",
        status: 409
      }
      next("error: duplicate document")
    } else {
      await new Category({
        name,
        orderType
      }).save()
      res.status(200).send("Successfully added the category")
    }
  } catch(err) {
    res.locals.error = {
      message: "Failed to add the category",
      status: 500
    }
    next(err)
  }
})

router.put('/category/update', async (req, res, next) => {
  const { id, name, orderType } = req.body

  try {
    if(await Category.findById(id)) {
      await Category.findByIdAndUpdate(id, { name, orderType })
      res.status(200).send("Successfully updated the category")
    } else {
      res.locals.error = {
        message: "The category doesn't exist",
        status: 404
      }
      next("error: document not found")
    }
  } catch(err) {
    res.locals.error = {
      message: "Failed to update the item",
      status: 500
    }
    next(err)
  }
})

router.delete('/category/delete', async (req, res, next) => {
  const { id } = req.body

  console.log(id)
  try {
    await Category.findByIdAndDelete(id)
    await Item.deleteMany({ category_id: id })
    res.status(200).send("Successfully deleted the category")
  } catch(err) {
    res.locals.error = {
      message: "Failed to delete the category",
      status: 500
    }
    next(err)
  }
})

router.post('/item', async (req, res, next) => {
  const { category_id, name, price, orderType } = req.body

  try {
    if(await Category.findById(category_id)) {
      await new Item({
        name,
        price,
        orderType,
        category_id
      }).save()
      res.status(200).send("Successfully added the item")
    } else {
      console.log("category not found")
      res.locals.error = {
        message: "The category doesn't exist",
        status: 404
      }
      next("error: document not found")
    }
  } catch(err) {
    res.locals.error = {
      message: "Failed to add the item",
      status: 500
    }
    next(err)
  }
})

router.put('/item/update', async (req, res, next) => {
  const { id, name, price, orderType } = req.body

  try {
    if(await Item.findById(id)) {
      await Item.findByIdAndUpdate(id, { name, price, orderType })
      res.status(200).send("Successfully updated the item")
    } else {
      res.locals.error = {
        message: "Item not found",
        status: 404
      }
      next("error: document not found")
    }
  } catch(err) {
    res.locals.error = {
      message: "Failed to update the item",
      status: 500
    }
    next(err)
  }
})

router.delete('/item/delete', async (req, res) => {
  const { id } = req.body

  try {
    await Item.findByIdAndDelete(id)
    res.status(200).send("Succefully deleted the item")
  } catch(err) {
    res.locals.error = {
      message: "Failed to delete the item",
      status: 500
    }
    next(err)
  }
})
module.exports = router