const LONG=10
const LARG=10
const BOMB=LARG*LONG/10
let tableInfo=[];
function constructeurTabl(){
    for(let j=0; j < LARG; j++) {
        tableInfo.push([]);
        for (let i = 0; i < LONG; i++) {
            tableInfo[j].push("");
        }
    }
}
let emplacement=[]
function placement() {
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
function bombPlacer(emplacement){
    //cree tqblequ a partir d'emplacement

}

function tableBuilder(){
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
            cell = `<td id=${i+","+j} class="cell"><button class="gameButton"></button></td>`;
            row += cell;
        }
        row+="</tr>";
        completeTable+=row;
    }
    completeTable+="</table>";
    container.innerHTML=completeTable;
    return completeTable;
}
function numBomb() {
    for(let i=0;i<LONG;++i){
        for(let j=0;j<LONG;++j){
            for(let k = 0; k<emplacement.length;++k){
                if(emplacement[k] === (i+","+j)){
                    console.log("bomb");
                    tableInfo[i][j] = "<img class=\"bomb\"src=\"img/bomb.png\">";
                    break;
                }else{
                    tableInfo[i][j] = verifyNum(i,j);
                }
                //console.log(emplacement[k],"\n",i,j)
                /*if(emplacement[k]!==(i+","+j)){
                    tableInfo[i][j]=verifyNum(i,j);
                }else{
                    tableInfo[i][j]="BOMB";
                }*/
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
function verifyNum(i,j){
    let numBomb = 0;
    if(checkForBomb((i-1)+","+(j-1))){
        numBomb++;
    }
    if(checkForBomb((i-1)+","+(j))){
        numBomb++;
    }
    if(checkForBomb((i)+","+(j-1))){
        numBomb++;
    }
    if(checkForBomb((i-1)+","+(j+1))){
        numBomb++;
    }
    if(checkForBomb((i+1)+","+(j-1))){
        numBomb++;
    }
    if(checkForBomb((i)+","+(j+1))){
        numBomb++;
    }
    if(checkForBomb((i+1)+","+(j+1))){
        numBomb++;
    }
    if(checkForBomb((i+1)+","+(j))){
        numBomb++;
    }
    return numBomb;
}
function lancer() {
    placement();
    constructeurTabl();
    numBomb();
    tableBuilder();

    let buttons = document.getElementsByClassName("gameButton");
    function testFunction(){
        var attribute = this.getAttribute("data-myattribute");
        console.log(attribute);
    }
    for(let i = 0; i<buttons.length;i++){
        buttons[i].addEventListener('click', testFunction);
    }
}