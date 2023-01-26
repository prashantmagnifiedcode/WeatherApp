const axios=require("axios")
module.exports={
    Weather:async(req,res)=>{
        try {
            const cities = ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Hyderabad", "Ahmedabad", "Chennai", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Patna", "Ludhiana", "Agra", "Nashik", "Faridabad", "Vadodara", "Meerut", "Rajkot", "Kalyan", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi"];
const cityIds = [];
            
          for(let i =0;i<cities.length;i++){
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&units=metric&appid=${process.env.API_KEY}`;
            const response = await axios.get(API_URL);
            
            cityIds.push(response.data)
        }
            res.status(200).json(cityIds);
        } catch (err) {
            res.status(500).json({ message: "Some thing went Wrong" });
        }
    }
}