const { getGoogleReviews } = require('../services/googleReviewsService');

async function getReviews(req, res) {
  try {
    const data = await getGoogleReviews();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Errore controller recensioni:', err);
    return res.status(500).json({ error: 'Impossibile recuperare le recensioni al momento' });
  }
}

module.exports = {
  getReviews
};
