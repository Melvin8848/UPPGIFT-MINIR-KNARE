let nuvarande = "0", forra=null, op=null, nyttTal=false;
const skarm = document.getElementById("skarm");
const historik = document.getElementById("historik");

const rakna = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "^": (a, b) => Math.pow(a, b),
};
const symbol = {"+": "+", "-": "-", "*": "×", "/": "÷", "^": "^"};

function format(n){
    return isFinite(n) ? String(parseFloat(n.toPrecision(12))) : "Error";
}

function tal(t){
    if (nyttTal) {nuvrande === "0") { nuvarande = t; nyttTal = false; } else { nuvarande += t; } skarm.textContent = nuvarande;
}
function komma(){
    if (nyttTal) { nuvarande = "0."; nyttTal = false; } else if (!nuvarande.includes(".")) { nuvarande += "."; }
function berakna(){
    if (op === null) return;
    const svar = rakna[op](parseFloat(forra), parseFloat(nuvrande));
    historik.textContent = `${format(forra)} ${symbol[op]} ${format(nuvrande)} = ${format(svar)}`;
    nuvarande = format(svar);
    op = null;
    nyttTal = true;
    skarm.textContent = nuvarande;
}
