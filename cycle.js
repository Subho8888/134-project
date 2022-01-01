img="";
status="";
object=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function draw(){
    image(video,0,0,380,380);

    objectDetector.detect(video,gotResults);
    for(i = 0;i < object.length;i++){
          
       
        if(object[i].label="person"){
            document.getElementById("status").innerHTML="Status:Detected Objects";
            document.getElementById("baby_detect").innerHTML="Baby Found";
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text("Baby/Person");
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            
        }
        else{
     play("siren.mp3");
     document.getElementById("baby_detect").innerHTML="Baby Can't be detect";
        }

       
}
}
function ModelLoaded(){
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video,gotResults);
    }
    function gotResults(error,results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            object=results;
        }
    }
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
