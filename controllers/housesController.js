const House = require('../models/House')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all houses 
// @route GET /houses
// @access Private
const getAllHouses = asyncHandler(async (req, res) => {
    // Get all houses from MongoDB
    const houses = await House.find().lean()

    // If no houses 
    if (!houses?.length) {
        return res.status(400).json({ message: 'No houses found' })
    }

    // Add username to each house before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const housesWithUser = await Promise.all(houses.map(async (house) => {
        const user = await User.findById(house.user).lean().exec()
        return { ...house, username: user.username }
    }))

    res.json(housesWithUser)
})

// @desc Create new house
// @route POST /houses
// @access Private
const createNewHouse = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await House.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate house title' })
    }

    // Create and store the new user 
    const house = await House.create({ user, title, text })

    if (house) { // Created 
        return res.status(201).json({ message: 'New house created' })
    } else {
        return res.status(400).json({ message: 'Invalid house data received' })
    }

})

// @desc Update a house
// @route PATCH /houses
// @access Private
const updateHouse = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm house exists to update
    const house = await House.findById(id).exec()

    if (!house) {
        return res.status(400).json({ message: 'House not found' })
    }

    // Check for duplicate title
    const duplicate = await House.findOne({ title }).lean().exec()

    // Allow renaming of the original house 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate house title' })
    }

    house.user = user
    house.title = title
    house.text = text
    house.completed = completed

    const updatedHouse = await house.save()

    res.json(`'${updatedHouse.title}' updated`)
})

// @desc Delete a house
// @route DELETE /houses
// @access Private
const deleteHouse = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'House ID required' })
    }

    // Confirm house exists to delete 
    const house = await House.findById(id).exec()

    if (!house) {
        return res.status(400).json({ message: 'House not found' })
    }

    const result = await house.deleteOne()

    const reply = `House '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllHouses,
    createNewHouse,
    updateHouse,
    deleteHouse
}