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
    n=Number(n);
    return isFinite(n) ? String(parseFloat(n.toPrecision(12))) : "Error";
}

function tal(t){
    if (nyttTal || nuvarande === "0") { nuvarande = t; nyttTal = false; } else nuvarande += t;
}

function komma(){
    if (nyttTal) { nuvarande = "0."; nyttTal = false; } else if (!nuvarande.includes(".")) { nuvarande += "."; }
}
function berakna(){
    if (op === null) return;
    const svar = rakna[op](parseFloat(forra), parseFloat(nuvarande));
    historik.textContent = `${format(forra)} ${symbol[op]} ${format(nuvarande)} = ${format(svar)}`;
    nuvarande = format(svar);
    op = null;
    nyttTal = true;
}
function operator(o){
    if (op !== null && !nyttTal) berakna();
    forra = nuvarande;
    op = o;
    nyttTal = true;
    historik.textContent = `${format(forra)} ${symbol[op]}`;
}

function rot(){
    const x = parseFloat(nuvarande);
    historik.textContent = `√${format(x)}`;
     nuvarande = x < 0 ? "Error" : format(Math.sqrt(x));
     nyttTal = true;
}

function procent(){
nuvarande = format(parseFloat(nuvarande) / 100);
    nyttTal = true;
}

function rensa(){
    nuvarande = "0";
    forra = null;
    op = null;
    nyttTal = false;
    historik.textContent = "";
}

function tryck(knapp) {
    knapp.classList.add("tryckt");
    setTimeout(() => knapp.classList.remove("tryckt"), 150);
    if (nuvarande === "Error") rensa();
    const { typ, v } = knapp.dataset;
    if (typ === "tal") tal(v);
    else if (typ === "komma") komma();
    else if (typ === "op") operator(v);
    else if (typ === "lika") berakna();
    else if (typ === "sqrt") rot();
    else if (typ === "procent") procent();
    else if (typ === "rensa") rensa();
    skarm.textContent = (op !== null && nyttTal) ? nuvarande + " " + symbol[op] : nuvarande;
    }

    const knappar = [...document.querySelectorAll(".knappar button")];
    knappar.forEach(k => k.addEventListener("click", () => tryck(k)));


document.addEventListener("keydown", e => {
    const t = e.key === "," ? "." : e.key === "=" ? "Enter" : e.key;
    const k = knappar.find(b => b.dataset.tangent === t);
    if (k) {e.preventDefault(); tryck(k);}
});
 