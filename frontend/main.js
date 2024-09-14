window.addEventListener('DOMContentLoaded',(event)=> {
    getHitCount();
})
const funcApi = 'http://localhost:7071/api/resumecounter';
const funcURL = 'https://func-countertrigger.azurewebsites.net/api/resumecounter?code=s6VSHF1naj9O19WScOYzIdGi4Nj9RZJM17JYn1M1bTKlAzFuozw3FA%3D%3D'
const getHitCount = () =>{
let count = 40;
fetch (funcApi).then (response => {
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