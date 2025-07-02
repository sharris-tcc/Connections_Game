 function getRandomIntArray(length, min, max) {
 return Array.from({
         length
     }, () =>
     Math.floor(Math.random() * 10000) % max
 );
}

function getRandomIntArray(min,max) {
  if (max - min + 1 < 4) {
    throw new Error("Range must include at least 4 distinct numbers.");
  }

  const result = new Set();

  while (result.size < 4) {
    const num = Math.floor(Math.random() * 10000) % max;
    result.add(num);
  }
  console.log("Numbers: ");
  result.forEach(function(number) {
        console.log(number); // Prints each number
  });

  return [...result];
}

function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n--; // Optimization: after each pass, the largest element is at the end
    } while (swapped);
    return arr;
}

function shuffleBoard(table){
         var r1, c1, r2, c2, count = 0;
         var max = 5;
         var min = 0;
         while (count < 500) {
             r1 = Math.floor(Math.random() * 10) % 4;
             c1 = Math.floor(Math.random() * 10) % 4;
             r2 = Math.floor(Math.random() * 10) % 4;
             c2 = Math.floor(Math.random() * 10) % 4;

             var selectedCell = table.getElementById('rc' + r1 + c1);
             var selectedCell2 = table.getElementById('rc' + r2 + c2);

             var temp = selectedCell.innerText;
             selectedCell.innerText = selectedCell2.innerText;
             selectedCell2.innerText = temp;
             count++;
        }
}

 function checkSubmission(document,table,groups,words,colors) {
    let selections = [];
    var count = 0;
    var attempts = document.getElementById("attempts");
    if(parseInt(attempts.innerText) > 0){
        if(checkSelectionCount(table) == 4){
          for (let r = 0; r < table.rows.length; r++) {
             if(count == 4){
                break;
             }
            for (let c = 0; c < table.rows[r].cells.length; c++) {
               if(table.rows[r].cells[c].style.backgroundColor == "black"){
                    selections.push(table.rows[r].cells[c].innerText);
                    count++
                    if(count == 4){
                        break;
                   }
                }
             }
           }
           var set1 = bubbleSort(selections);
           var color = 0;
           count = 0;
           for(let i = 0; i < words.length; i++){
                 if(count == 4){
                   break;
                 }
                var set2 = bubbleSort(words[i]);
                var count = 0;
                for(var j = 0; j < set2.length; j++){
                    if(set1[j] == set2[j]){
                        count++;
                    }
                    else{
                       color++;
                       break;
                    }
                }
            }
            if(count == 4){
                count = 0;
                for (r = 0; r < table.rows.length; r++) {
                    if(count == 4){
                        break;
                    }
                    for (c = 0; c < table.rows[r].cells.length; c++) {
                        if(table.rows[r].cells[c].style.backgroundColor == "black"){
                            var cell = document.getElementById("rc" + r + c);
                            cell.style.backgroundColor = colors[color];
                            cell.style.color = "black";
                            count++
                            if(count == 4){
                                break;
                           }
                        }
                    }
                }
                var correctGroup = document.getElementById("group" + color);
                correctGroup.innerText += "Group " + (color + 1) + ": " + groups[color];
                correctGroup.style.display = "inline";
                correctGroup.style.backgroundColor = colors[color];

                var setsSolved = document.getElementById("setsSolved");
                setsSolved.innerText = (parseInt(setsSolved.innerText) + 1);
                if(setsSolved == "4"){
                    console.log("You Won!")
                }
            }
            else{
                attempts.innerText = (parseInt(attempts.innerText) - 1);
                if(attempts == "0"){
                    console.log("You Lost...")
                }
            }
        }
    }
}

 function checkSelectionCount(table){
    var count = 0;
    for (let r = 0; r < table.rows.length; r++) {
      for (let c = 0; c < table.rows[r].cells.length; c++) {
            if(table.rows[r].cells[c].style.backgroundColor == "black"){
                count++;
            }
      }
    }
    return count;
 }

 function resetBoard(table,groups,words){
    fetch('data.json')
     .then(response => {
         if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json(); // Parses the JSON response
     })
     .then(data => { // Use your JSON data here
         if (table) {
             var attempts = document.getElementById("attempts");
             attempts.innerText = 3;
             attempts.style.display = "inline";

             var setsSolved = document.getElementById("setsSolved");
             setsSolved.innerText = 0;

             var attemptsText = document.getElementById("attemptsText");
             attemptsText.style.display = "inline";

             for(var i = 0; i < 4; i++){
                var group = document.getElementById("group" + i);
                group.style.display = "none";
             }

             var colors = ["#33ff36","#f6ff33","#ffbe33","#33ceff"];
             var sets = getRandomIntArray(0, 200);
             var currentSet = -1;
             var currentItem = 0;
             groups = [];
             words = [];
             for (let i = 0; i < table.rows.length; i++) {
                 currentSet++;
                 currentItem = 0;
                 var set = [];
                 groups.push(data[sets[currentSet]].group);
                 for (let j = 0; j < table.rows[i].cells.length; j++) {
                     table.rows[i].cells[j].innerText = data[sets[currentSet]].items[currentItem];
                     var initCell = document.getElementById('rc' + i + j);
                     initCell.style.backgroundColor = "white";
                     initCell.style.color = "black";
                     set.push(data[sets[currentSet]].items[currentItem]);
                     currentItem++;
                     table.rows[i].cells[j].onclick = function() {
                         var cell = document.getElementById('rc' + i + j);
                         if((cell.style.backgroundColor == "white" || cell.style.backgroundColor == "")
                         && checkSelectionCount(table) < 4){
                            cell.style.backgroundColor = "black";
                            cell.style.color = "white";
                         }
                         else if(cell.style.backgroundColor == "black"){
                            cell.style.backgroundColor = "white";
                            cell.style.color = "black";
                         }
                     };
                 }
                 words.push(set);
             }
             shuffleBoard(document);
         }
          resetBtn.onclick = function() {
                          resetBoard(table,groups,words);
                     };

          submitBtn.onclick = function() {
                          checkSubmission(document,table,groups,words,colors);
                     };
     })
     .catch(error => {
         console.error('Error fetching or parsing JSON:', error);
     });
 }