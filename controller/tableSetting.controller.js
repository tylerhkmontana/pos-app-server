const express = require("express")
const router = express.Router()
const TableSetting = require("../models/TableSetting.js")

router.get("/", async (req, res, next) => {
  try {
    const tableSettings = await TableSetting.find()
    res.status(200).json(tableSettings)
  } catch(err) {
    res.locals.error_message = "Failed to retrieve the settings"
    next(err)
  }
})

router.post("/save", async (req, res, next) => {
  const { tableSetting } = req.body
  
  const newTableSetting = new TableSetting({
    ...tableSetting
  })
  try {
    await newTableSetting.save()
    res.status(200).send("Successfully saved the table setting")
  } catch(err) {
    res.locals.error = {
      message: "Failed to save the setting",
      status: 500
    }
    next(err)
  } 
})

router.put("/update", async (req, res, next) => {
  const {
    selectedSettingId,
    tableStructure
  } = req.body.newSetting

  try {
    await TableSetting.findByIdAndUpdate(selectedSettingId, { tableStructure }, { new: true })
    res.status(200).send("Successfully updated the table setting")
  } catch(err) {
    res.locals.error = {
      message: "Failed to update the setting",
      status: 500
    }
    next(err)
  }
})

router.delete("/delete", async (req, res, next) => {
  const { id } = req.body
  
  try {
    await TableSetting.findByIdAndDelete(id)
    res.status(200).send("Successfully deleted the table setting")
  } catch (err) {
    res.locals.error = {
      message: "Failed to delete the setting",
      status: 500
    }
    next(err)
  }
})
module.exports = router