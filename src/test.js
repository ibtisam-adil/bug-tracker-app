let a = {name: "munneb"};
let b = {munneb: "talha"};

console.log(b[a.name])

console.log(a.name); // Output: munneb
console.log(b["munneb"]); // Output: talha
console.log(b[a.name]); // Output: talha
