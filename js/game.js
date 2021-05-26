var InGame = false;
var secondClick = false;
var pressed = 0; //amount of pressed buttons (max 2)
var answCount = 0;
var chosenBox;
var time = 0; //in seconds
var clock;
var clockRunning = false;
var used = [];
//var mysql = require('myaql');
//var con = mysql.createConnection({
//    host: "Sample0Text.mysql.pythonanywhere-services.com",
//    user: "Sample0Text",
//    password: "xpASSw0rd",
//    database: "Sample0Text$comments"
//});
//console.log(con);

//var colors = ['red', 'oragne', 'yellow', 'green', 'blue', 'darkblue', 'purple',
//            'darkred', 'salmon', 'gold', 'tomato', 'orangered', 'khaki', 'wheat',
//            'seagreen', 'silver', 'azure', 'white', 'pink', 'indigo', 'magenta', 
//            'cyan', 'olive', 'lime', 'aquamarine', 'skyblue']; //Colors
//        var colorNames = ['Red', 'Oragne', 'Yellow', 'Green', 'Blue', 'Darkblue', 'Purple',
//            'Darkred', 'Salmon', 'Gold', 'Tomato', 'Orangered', 'Khaki', 'Wheat',
//            'Seagreen', 'Silver', 'Azure', 'White', 'Pink', 'Indigo', 'Magenta', 
//            'Cyan', 'Olive', 'Lime', 'Aquamarine', 'Skyblue']; //ColorNames



function clearScr() {
    document.getElementById("field").innerHTML = '';
    InGame = false;
    secondClick = false;
    clockRunning = false;
    used = [];
    answCount = 0;
    document.getElementById("result").textContent = "";
    time = 0;
    clearInterval(clock);
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("joke").textContent = "";
    document.getElementById("jokeImage").src = "";
    document.getElementById("jokeImage").width = "";
    document.getElementById("jokeImage").height = "";
    pressed = 0;
}

function start() {
//    console.log("before if: "+InGame);
    if (!InGame){
//        initialize
        InGame = true;
        used = [];
        document.getElementById("field").innerHTML = '';
        document.getElementById("result").textContent = "";
        document.getElementById("timer").textContent = "00:00";
        document.getElementById("joke").textContent = "";
        document.getElementById("jokeImage").src = "";
        document.getElementById("jokeImage").width = "";
        document.getElementById("jokeImage").height = "";
        
        answCount = 0;
        pressed = 0;
        time = 0;
        var n = document.getElementById("input").value;
        console.log(n);
        
//        arrays for pairs
        var colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Darkblue', 'Purple',
            'Darkred', 'Salmon', 'Gold', 'Tomato', 'Orangered', 'Khaki', 'Wheat',
            'Seagreen', 'Silver', 'Azure', 'White', 'Pink', 'Indigo', 'Magenta', 
            'Cyan', 'Olive', 'Lime', 'Aquamarine', 'Skyblue']; //Colors
        var usedCl = [];
        var gameGrid = [];
        var gameGridTypes = []; //false - color; true -name;
        
        for (i = 0; i < n*n; i = i+2){
            var r = Math.floor(Math.random() * (colors.length)); 
//            console.log("r = "+r);
//            console.log("in for "+colors[r]);
console.log(" first choise color" + colors[r]);
            while (usedCl.includes(colors[r])) {
                r = Math.floor(Math.random() * (colors.length));
                console.log(" another choise color" + colors[r]);
            }
            gameGrid.push(colors[r]);
            gameGrid.push(colors[r]);
            gameGridTypes.push(false);
            gameGridTypes.push(true);
            usedCl.push(colors[r]);
        }
//        console.log("random "+Math.floor(Math.random() * (5)));

        for (i = 0; i < n*n; i++){
                var r=Math.floor(Math.random() * gameGrid.length);
                var tmp = gameGrid[r];
                var tmpT = gameGridTypes[r];
                gameGrid[r]=gameGrid[i];
                gameGridTypes[r]=gameGridTypes[i];
                gameGrid[i]=tmp;
                gameGridTypes[i]=tmpT;

        }
        
        console.log("gameGrid: " + gameGrid);
        console.log("gameGridTypes: " + gameGridTypes);
        
        if (!isNaN(n)) 
        {
            if(n==2 || n==4 || n==6) {
//                clock = setInterval(timeUpdate, 1000);
                toggleStart(false);
                var field = document.getElementById("field");
                field.style.cssText = `grid-template-rows: repeat(${n}, 100px); grid-template-columns: repeat(${n}, 100px);` 
                document.getElementById("error").textContent = " ";

                for (i = 0; i < n*n; i++) {
                    var block = document.createElement("BUTTON");
                    block.onclick = blockClicked;
                    block.id = i;
                    block.style.cssText = "color: #ffb956; margin: 5px; background-color: black; \n\
                        outline: none; border: solid 2px #ffb956; border-radius: 6px;";
                    block.textContent = "";
                    document.getElementById("field").appendChild(block);
                }
            }
            else 
            {
//                document.getElementById("error").style.color = "red";
                document.getElementById("error").textContent = "Number is not from range (2/4/6)";
                InGame = false;
            }
        }
        else 
        {
            document.getElementById("error").textContent = "Input should be a number.";
            InGame = false;
        }
    }
    
    function toggleStart(key) {//true - enable; false - disable
        if (key){
//            document.getElementById("startB").className = "disButton";
//            document.getElementById("startB").style.background = "#89ff5e";
//            document.getElementById("startB").style.cursor = "pointer";
            document.getElementById("startB").disabled = false;
        } else {
//            document.getElementById("startB").className = "myButton";
//            document.getElementById("startB").style.background = "#89ff5e";
//            document.getElementById("startB").style.cursor = "default";
            document.getElementById("startB").disabled = true;
        }
    }
        
    function blockClicked() {
        console.log("-------------------------");
        console.log("CLICKED");
        
        if (pressed > 0){
            if (this.id !== chosenBox.id)
                pressed++;
        } else {
            pressed++;
        }
        
        console.log("pressed: " + pressed);
        console.log("used: " + used);
        console.log("used.includes(this.id): "+ used.includes(this.id));
        
        if (used.includes(this.id)){
            console.log("wrong button");
            pressed--;
            console.log("pressed: " + pressed);
        }
        
        if (!clockRunning){
            clock = setInterval(timeUpdate, 1000);
            clockRunning = true;
        }
        
        if (pressed < 3){
//            console.log("-----------------------------------------------//n clicked");
            var currentBox = document.getElementById(this.id);
//            console.log("id: "+currentBox.id);
//            console.log("currentBox.style.backgroundColor === 'black': "+(currentBox.style.backgroundColor === "black"));
//            console.log("currentBox.textContent === '': "+ (currentBox.textContent == ""));

            if (currentBox.style.backgroundColor == "black" && currentBox.textContent == ""){
//            console.log("it is black");
                if (gameGridTypes[this.id]) {
                    console.log("it is name");
                    currentBox.textContent = gameGrid[this.id];
                    currentBox.style.textAlign = "center";
                    currentBox.style.color = "black";
                    currentBox.style.fontSize = "small";
                    currentBox.style.backgroundColor = "LightGrey";
                } else {
//                    console.log("is it color");
                    currentBox.style.backgroundColor = gameGrid[this.id];
                }

                if (pressed === 2){ //if there was a first click
//                    console.log("second click");
                    if (gameGrid[chosenBox.id] == gameGrid[currentBox.id]){
//                        console.log("eaqual");
                        answCount++;
                        used.push(chosenBox.id);
                        used.push(currentBox.id);
                        pressed = 0;
                    } else {
//                        console.log("not eq");
//                            setTimeout(hideBoxes(currentBox),1000);
                            
                        setTimeout(
                            function(){
//                                console.log("hiding...");
                                chosenBox.style.backgroundColor = "black";
                                chosenBox.textContent = "";
                                currentBox.style.backgroundColor = "black";
                                currentBox.textContent = "";
                                pressed = 0;
//                                console.log("end hiding");
                            },1000);
                    }
                } else {
                    console.log("first click");
                    chosenBox = this;
                }
            }
            
//            check for end
            if (answCount == n*n/2){
                fetchJoke();
                document.getElementById("result").textContent = "You won. Your time:";
                InGame = false;
                toggleStart(true);
                clearInterval(clock);
                clockRunning = false;
            }
            
            canClick = true;
        }
    }
    
//    function hideBoxes(currentB){
//        console.log("hiding...");
//        chosenBox.style.backgroundColor = "black";
//        chosenBox.textContext = "";
//        currentB.style.backgroundColor = "black";
//        currentB.textContext = "";
//    }
    
//    time
    function timeUpdate(){
//        console.log("tick");
        time++;
        var res;
        
        if (Math.floor(time/60) < 10){
            res = "0" + Math.floor(time/60) + ":";
        } else {
            res = "" + Math.floor(time/60) + ":";
        }
        if (time % 60 < 10){
            res = res + "0" + (time % 60);
        } else {
            res = res + "" + (time % 60);
        }
        document.getElementById("timer").textContent = res;
    }
    
    function fetchJoke(){
//        console.log("before fetch");
        var data;
        fetch ('https://api.chucknorris.io/jokes/random', {method: 'GET'})
            .then(res => res.json())
//            .then(console.log)
//            .then(data => document.getElementById("joke").textContent = data.value)
//            .then(data => document.getElementById("jokeImage").src = data.icon_url)
            .then(function(data){
//                console.log("in func");
                document.getElementById("joke").textContent = data.value;
                document.getElementById("jokeImage").src = data.icon_url;
                document.getElementById("jokeImage").width = 100;
                document.getElementById("jokeImage").height = 100;
            })
        }
}