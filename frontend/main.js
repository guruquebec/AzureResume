window.addEventListener('DOMContentLoaded',(event)=> {
    getHitCount();
})
const funcApi = 'http://localhost:7071/api/resumecount';
const funcAzurURL = 'https://func-resumecount.azurewebsites.net/api/resumecount?code=7asq5dhNdSu2iBSZj6gRfM9CgK26GY_zcusWfaoabL5aAzFuXd7_HQ%3D%3D';
const getHitCount = () =>{
let count = 40;
fetch (funcAzurURL).then (response => {
    return response.json()
}).then (response => {
    console.log("Website called for count");
    count = response.count;
    document.getElementById("counter").innerText = count;
}).catch(function(error){
    console.log(error);
});
return count;
}