import express from "express";
const router = express.Router();

router.get("/:client_id", async function( req, res, next){
    const client_id = req.params.client_id

    try {
      const [results] = await db.query(
        'SELECT date FROM daily WHERE client_id = ? AND is_sign = true',
        [client_id],
      )
  
      const signedDates = results.map((result) => result.date)
      res.json({ signedDates })
    } catch (err) {
      console.error(err)
      res.status(500).send('Database error: ' + err.message)
    }
})

export default router;