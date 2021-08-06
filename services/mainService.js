const resumeInformation = require('../models/resumeInformation');

async function getInfo() {
  const info = await resumeInformation.find().lean();

  return info;
}

async function createPortfolio (data) {
  const info = await new resumeInformation(data)

  return info.save()
}



module.exports = {
  getInfo,
  createPortfolio
};
