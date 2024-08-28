window.addEventListener('DOMContentLoaded',(event)=> {
    getHitCount();
})
const funcApi = '';

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