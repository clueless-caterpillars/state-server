// const fetch = require("node-fetch");

async function getCreds(){
  req1opts = {
    method: 'PUT',
    headers: {
      "X-aws-ec2-metadata-token-ttl-seconds": 21600
    }
  }
  

  const token = await fetch("http://169.254.169.254/latest/api/token",req1opts).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.text();
  })
  console.log(token);
  req2opts = {
    method: 'GET',
    headers: {
      "X-aws-ec2-metadata-token": token
    }
  }
  const url = "http://169.254.169.254/latest/meta-data/iam/security-credentials/EC2PiStateExecutionRole"
  const creds = await fetch(url,req2opts).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  })
  console.log(creds);
  aws_access_key_id = creds["AccessKeyId"];
  aws_secret_access_key = creds["SecretAccessKey"];
  aws_session_token = creds["Token"]

  console.log([aws_access_key_id,aws_secret_access_key,aws_session_token])
  return [aws_access_key_id,aws_secret_access_key,aws_session_token];
}

// get_creds().then((mycreds)=>
// {console.log("Access Key: ", mycreds[0])
// console.log("Secret Key: ", mycreds[1])
// console.log("Session Token: ", mycreds[2])}
// );

module.exports = getCreds



