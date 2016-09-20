$(document).ready(function() {changeQuote(); $("#quote-button").click(changeQuote); $("#twitter-button").click(function(){window.open("http://twitter.com/intent/tweet?text="+myQuote[0].split(" ").join("+") + "+-+" + myQuote[1].split(" ").join("+"),"_blank","menubar=no,toolbar=no,width=700,height=500");});})

var quotes = [
  ["Caltech admins getting desperate?","Facebook user, on seeing a sign that said \"BE SOCIAL\""],
  ["I've definitely had a dream with the explosions and horn noises in mlg videos.","Anonymous Techer"],
  ["Oh my god. That's not a sleep schedule. That's just naps.","Overheard while skyping someone at Caltech"],
  ["I'm not really sure if morning exists anymore.","Anonymous Techer"],
  ["If you know your child is going to die, then you should disown it before it dies because it&apos;s going to die anyways.","Anonymous Techer"],
  ["The most important thing is to maintain the patriarchy.","Random woman on cell phone"],
  ["Molality... not equal to molarity! YOU FUCKERS!","Aggressive individual during dress dinner"],
  ["Addition is commutative! My life is complete!","Excited math student"],
  ["Maybe taking multiple classes is like multithreading... you work on one class while you're waiting on I/O for another.","Observant Techer"],
  ["Yeah, I've been to Fleming. I threw up violently and left immediately.","Someone who obviously wasn't a fan of Fleming"],
  ["I will become no longer noodle at some point","A noodle"],
  ["You ask someone 'Did you take Ph1?' and if they say yes, you can talk about some physics blahblah. You ask someone 'Did you take IST4?' and...well, it wouldn't matter because you aren't really learning anything here.","Shuki Bruck, the IST4 Prof"],
  ["I got a leg cramp in my sleep... I might have kidney disease","Anonymous hypochondriac"]
];

var colors = ["#000000","#00AA00","#AA0000","#0000AA","#00AAAA","#AA00AA","#AAAA00"];

var lastRemoved;
var lastColor;
var myQuote = ["",""];


function getRandomQuote() {
  randomIndex = Math.floor(Math.random()*quotes.length);
  currQuote = quotes[randomIndex];
  quotes.splice(randomIndex,1);
  if (lastRemoved != undefined) {
    quotes.push(lastRemoved);
  }
  lastRemoved = currQuote;
  return currQuote;
}

function getRandomColor() {
  randomIndex = Math.floor(Math.random()*colors.length);
  currColor = colors[randomIndex];
  colors.splice(randomIndex,1);
  if (lastColor != undefined) {
    colors.push(lastColor);
  }
  lastColor = currColor;
  return lastColor;
}

function setColors() {
  newColor = getRandomColor();
  $("#twitter-button").animate({backgroundColor: newColor});
  $("#quote-button").animate({backgroundColor: newColor});
  $("body").animate({backgroundColor: newColor});
  $("#textarea").animate({color: newColor});
}

function changeQuote() {
  myQuote = getRandomQuote(quotes);
  $("#quote").html("<i class='fa fa-quote-left'></i> " + myQuote[0] + " <i class='fa fa-quote-right'></i>");
  $("#quote-author").html('-' + myQuote[1]);
  setColors();
  
}


