const cricLive = require('cric-live');
  
cricLive.getRecentMatches()
  .then(currentMatches => {
      console.log(currentMatches.series);
      for(i in currentMatches){
          console.log("Series : "+currentMatches[i].series);
          console.log("Status : "+currentMatches[i].status);
          for (j in currentMatches[i].teams){
              console.log("Team"+currentMatches[i].teams[j].name + "\n");
              console.log("Score"+currentMatches[i].teams[j].score + "\n");
              console.log("Overs"+currentMatches[i].teams[j].overs + "\n");
              console.log("Wickets"+currentMatches[i].teams[j].wickets + "\n");
          }
       }
  });