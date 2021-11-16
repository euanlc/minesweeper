const LONG=10;
const LARG=10;
const BOMB=LARG*LONG/10;
let tableInfo=[];
let emplacement=[];
let bomb = ".";


//constructors
function Cell(i,j){
    this.cellId = i + "." + j;
    this.numBomb = verifyNum(i,j);
    this.isEmpty = this.numBomb === 0;
    this.isRevealed = false;
    this.isFlagged = false;
    this.isBomb = false;
    this.flag = function(){//a changer pour mettre un drapeau au lieu de juste changer la couleur
        this.isFlagged = true;
        document.getElementById(this.cellId).style.backgroundColor= "red";
    };
    this.unFlag = function (){
        this.isFlagged = false;
        document.getElementById(this.cellId).style.backgroundColor= "initial";
    }
}
function Bomb(i,j){
    this.cellId = i + "." + j;
    this.isFlagged = false;
    this.isBomb = true;
    this.flag = function(){//a changer pour mettre un drapeau au lieu de juste changer la couleur
        this.isFlagged = true;
        document.getElementById(this.cellId).style.backgroundColor= "red";
    };
    this.unFlag = function (){
        this.isFlagged = false;
        document.getElementById(this.cellId).style.backgroundColor= "initial";
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
function infoTableBuilder(){
    for(let j=0; j < LARG; j++) {
        tableInfo.push([]);
        for (let i = 0; i < LONG; i++) {
            tableInfo[j].push("");
        }
    }
    for(let i=0;i<LONG;++i){
        for(let j=0;j<LONG;++j){
            for(let k = 0; k<emplacement.length;++k){
                if(emplacement[k] === (i+","+j)){
                    console.log("bomb");
                    tableInfo[i][j] = new Bomb(i,j);
                    break;
                }else{
                    tableInfo[i][j] = new Cell(i,j);
                }
            }
        }
    }
}
function htmlTableBuilder(){
    /**
     * fonction qui cree l'html de la table
     */
    let container = document.getElementById("table");
    let completeTable = "<table>";
    let row="<tr>";
    let cell;
    for(let j=0; j < LARG; j++) {
        row="";
        for (let i = 0; i < LONG; i++) {
            cell = `<td id=${i+","+j} class="cell"><button id=${i+"."+j} class="gameButton" onclick="leftClicker(this.id)" oncontextmenu="rightClicker(this.id)"></button></td>`;
            row += cell;
        }
        row+="</tr>";
        completeTable+=row;
    }
    completeTable+="</table>";
    container.innerHTML=completeTable;
    return completeTable;
}
//tools
function verifyNum(i,j){
    let numBomb = 0;
    let coordinates = around(i,j);
    for(let i in coordinates){
        if(checkForBomb(coordinates[i].join(","))){numBomb++;}
    }
    return numBomb;
}
function reveal(id){
    if(!getCell(id).isBomb&&getCell(id).isEmpty){
        getCell(id).isRevealed =true;
        cleaner(id);
        document.getElementById(id).parentElement.style.display = "none";
    }else if(!getCell(id).isBomb){
        getCell(id).isRevealed =true;
        document.getElementById(id).innerHTML = getCell(id).numBomb;
    }else{
        handleBomb(id);
    }
}
function cleaner(id){
    let surroundingCoords = around(+id[0],+id[2]);
    let tempId;
    for(let i in surroundingCoords){
        tempId = surroundingCoords[i][0]+"."+surroundingCoords[i][1];
        if(!getCell(tempId).isRevealed) {
            if(getCell(tempId).isEmpty){
                document.getElementById(tempId).style.display = "none";
            }else{
                document.getElementById(tempId).innerHTML = getCell(tempId).numBomb;
            }
            getCell(id).isRevealed =true;
            if(getCell(tempId).isEmpty && !getCell(tempId).isRevealed){
                cleaner(tempId);
            }else{

            }
        }
    }
}
function getCell(id){
    return tableInfo[+id[0]][+id[2]];
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
//event handlers
function leftClicker(id){
    if(getCell(id).isFlagged){}
    else{
        reveal(id);
    }
}
function rightClicker(id){
    if(getCell(id).isFlagged){
        getCell(id).unFlag();
    }else if(!getCell(id).isRevealed){
        getCell(id).flag();
    }
}
 function handleBomb(id){
    if(getCell(id).isFlagged){}
    else{
        console.log("boom");
    }
 }

//program
function lancer() {
    bombPlacer();
    infoTableBuilder();
    htmlTableBuilder();

    // let buttons = document.getElementsByClassName("gameButton");
    // for(let i = 0; i<buttons.length;i++){
    //     buttons[i].addEventListener("mousedown",clicker())
    // }
}
