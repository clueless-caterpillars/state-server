
async function getPlants(params='', query='') {
  let url = 'https://313kw3q2id.execute-api.us-west-2.amazonaws.com/test-deploy/status';

  if (params || query) {
    let queryKey = Object.keys(query)[0];
    let queryValue = Object.values(query)[0];
    url = `${url}${params}?${queryKey}=${queryValue}`
  }
  console.log(url)
  let plantStatus = await fetch(url);
  let plantStatusResult = await plantStatus.json();
  console.log('YOUR CURRENT PLANTS', plantStatusResult)
  return plantStatusResult;
}

module.exports = getPlants;