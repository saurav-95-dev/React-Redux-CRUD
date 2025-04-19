//Promises : 
let btn = document.getElementById("btn");
let searchBar = document.getElementById("input-text");


console.log("Hello")

async function getData(value) {
    const promise = await fetch(`https://jsonplaceholder.typicode.com/comments?id=${value}`)
    return await promise.json();
    
}

btn.addEventListener("click", async () => {
    let val = searchBar.value;
    const res = await getData(val);
    console.log(res);
})

console.log("This is the line after getData");

