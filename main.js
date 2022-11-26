
var canvasSizeX = 600;
var canvasSizeY = 500;
var canvasPosX = screen.width/2 - canvasSizeX/2;
var canvasPosY = screen.height/2 - canvasSizeY/2;

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;

songStatus = "";

function preload()
{
  song1 = loadSound("HP1.mp3"); // left wrist
  song2 = loadSound("PP2.mp3"); // right wrist
}

function setup() {
  canvas = createCanvas(canvasSizeX, canvasSizeY);
  canvas.position(canvasPosX,canvasPosY);
  video = createCapture(VIDEO);
  video.size(canvasSizeX,canvasSizeY);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded () {
  console.log('PoseNet Is Initialized');
}

function draw() {
  image(video, 0, 0, 600, 500);
  
  fill("#FF0000");
	stroke("#FF0000");

  songStatus = song1.isPlaying();

  console.log(songStatus);

  if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
    song2.stop();

    if(songStatus == false){
      song1.play();
      document.getElementById("mysong").innerHTML = "Song Name: Harry Potter Theme Song";
    }



		//InNumberleftWristY = Number(leftWristY);
		//new_leftWristY = floor(InNumberleftWristY *2);
		//leftWristY_divide_1000 = new_leftWristY/1000;
		//document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
		//song.setVolume(leftWristY_divide_1000);	
	}

}

function gotPoses(results)
{
  if(results.length > 0)
  {

    scoreLeftWrist =  results[0].pose.keypoints[9].score;

    //console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    console.log("scoreLeftWrist = " + scoreLeftWrist);

    //console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    //console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    //console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
  }
}