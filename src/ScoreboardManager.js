class ScoreboardManager
{
  constructor()
  {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.scoreboard =  []
    this.count = 0
    this.playerName = ""
    this.session = false
    this.local = false

    this.storageType = "none";


   this.minutes;
   this.seconds;
   this.duration=0;
   this.posX=405;
   this.posY=50;
   this.timerActive = true;



  }
  startTimer(){
    this.timerActive = true;
    this.beginDate = new Date();
    console.log(this.beginDate.getTime())

  }
  stopTimer(){

    this.timerActive = false;
  }
  getTimeMilliSeconds(){
    this.endDate = new Date();
    return (this.endDate.getTime() - this.beginDate.getTime())
  }
  getTimeSeconds(){

    return (this.getTimeMilliSeconds() / 1000)
  }
  getTimeMinutes(){

    return (this.getTimeSeconds() / 60)

  }
  getTimeHours(){

    return (getTimeMinutes() / 60)

  }
  getScorePerMin(score){
    return Math.trunc(score / this.getTimeMinutes());
  }
  getDisplayTimer()
  {
    if(this.timerActive == true){

      this.diff = this.duration + (((Date.now() - this.beginDate) / 1000) | 0);

       // does the same job as parseInt truncates the float
       this.minutes = (this.diff / 60) | 0;
       this.seconds = (this.diff % 60) | 0;

       this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
       this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;


       setInterval(this.timer, 1000);


    }
    return(this.minutes+":"+this.seconds)


  }
  clearLocalStorage()
  {

    localStorage.removeItem('Scoreboard');

  }
  clearSessionStorage()
  {
    sessionStorage.removeItem('Scoreboard');
  }
  initBoard(storageType)
  {

    if(storageType == "local" || storageType == "Local"){
      this.storageType = "local"
      if((localStorage.getItem('Scoreboard') === null))
      {

        localStorage.setItem('Scoreboard', JSON.stringify(this.scoreboard));
      }
      this.scoreboard = JSON.parse(localStorage.getItem('Scoreboard'));

      if(this.scoreboard == null)
      {
        this.scoreboard = []
      }
    }
    else if (storageType == "session" || storageType == "Session") {
      this.storageType = "session"
      if((sessionStorage.getItem('Scoreboard') === null))
      {
        sessionStorage.setItem('Scoreboard', JSON.stringify(this.scoreboard));
      }
      this.scoreboard = JSON.parse(sessionStorage.getItem('Scoreboard'));

      if(this.scoreboard == null)
      {
        this.scoreboard = []
      }
    }
    else{
      console.log("Please enter a valid storage type")
    }


  }
  //Takes user input, adds the score which is passed
  //to the function along with a userID which is created
  //To the leaderboardd as an object in the form {name: "Aaron", score:100, playerID:1}
  addToBoard(score)
  {
    this.stopTimer();


      var seconds = this.getTimeSeconds()
      var time = this.getDisplayTimer()
      var spm = this.getScorePerMin(score)
      while (this.playerName === "" || this.playerName == null || this.playerName.length > 7)
      {
          this.playerName = prompt ("Please enter your name less than 7 charachters","");
      }
        this.playerID = this.scoreboard.length + 1;
        var object = {name: this.playerName,
                      score: score,
                      time: time,
                      spm: spm,
                      seconds: seconds,
                      playerID: this.playerID}

        this.scoreboard.push(object);

        switch(this.storageType) {
            case "local":
            localStorage.setItem('Scoreboard', JSON.stringify(this.scoreboard));
              break;
            case "session":
            sessionStorage.setItem('Scoreboard', JSON.stringify(this.scoreboard));
              break;
      }
        this.count = this.count + 1;
    

  }

  getBoard()
  {
    return this.scoreboard
  }

  filterName(name)
  {
    this.scoreboard.filter(function(scoreboard)
    {
      return (scoreboard.name == name);
    })

  }

  filterTime(val)
  {
    this.scoreboard.sort(function(a,b){

      if(val === 1){
        return a.seconds - b.seconds
      }
      else if (val === -1){
        return b.seconds - a.seconds
      }
    })
  }

  filterScore(val)
  {
    //Filter
    //var byTime = this.scoreboard.slice(0)

    this.scoreboard.sort(function(a,b){

      if(val === 1){
        return a.score - b.score
      }
      else if (val === -1){
        return b.score - a.score
      }
    })
  }

  filterSPM(val)
  {
    //Filter
    this.scoreboard.sort(function(a,b){
      if(val === 1){
        return a.spm - b.spm
      }
      else if (val === -1){
        return b.spm - a.spm
      }
    })
  }
  generate_table() {



      var tablecontentsHeader = "";
      var tablecontents = "";
      tablecontents = "<table>";
      tablecontents += "<tr>";
      tablecontents += "<td>" + "Pos" + "</td>";
      tablecontents += "<td>" + "Name"+ "</td>";
      tablecontents += "<td>" + "Time" + "</td>";
      tablecontents += "<td>" + "Score" + "</td>";
      tablecontents += "<td>" + "SPM" + "</td>";
      tablecontents += "</tr>";

      for (var i = 0; i < this.scoreboard.length; i ++)
     {
       var pos = 1+i;
        tablecontents += "<tr>";
        tablecontents += "<td>" + i + "</td>";;
        tablecontents += "<td>" + this.scoreboard[i].name + "</td>";
        tablecontents += "<td>" + this.scoreboard[i].time + "</td>";
        tablecontents += "<td>" + this.scoreboard[i].score + "</td>";
        tablecontents += "<td>" + this.scoreboard[i].spm + "</td>";
        tablecontents += "</tr>";
     }
     tablecontents += "</table>";
     document.getElementById("table").style.display = "block";
     document.getElementById("table").style.fontfamily = '55px Adventure Regular';
     document.getElementById("table").innerHTML=tablecontents;

}
}
