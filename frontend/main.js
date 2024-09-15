window.addEventListener('DOMContentLoaded',(event)=> {
    getHitCount();
})
const funcApi = 'http://localhost:7071/api/resumecounter';
const funcURL = 'https://func-resumecount.azurewebsites.net/api/resumecounter?code=0oTCFKNomF_Bd8awb8zALOwqxtGfLyctHeDfXy6sOij5AzFuOfM-zg%3D%3D'
const getHitCount = () =>{
let count = 40;
fetch (funcURL).then (response => {
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