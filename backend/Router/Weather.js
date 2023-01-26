
const{Weather}=require("../Controller/WeatherControl")
const router = require("express").Router();
router.get("/weather",Weather)
module.exports = router;