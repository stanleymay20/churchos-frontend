// Endpoint: /api/giving/stats
import express from 'express'
const router = express.Router()

router.get('/stats', (req, res) => {
  res.json({
    streams: ['Tithe', 'Offering', 'Seed'],
    totals: { USD: 1200, GHS: 3500, ScrollCoin: 77 }
  })
})

export default router;