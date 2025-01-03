import express from "express";
import { Card } from '../models/cardModel.js';
import mongoose from "mongoose";

const router = express.Router();

// Fetch all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ message: 'Failed to fetch cards', error: error.message });
  }
});

// Add a new card
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Check incoming data

    const newCard = new Card(req.body);
    await newCard.save();

    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error adding card:', error); // Log the error
    res.status(500).json({ message: 'Failed to add card', error: error.message });
  }
});


// Fetch a single card by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ message: 'Failed to fetch card', error: error.message });
  }
});

// Update a card by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ message: 'Failed to update card', error: error.message });
  }
});

// Partially update a card by ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error('Error partially updating card:', error);
    res.status(500).json({ message: 'Failed to partially update card', error: error.message });
  }
});

// Delete a card by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  try {
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json({ message: 'Card successfully deleted', card: deletedCard });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ message: 'Failed to delete card', error: error.message });
  }
});

export { router };