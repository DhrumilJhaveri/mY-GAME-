class Game {
  constructor(){

  }

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addAnimation("car1Running",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    bulletGroup=new Group();
  }

  play(){
    form.hide();
    player.getCarsAtEnd();
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,0,displayWidth*2, displayHeight*2);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x ;
      var y;
    
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        x = displayWidth - allPlayers[plr].xDist;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.xDist +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.xDist -=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank+=1;
      Player.UpdateCarsAtEnd(player.rank);
    }
   if(keyIsDown("space")&&player.index !== null){
     bullet();
     bulletgroup.setVelocity(0,3);
     bulletGroup.x = cars[index-1].x;
     bulletGroup.y = cars[index-1].y;
   }

   if(car1.isTouching(gem)){
     gem.visible=false;
   }
    drawSprites();
  }
   Bullet (){
    var bullet=createSprite(10,10,20,20);
    bullet.shapeColor= "red";
    bulletGroup.add(bullet);
    bullet.lifetime=200;
    }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}




