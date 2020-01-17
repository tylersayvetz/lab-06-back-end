
const findCity = (req, res, next) => {
  //does the searched city exist? if not redirect to /error
  console.log("findCity");
  const city = req.query.city;
  try {
    const rawData = require('./data/geo.json');
    const valid = rawData.find(cit => {
      const foundCity = cit.display_name.split(',');
      return (foundCity[0].toLowerCase() === city) ? city : null;
    })
    if (valid) {
      next();
    }
    else {
      send500(req, res);
    }
  } catch (error) {
    console.log(error);
  }

}

module.exports = findCity;