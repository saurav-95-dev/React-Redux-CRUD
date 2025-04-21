//Promises : 
let btn = document.getElementById("btn");
let searchBar = document.getElementById("input-text");
let idMain = document.getElementById("main-id");
let name = document.getElementById("post-name");
let email = document.getElementById("email");
let description = document.getElementById("description");

console.log("Hello")

async function getData(value) {
    const promise = await fetch(`https://jsonplaceholder.typicode.com/comments?id=${value}`)
    return await promise.json();
    
}

btn.addEventListener("click", async () => {
    let val = searchBar.value;
    const res = await getData(val);
    idMain.innerText = `${res.id}`;
    name.innerText = `${res.name}`;
    email.innerText = `${res.email}`;
    description.innerText = `${res.body}`;
    console.log(res);
})

console.log("This is the line after getData");

