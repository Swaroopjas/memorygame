var root = document.getElementById('deck');

/*
 * Create a list that holds all of your cards
 */
var branches = document.querySelectorAll(".card");
var branchList = Array.prototype.slice.call(branches);
var move = 0;
var store = [];
var moveDivision = document.getElementById('move');
var starCounter = 3;
var time;
var timer;
var i = 0;
var starDivision = [...document.getElementsByClassName('fa-star')];
console.log("hellow");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
window.onload = inceptGame();

function inceptGame() {
  var manipulatedCards = shuffle(branchList);
  while (i < manipulatedCards.length) {
    root.appendChild(manipulatedCards[i]);
    i++;
  }
}
var i = 0;
while (i < branchList.length) {

  branchList[i].addEventListener("click", showCard);
  i++;
}

function showCard() {
  if (status == 0) {
    startTime();
    status = status + 1;
  }



  this.classList.add("card");
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disable");
  store.push(this);
  var match = document.getElementsByClassName('match');
  if (store.length == 2) {
    console.log(store[0].children[0].classList.item(1));
    move = move + 1;
    moveDivision.innerHTML = move;
    ratingStar();
    if (store[0].children[0].classList.item(1) == store[1].children[0].classList.item(1)) {
      console.log("success");
      store[0].classList.add("match", "disable");
      store[1].classList.add("match", "disable");
      console.log(starCounter);
      if (match.length == 16) {
        console.log(match.length);
        clearInterval(time);

        switch (starCounter) {
          case 1:
            Swal.fire({
              title: "congrats",
              html: 'Rating <i class="fa fa-star"></i> <br>moves :' + move + '<br>time taken<br>' + hour + 'hours :' + minute + "minutes :" + second + 'seconds',
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Reastart',
              showCancelButton: true,
              cancelButtonText: "cancel",
              cancelButtonColor: 'red',
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
            break;
          case 2:
            Swal.fire({
              title: "congrats",
              html: 'Rating <i class="fa fa-star"></i><i class="fa fa-star"></i> <br>moves :' + move + '<br>time taken<br>' + hour + 'hours :' + minute + "minutes :" + second + 'seconds',
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Reastart',
              showCancelButton: true,
              cancelButtonText: "cancel",
              cancelButtonColor: 'red',
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
            break;
          case 3:
            Swal.fire({
              title: "congrats",
              html: 'Rating <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <br>moves :' + move + '<br>time taken<br>' + hour + 'hours :' + minute + "minutes :" + second + 'seconds',
              showCancelButton: true,
              cancelButtonText: "cancel",
              cancelButtonColor: '#850000',
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
        }

      }
      store = [];
    } else {
      console.log(store[1]);
      store[0].classList.add("unmatch");
      store[1].classList.add("unmatch");
      store.map((son) => {
        setTimeout(() => {
          son.classList.remove("unmatch", "open", "show", "disable");
        }, 200);
      })
      store = [];
    }
  }
}

var second = 0;
var minute = 0;
var hour = 0;

function startTime() {
  time = setInterval(() => {
    second = second + 1;
    if (second == 59) {
      second = 0;
      minute = minute + 1;
    }
    if (minute == 60) {
      minute = 0;
      hour = hour + 1;
    }
    timer = document.getElementById('time');
    timer.innerHTML = second + ":: " + minute + " ::" + hour;
  }, 1000)
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function ratingStar() {
  if (move > 12 && move < 18) {
    starCounter = 2;
    starDivision[2].style.display = 'none';
  }
  if (move > 18) {
    starCounter = 1;
    starDivision[1].style.display = 'none';
  }
}
