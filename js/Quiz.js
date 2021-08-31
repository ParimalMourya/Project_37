class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.message.hide();
    question.title.hide();
    question.input1.hide();
    question.input2.hide();
    question.button.hide();
    
    //write code to change the background color here
    background(background2);
    //write code to show a heading for showing the result of Quiz
    fill("Black");
    textSize(25);
    text("Result Of The Quiz",350,30);
    text("---------------------------",350,45);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    //write code to add a note here
    if (allContestants !== undefined){
      fill("Yellow");
      textSize(21);
      text("*Note: Contestant who answered correct is highlighted in green color!!", 130, 230);
    }

    //write code to highlight contest who answered correctly
    for (var plr in allContestants){
      var correctAns = "1";
      if (correctAns === allContestants[plr].answer){
        fill("Green");
        text(`${allContestants[plr].name} : ${allContestants[plr].answer}`,150,250);
      }
      else{
        fill("Red");
        text(`${allContestants[plr].name} : ${allContestants[plr].answer}`,150,270);
      }
    }
  }

}
