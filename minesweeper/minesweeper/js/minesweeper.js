const LONG=10;
const LARG=10;
const BOMB=LARG*LONG/10;
let tableInfo=[];
let emplacement=[];
let bomb = ".";

function infoTableBuilder(){
    for(let j=0; j < LARG; j++) {
        tableInfo.push([]);
        for (let i = 0; i < LONG; i++) {
            tableInfo[j].push("");
        }
    }
}

function bombPlacer() {
    let x
    let y
    let xy
    let exists=false;
    while (emplacement.length < BOMB) {
        exists=false;
        x = Math.round(Math.random()*(LONG-1))
        y = Math.round(Math.random()*(LARG-1))
        xy= x+","+y
        if(emplacement.length===0){
            emplacement.push(xy)
        }
        for(let i=0; i<emplacement.length;++i){
            if(emplacement[i]===xy) {
                exists = true;
            }
        }
        if(!exists){
            emplacement.push(xy);
        }

    }
}

function htmlTableBuilder(){
    /**
     * fonction qui cree l'html de la table
     */
    let container = document.getElementById("table");
    let completeTable = "<table border='1'>";
    let row="<tr>";
    let cell;
    for(let j=0; j < LARG; j++) {
        row="";
        for (let i = 0; i < LONG; i++) {
            cell = `<td id=${i+","+j} class="cell"><button id=${i+"."+j} class="gameButton" onmousedown="clicker(event,this.id)"></button></td>`;
            row += cell;
        }
        row+="</tr>";
        completeTable+=row;
    }
    completeTable+="</table>";
    container.innerHTML=completeTable;
    return completeTable;
}
function clicker(event,id){
    console.log(event.button);
    if(event.button === 0){
        reveal(id);
    }else if(event.button === 2){
        if(document.getElementById(id).style.backgroundColor === "red"){
            document.getElementById(id).style.backgroundColor = "initial";
        }else {
            document.getElementById(id).style.backgroundColor = "red";
        }
    }
}
let toBeRevealed = [];
function findEmpty(id){
    toBeRevealed.push(id);
    let coordinates = around(id[0],id[2]);
    for(let i in coordinates){
        console.log(i)
        if((tableInfo[coordinates[i][0]][coordinates[i][1]] === 0 )&&( !(coordinates[i].join(".") in toBeRevealed))){
            findEmpty(coordinates[i].join("."));
        }
    }
}
function reveal(id){
    document.getElementById(id).innerHTML = tableInfo[id[0]][id[2]];
 }
function numBomb() {
    for(let i=0;i<LONG;++i){
        for(let j=0;j<LONG;++j){
            for(let k = 0; k<emplacement.length;++k){
                if(emplacement[k] === (i+","+j)){
                    console.log("bomb");
                    tableInfo[i][j] = bomb;
                    break;
                }else{
                    tableInfo[i][j] = verifyNum(i,j);
                }
            }
        }
    }
}
function checkForBomb(coord){
    let bomb = false;
    for(let i = 0; i<emplacement.length;i++){
        if(emplacement[i] === coord){bomb = true;}
    }
    return bomb;
}
function around(x,y){
    let defaultCoords = [[x-1,y-1],[x-1, y],[x-1, y+1],[x,y-1],[x, y+1],[x+1,y-1],[x+1, y],[x+1, y+1]];
    let coords = [];
    for(let i in defaultCoords){
        if((defaultCoords[i][0] in tableInfo) && (defaultCoords[i][1] in tableInfo[defaultCoords[i][0]])){
            coords.push(defaultCoords[i]);
        }
    }
    return coords;
}
function verifyNum(i,j){
    let numBomb = 0;
    let coordinates = around(i,j);
    for(let i in coordinates){
        if(checkForBomb(coordinates[i].join(","))){numBomb++;}
    }
    return numBomb;
}
function lancer() {
    bombPlacer();
    infoTableBuilder();
    numBomb();
    htmlTableBuilder();

    // let buttons = document.getElementsByClassName("gameButton");
    // for(let i = 0; i<buttons.length;i++){
    //     buttons[i].addEventListener("mousedown",clicker())
    // }
}
