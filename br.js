var e = document.getElementById('hunt');
e.onclick = updateData;

var gg = document.getElementById('encounters');
var dedcounter = 0;
var dedarray=[];

var ggh = document.getElementById('inGame');
var ingame=0;

var Ele1 = document.getElementById('firstbutton');
var alive = 50;
ingame = alive;
Ele1.onclick = NewAlive;

var Ele2 = document.getElementById('secondbutton');
var distance = 20;
Ele2.onclick = NewDist;

function NewDist (){
console.log(document.getElementById("distance").value);
if (document.getElementById("distance").value) {
distance = document.getElementById("distance").value;
}
else{
distance = 20;
}
}


var names = ['TheLegend','Alation','Saltation','LordBrit','Treccio','Trechew','Sabbax','Lirik','Peakzorr','Zeta','RaidandFade','Globi','Rydgel','O____o','Fix_','nonsub','Bob','TILT','BobRoss','Kappa','Kappaccino','Loser','PlayerUnknown','DrDisrespect','Shortyyguy','ElPollo','MasGrande'];
var adj = ['BestIta','Fake','Fat','Clumsy','Winner','Loser','Sealion','Slow','Stinky','xXx420','AbsoluteBeastGamer','NoMonitor','Lovely','Thin','original','MasGrande','ElPollo'];

var svg = d3.select("#br svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

svg.on('click', function() {
        var coords = d3.mouse(this);
        console.log(coords);
        drawCircle(coords[0], coords[1], 5);
    });

var random = Math.random,
    players = d3.range(alive).map(function() { return [random() * (width-100), random() * (height-100) , 1, adj[Math.floor((Math.random()*adj.length))] + names[Math.floor((Math.random()*names.length))], 0 ]; }),
    goal = d3.range(1).map(function() { return [random() * width, random() * height]; });

function drawCircle(x,y,r){
        console.log('Drawing circle at', x, y);
        testo = adj[Math.floor((Math.random()*adj.length))] + names[Math.floor((Math.random()*names.length))];
        svg.append("g").append("circle")
            .attr('class', 'point')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", "5");

        svg.append("g").append("text")
            .attr("dx", x)
            .attr("dy", y)
            .style('color','Black')
            .text(testo);
        ingame = ingame+1;    
        players.push([x,y,1, testo, 0]);
        ggh.innerHTML="In game: <p>" + ingame + "</p>";
        console.log('debug ingame' + ingame); 
    }

    


svg.selectAll(".point")
  .data(players)
  .enter()
     .append("g")
    .append("circle")
    .attr("class", "point")
    .attr("cx", function(d) { return d[0]; })
    .attr("cy", function(d) { return d[1]; })
    .attr("r", 5);

svg.selectAll("g")
  .data(players)
  .append("text")
  .attr("dx", function(d){return d[0]+1;})
  .attr("dy", function(d){return d[1]+1;})
    .style('color','white')
    .text(function(d) { return d[3]; });


var counter = 0;

function updateData(){
  var ded =0;
  for (i = 0; i < players.length;i++){
    for (j = i+1; j < players.length; j++){
      if ( Math.pow(Math.pow(players[i][0] - players[j][0],2) + Math.pow(players[i][1] - players[j][1],2),1/2 ) < distance & players[i][2]*players[j][2] > 0  ) {
        ded = ded + 1
       if (random()>0.5){
        players[i][2] = 0;
        players[j][4] = players[j][4] + 1;
     }
       else{
        players[j][2] =0;
        players[i][4] = players[i][4] + 1; 
       }
      }
    }
  }

ingame = ingame-ded;
console.log(ingame);
console.log(ded + ' died');

  var alph = 0.1
  for (i=0; i< players.length;i++){
    if ( players[i][2] === 1 ){
    players[i][0] = players[i][0] + alph *( goal[0][0] - players[i][0])  + 25*(random() -0.5 );
    players[i][1] = players[i][1] +  alph *( goal[0][1] - players[i][1]) + 25*(random() - 0.5);
  }
}

svg.selectAll("circle")
  .data(players)
  .transition()
  .duration(1000)
  .attr("cx", function(d){
    return d[0];
  })
  .attr("cy",function(d){
    return d[1];
  })
  .style("fill",function(d){
    if (d[2] === 0){
      return 'black';
    }
    else{
      return 'green';
    }
  });



svg.selectAll("text")
  .data(players)
  .transition()
  .duration(1000)
  .attr("dx", function(d){
    return d[0]-50;
  })
  .attr("dy",function(d){
    return d[1]-11;
  })
  .text(function (d){
    if (d[2]===0){
      return ''
    }
    else{
      var app = d[3] + ' ' + d[4]; 
    return app;
}
  });

svg.selectAll("circle")
  .data(goal)
  .transition()
  .duration(1000)
  .attr("cx", function(d){
    return d[0];
  })
  .attr("cy",function(d){
    return d[1];
  })
  .attr("r",20);
  counter = counter+1;
dedcounter = dedcounter + ded;
dedarray.push([counter,dedcounter]);
gg.innerHTML = "Number of encounters: <p>" + dedcounter + "</p>";
ingame = players.length - dedcounter;
ggh.innerHTML="In game: <p>" + ingame + "</p>";
}



function ResetData(){
dedcounter = 0;
ingame = alive;
gg.innerHTML = "Number of encounters: <p>" + dedcounter + "</p>";
ggh.innerHTML = "In game: <p>" + ingame + "</p>";
    players = d3.range(alive).map(function() { return [random() * (width), random() * (height) , 1, adj[Math.floor((Math.random()*adj.length))] + names[Math.floor((Math.random()*names.length))], 0 ]; }),
    goal = d3.range(1).map(function() { return [random() * (width-width/4), random() * (height-height/4)]; });
    
svg.selectAll("g").remove().exit()

svg.selectAll(".point")
  .data(players)
  .enter()
     .append("g")
    .append("circle")
    .attr("class", "point")
    .attr("cx", function(d) { return d[0]; })
    .attr("cy", function(d) { return d[1]; })
    .attr("r", 5);

 svg.selectAll("g")
  .data(players)
  .append("text")
  .attr("dx", function(d){return d[0]+1;})
  .attr("dy", function(d){return d[1]+1;})
    .style('color','Black')
    .text(function(d) { return d[3]; });
}

function NewAlive(){
console.log(document.getElementById("parts").value);
if (document.getElementById("parts").value) {
alive = Number(document.getElementById("parts").value);
ResetData();
}
else{
alive = 50;
ResetData();
}

}