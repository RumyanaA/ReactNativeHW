const FileService = require('../Services/FileService');
const TimeAndWeatherService = require('../Services/TimeAndWeatherService');
const CreateOutputService = require('../Services/CreateOutputService');
const logger = require('../Services/LoggingService');

module.exports = async function getCityData(req, res) {
  try {
    const { city } = req.headers;
    const { email } = req.headers;
    const cityInfo = await TimeAndWeatherService.getTimeAndWeather(city);
    let output;
    if (cityInfo.error) {
      output = CreateOutputService.handleWrongCity(cityInfo);
      logger.error(output);
    } else {
      output = await CreateOutputService.createOutputCityObject(
        cityInfo,
        email,
      );
      logger.info('Appended city info in Output.txt');
    }
    FileService.WriteFile(output);
    res.send(output);
  } catch (e) {
    logger.error(e.message);
    res.send('Something went wrong');
  }
};
