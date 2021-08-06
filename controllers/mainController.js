const { Router } = require("express");
const mainService = require("../services/mainService");
const { isAuth, auth } = require("../middlewares/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const main = await mainService.getInfo();
    res.status(200).json(main);
  } catch (err) {
    res.status(400).json({ error: { message: err } });
  }
});

router.post("/", isAuth, auth, async (req, res) => {
  let data = req.body;

  try {
    await mainService.createPortfolio(data);
    res.end();
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;
