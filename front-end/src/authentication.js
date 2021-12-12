
const auth=()=>{
  
    const options = {
    
    headers: {'content-type':'application/json',
    'Authorization':`Bearer ${JSON.parse(localStorage.getItem('id_token'))}`,
    responseType: 'text'
  }

}
    return options

};

export default auth;