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
        // Use your JSON data here

         if (table) {
             const jsonString = getJsonData();
             const data = JSON.parse(jsonString);
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
                          groups = [];
                          words = [];
                          resetBoard(table,groups,words);
                     };

          submitBtn.onclick = function() {
                          checkSubmission(document,table,groups,words,colors);
                     };
 }

 function getJsonData(){
    return '[{"group":"Friends Characters","items":["Ross","Rachel","Monica","Chandler"]},{"group":"Pixar Movies","items":["Toy Story","Cars","Up","Coco"]},{"group":"Marvel Superheroes","items":["Iron Man","Thor","Hulk","Spider-Man"]},{"group":"Disney Princesses","items":["Ariel","Belle","Moana","Cinderella"]},{"group":"Sitcoms","items":["Seinfeld","Friends","The Office","Cheers"]},{"group":"Famous Duos","items":["Batman","Robin","Bonnie","Clyde"]},{"group":"Detectives","items":["Sherlock","Poirot","Batman","Nancy Drew"]},{"group":"Classic Cartoons","items":["Tom","Jerry","Daffy Duck","Bugs Bunny"]},{"group":"TV Hosts","items":["Oprah","Fallon","Kimmel","Ellen"]},{"group":"Board Games","items":["Monopoly","Risk","Clue","Scrabble"]},{"group":"Video Game Consoles","items":["PlayStation","Xbox","Switch","Wii"]},{"group":"Harry Potter Characters","items":["Hermione","Ron","Hagrid","Dumbledore"]},{"group":"Reality Shows","items":["Survivor","Idol","Big Brother","Amazing Race"]},{"group":"Disney Villains","items":["Scar","Jafar","Ursula","Maleficent"]},{"group":"Comedians","items":["Chapelle","Rock","Hart","Pryor"]},{"group":"Oscar-winning Films","items":["Gladiator","Titanic","Argo","Green Book"]},{"group":"Late-Night Hosts","items":["Conan","Colbert","Leno","Meyers"]},{"group":"Continents","items":["Asia","Europe","Africa","Australia"]},{"group":"US State Capitals","items":["Albany","Austin","Sacramento","Denver"]},{"group":"European Cities","items":["Paris","Rome","Berlin","Madrid"]},{"group":"Islands","items":["Hawaii","Bali","Madagascar","Iceland"]},{"group":"Mountains","items":["Everest","Denali","Kilimanjaro","Fuji"]},{"group":"Deserts","items":["Sahara","Gobi","Mojave","Kalahari"]},{"group":"Oceans","items":["Atlantic","Pacific","Indian","Arctic"]},{"group":"Cities in California","items":["Fresno","Oakland","San Diego","San Jose"]},{"group":"Rivers","items":["Nile","Amazon","Yangtze","Mississippi"]},{"group":"Great Lakes","items":["Superior","Michigan","Huron","Erie"]},{"group":"US National Parks","items":["Yellowstone","Yosemite","Zion","Acadia"]},{"group":"Things Found at an Airport","items":["Gate","Terminal","Passport","Luggage"]},{"group":"Flags with Red & White","items":["Japan","Canada","Switzerland","Denmark"]},{"group":"Scandinavian Countries","items":["Sweden","Norway","Denmark","Finland"]},{"group":"British Cities","items":["London","Manchester","Liverpool","Birmingham"]},{"group":"Mexican States","items":["Jalisco","Yucatán","Oaxaca","Sonora"]},{"group":"Countries with Coastlines","items":["Brazil","Australia","Greece","Vietnam"]},{"group":"Bones","items":["Femur","Skull","Ribs","Tibia"]},{"group":"Types of Clouds","items":["Cirrus","Cumulus","Stratus","Nimbus"]},{"group":"Birds of Prey","items":["Eagle","Hawk","Owl","Falcon"]},{"group":"Big Cats","items":["Lion","Tiger","Leopard","Jaguar"]},{"group":"Trees","items":["Oak","Maple","Pine","Birch"]},{"group":"Vegetables","items":["Carrot","Spinach","Tomato","Broccoli"]},{"group":"Chemical States","items":["Solid","Liquid","Gas","Plasma"]},{"group":"Famous Scientists","items":["Newton","Einstein","Curie","Darwin"]},{"group":"Types of Rock","items":["Igneous","Sedimentary","Metamorphic","Obsidian"]},{"group":"Extinct Animals","items":["Dodo","Mammoth","Saber-tooth","Tasmanian Tiger"]},{"group":"Diseases","items":["Malaria","Cholera","Smallpox","Influenza"]},{"group":"Space Terms","items":["Asteroid","Comet","Satellite","Meteor"]},{"group":"Rhyming items","items":["Cat","Hat","Bat","Mat"]},{"group":"Palindromes","items":["Racecar","Civic","Level","Rotor"]},{"group":"items Ending in -ing","items":["Running","Eating","Singing","Jumping"]},{"group":"Story Elements","items":["Plot","Setting","Character","Theme"]},{"group":"Poetic Forms","items":["Sonnet","Haiku","Limerick","Ode"]},{"group":"Grammatical Terms","items":["Noun","Verb","Adjective","Adverb"]},{"group":"Punctuation Marks","items":["Comma","Period","Colon","Semicolon"]},{"group":"Parts of Speech","items":["Pronoun","Preposition","Conjunction","Interjection"]},{"group":"Books of the Bible","items":["Genesis","Exodus","Leviticus","Numbers"]},{"group":"Fairy Tale Characters","items":["Cinderella","Rapunzel","Pinocchio","Snow White"]},{"group":"Fantasy Creatures","items":["Dragon","Unicorn","Griffin","Phoenix"]},{"group":"Book Genres","items":["Mystery","Fantasy","Sci-fi","Romance"]},{"group":"Classic Novels","items":["1984","Dracula","Moby-Dick","Jane Eyre"]},{"group":"Famous Poets","items":["Frost","Angelou","Whitman","Dickinson"]},{"group":"Syllables in ‘Animal’ items","items":["Elephant","Giraffe","Tiger","Panda"]},{"group":"items for Small Amounts","items":["Bit","Drop","Grain","Pinch"]},{"group":"Synonyms for Fast","items":["Quick","Rapid","Speedy","Swift"]},{"group":"Fake Synonyms","items":["Bogus","Sham","Phony","Pseudo"]},{"group":"Homophones","items":["Pair","Pear","Bare","Bear"]},{"group":"Items Containing ‘ight’","items":["Light","Night","Fight","Sight"]},{"group":"Pizza Toppings","items":["Mushrooms","Pepperoni","Onions","Sausage"]},{"group":"Candy Bars","items":["Snickers","Twix","Milky Way","KitKat"]},{"group":"Household Items","items":["Table","Couch","Lamp","Chair"]},{"group":"Transportation","items":["Car","Train","Plane","Boat"]},{"group":"Tools","items":["Hammer","Screwdriver","Wrench","Pliers"]},{"group":"Smart Devices","items":["Alexa","Nest","Google Home","Ring"]},{"group":"Sports","items":["Soccer","Tennis","Hockey","Basketball"]},{"group":"Programming Languages","items":["Python","Java","Ruby","C++"]},{"group":"Holiday Traditions","items":["Gifts","Fireworks","Feasting","Costumes"]},{"group":"Types of Pasta","items":["Penne","Fusilli","Spaghetti","Linguine"]},{"group":"Famous Painters","items":["Picasso","Van Gogh","Monet","Rembrandt"]},{"group":"Ocean Animals","items":["Dolphin","Octopus","Shark","Whale"]},{"group":"Harry Potter Houses","items":["Gryffindor","Slytherin","Hufflepuff","Ravenclaw"]},{"group":"Card Suits","items":["Spades","Hearts","Clubs","Diamonds"]},{"group":"Brands of Soda","items":["Pepsi","Coke","Sprite","Fanta"]},{"group":"Winter Olympics Sports","items":["Curling","Luge","Skiing","Bobsled"]},{"group":"Shakespeare Plays","items":["Hamlet","Macbeth","Othello","King Lear"]},{"group":"Dog Breeds","items":["Beagle","Poodle","Husky","Boxer"]},{"group":"Fast Food Chains","items":["McDonald’s","Wendy’s","Burger King","Chick-fil-A"]},{"group":"Board Games","items":["Monopoly","Clue","Scrabble","Risk"]},{"group":"Musical Instruments","items":["Violin","Trumpet","Piano","Drums"]},{"group":"Types of Trees","items":["Oak","Maple","Pine","Birch"]},{"group":"Elements on Periodic Table","items":["Oxygen","Hydrogen","Iron","Gold"]},{"group":"Computer Brands","items":["Dell","HP","Lenovo","Asus"]},{"group":"Star Wars Characters","items":["Yoda","Leia","Han","Vader"]},{"group":"Greek Gods","items":["Zeus","Poseidon","Hades","Apollo"]},{"group":"Famous Landmarks","items":["Eiffel Tower","Big Ben","Statue of Liberty","Colosseum"]},{"group":"Things That Fly","items":["Helicopter","Bird","Airplane","Drone"]},{"group":"Types of Dance","items":["Ballet","Salsa","Hip-hop","Tango"]},{"group":"Social Media Apps","items":["Instagram","TikTok","Facebook","Snapchat"]},{"group":"Common Surnames","items":["Smith","Johnson","Brown","Garcia"]},{"group":"Types of Cheese","items":["Cheddar","Brie","Gouda","Mozzarella"]},{"group":"Poker Hands","items":["Full House","Flush","Straight","Four of a Kind"]},{"group":"Types of Fabric","items":["Cotton","Linen","Silk","Wool"]},{"group":"NFL Teams","items":["Eagles","Patriots","Bears","Chiefs"]},{"group":"Types of Knots","items":["Bowline","Square","Clove Hitch","Figure Eight"]},{"group":"Dinosaurs","items":["T-Rex","Velociraptor","Triceratops","Stegosaurus"]},{"group":"Famous Singers","items":["Beyoncé","Adele","Drake","Ed Sheeran"]},{"group":"Types of Pie","items":["Apple","Pumpkin","Pecan","Cherry"]},{"group":"Types of Weather","items":["Rain","Snow","Wind","Hail"]},{"group":"Types of Shoes","items":["Sneaker","Boot","Sandal","Loafer"]},{"group":"Countries in Europe","items":["France","Germany","Spain","Italy"]},{"group":"Things in a Toolbox","items":["Hammer","Wrench","Screwdriver","Pliers"]},{"group":"US Coins","items":["Penny","Nickel","Dime","Quarter"]},{"group":"Famous Duos","items":["Batman","Robin","Bonnie","Clyde"]},{"group":"Types of Cookies","items":["Chocolate Chip","Oatmeal","Snickerdoodle","Sugar"]},{"group":"Things You Plug In","items":["Phone","Toaster","Laptop","Lamp"]},{"group":"Insects","items":["Ant","Bee","Fly","Mosquito"]},{"group":"Types of Houses","items":["Bungalow","Ranch","Colonial","Victorian"]},{"group":"Disney Movies","items":["Aladdin","Frozen","Moana","Mulan"]},{"group":"Body Parts","items":["Heart","Brain","Liver","Lung"]},{"group":"Olympic Cities","items":["Tokyo","Beijing","Rio","Athens"]},{"group":"Girl Scout Cookies","items":["Thin Mints","Tagalongs","Trefoils","Samoas"]},{"group":"Units of Measurement","items":["Inch","Pound","Liter","Degree"]},{"group":"Hidden Units of Measurement","items":["Stone","Knot","Dram","League"]},{"group":"Zodiac Signs","items":["Aries","Leo","Taurus","Gemini"]},{"group":"Batman Villains","items":["Joker","Penguin","Riddler","Two-Face"]},{"group":"Things Found at the Beach","items":["Sand","Shells","Waves","Towel"]},{"group":"Fruits with Seeds","items":["Apple","Orange","Watermelon","Kiwi"]},{"group":"Famous Authors","items":["Rowling","Tolkien","Orwell","Austen"]},{"group":"Card Games","items":["Poker","Go Fish","Uno","Blackjack"]},{"group":"Shades of Black","items":["Jet","Onyx","Charcoal","Ebony"]},{"group":"Precious Stones","items":["Ruby","Emerald","Sapphire","Diamond"]},{"group":"Male First Names","items":["John","Michael","David","James"]},{"group":"Female First Names","items":["Emily","Sarah","Jessica","Amanda"]},{"group":"Words That Can Follow Fire","items":["Place","Wall","Drill","Ant"]},{"group":"Names and Nouns","items":["Hope","Faith","Pat","Will"]},{"group":"Holidays","items":["Christmas","Thanksgiving","Halloween","Easter"]},{"group":"Types of Fish","items":["Salmon","Trout","Tuna","Bass"]},{"group":"Countries in Asia","items":["Japan","China","India","Thailand"]},{"group":"Fictional Countries","items":["Wakanda","Genovia","Latveria","Narnia"]},{"group":"Classical Composers","items":["Mozart","Bach","Beethoven","Chopin"]},{"group":"Fictional Robots","items":["R2-D2","WALL-E","C-3PO","Data"]},{"group":"Common Programming Paradigms","items":["Functional","Object-Oriented","Procedural","Declarative"]},{"group":"Programming Data Types","items":["Integer","Boolean","String","Float"]},{"group":"Frontend Technologies","items":["HTML","CSS","JavaScript","React"]},{"group":"Common Programming Errors","items":["Syntax","Runtime","Logic","Compilation"]},{"group":"Sorting Algorithms","items":["Bubble","Merge","Quick","Insertion"]},{"group":"Items That Rhyme","items":["Cat","Hat","Mat","Bat"]},{"group":"Things That Melt","items":["Ice","Wax","Chocolate","Butter"]},{"group":"Things With Wheels","items":["Bike","Skateboard","Scooter","Car"]},{"group":"Things You Wear","items":["Shirt","Pants","Hat","Shoes"]},{"group":"Famous Duets (Singers)","items":["Sonny","Cher","Simon","Garfunkel"]},{"group":"Gemstones","items":["Topaz","Amethyst","Opal","Quartz"]},{"group":"Loop Keywords","items":["Break","Continue","While","For"]},{"group":"Common IDEs","items":["VSCode","PyCharm","Eclipse","NetBeans"]},{"group":"Python Built-in Functions","items":["Print","Len","Range","Input"]},{"group":"Programming Languages Named After People","items":["Ada","Pascal","Julia","Ruby"]},{"group":"Common ML Algorithms","items":["KNN","SVM","Decision Tree","Random Forest"]},{"group":"Popular ML Libraries","items":["TensorFlow","PyTorch","Scikit-learn","XGBoost"]},{"group":"Sea Creatures","items":["Crab","Lobster","Jellyfish","Seahorse"]},{"group":"Units of Time","items":["Second","Minute","Hour","Day"]},{"group":"Planets","items":["Mars","Venus","Earth","Jupiter"]},{"group":"Things You Read","items":["Book","Magazine","Newspaper","Blog"]},{"group":"Zoo Animals","items":["Giraffe","Elephant","Zebra","Lion"]},{"group":"Ice Cream Flavors","items":["Vanilla","Chocolate","Strawberry","Mint"]},{"group":"Things That Float","items":["Boat","Balloon","Duck","Iceberg"]},{"group":"Car Brands","items":["Toyota","Ford","Honda","BMW"]},{"group":"Jobs","items":["Teacher","Doctor","Lawyer","Engineer"]},{"group":"Musical Genres","items":["Jazz","Rock","Hip-Hop","Country"]},{"group":"Musical Notes (4-letter)","items":["Do","Re","Mi","Sol"]},{"group":"Crazy Synonyms (Slang)","items":["Bonkers","Loopy","Nuts","Barmy"]},{"group":"Items That Mean None","items":["Nil","Naught","Zip","Zilch"]},{"group":"Things You Can Strike","items":["Match","Deal","Pose","Chord"]},{"group":"Hidden Fabrics","items":["Jean","Terry","Velvet","Cord"]},{"group":"Ends With Types of Trees","items":["Palm","Maple","Oak","Cedar"]},{"group":"Words You Can Prefix with Sun","items":["Rise","Set","Burn","Bath"]},{"group":"Words Containing xyz","items":["Oxyzo","Hydroxyzine","Oxazepam","Xyzyx"]},{"group":"Sounds Like Letters","items":["Sea","Tea","Eye","Queue"]},{"group":"Common Internet Slang","items":["LOL","BRB","IMO","IDK"]},{"group":"Animal Sounds","items":["Neigh","Moo","Oink","Baa"]},{"group":"Follows Spring","items":["Break","Roll","Board","Loaded"]},{"group":"Slang for Money","items":["Bread","Bucks","Dough","Moolah"]},{"group":"Ends in -ough (Different Pronunciation)","items":["Cough","Though","Rough","Through"]},{"group":"Chess Pieces","items":["Bishop","Knight","Rook","Pawn"]},{"group":"Mythological Creatures","items":["Phoenix","Centaur","Minotaur","Chimera"]},{"group":"Pirate Themes","items":["Booty","Plank","Rum","Hook"]},{"group":"Precede Light","items":["Day","Sun","Flash","Strobe"]},{"group":"Types of Cuts (Haircuts)","items":["Bob","Fade","Crop","Undercut"]},{"group":"Football Clubs (Europe)","items":["Ajax","Dynamo","Zenit","Benfica"]},{"group":"Essential Oils","items":["Bergamot","Ylang-Ylang","Vetiver","Neroli"]},{"group":"Minor Acting Roles","items":["Cameo","Bit","Walk-On","Extra"]},{"group":"Digging Tools","items":["Spoon","Trowel","Scoop","Shovel"]},{"group":"Rock Bands","items":["Pink","Floyd","Queen","Genesis"]},{"group":"Presidents and Currency","items":["Lincoln","Washington","Jefferson","Jackson"]},{"group":"Water Sources","items":["Spring","Mercury","Tap","Well"]},{"group":"Famous Mathematicians","items":["Euler","Gauss","Riemann","Fermat"]},{"group":"European Car Brands","items":["Saab","Skoda","SEAT","Opel"]},{"group":"Marx Brothers","items":["Groucho","Harpo","Chico","Zeppo"]},{"group":"Silent Letter Endings","items":["Plumber","Ballet","Gourmet","Debris"]},{"group":"Anagrams","items":["Stop","Pots","Tops","Spot"]},{"group":"Shakespearean Insults","items":["Knave","Codpiece","Strumpet","Harlot"]},{"group":"Words with Silent K","items":["Knee","Knife","Knob","Knight"]},{"group":"Associated with Silence","items":["Mute","Still","Hush","Quiet"]}]'
 }
