function clean() {
    document.getElementById("field").innerHTML = '';
}

function start() {
    document.getElementById("field").innerHTML = '';

    var n = document.getElementById("input").value;
    console.log(n);
    if (!isNaN(n)) 
    {
        if(n>=1) {
            var field = document.getElementById("field");
            field.style.cssText = `grid-template-rows: repeat(${n}, 100px); grid-template-columns: repeat(${n}, 100px);` 
            document.getElementById("error").textContent = " ";

            for (i = 0; i < n*n; i++) {
                var block = document.createElement("BUTTON");
                block.innerHTML = i + 1;
                block.style.cssText = "color: #ffb956; margin: 10px; background-color: white; outline: none; border: solid 2px #ffb956; border-radius: 6px;";
                document.getElementById("field").appendChild(block);
            }
        }
        else 
        {
            document.getElementById("error").style.color = "red";
            document.getElementById("error").textContent = "Number should be greater than 1.";
        }
    }
    else 
    {
        document.getElementById("error").textContent = "Input should be a number.";
    }
}