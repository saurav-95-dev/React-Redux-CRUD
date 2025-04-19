//Promises : 

console.log("Hello")

async function getData() {
    let result = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1");
    console.log(result);
    
}


getData();

console.log("This is the line after getData");

