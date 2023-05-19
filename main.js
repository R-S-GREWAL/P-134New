objects = [];
stature = "";
function preload()
{ 
    audio = loadSound("song.mp3");
}
function setup() 
{ 
    canvas = createCanvas(900,325);
    canvas.parent('canvas');
    video = createCapture(VIDEO);
    video.size(900,325);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("stature").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() 
{ 
     console.log("Model Loaded!"); 
     stature = true;
     video.loop(); 
     video.speed(1); 
     video.volume(0); 
    
}
function gotResult(error, results) 
{ 
    if (error) 
    { 
        console.log(error); 
    } 
    console.log(results); 
    objects = results; 
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (stature != "person") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("stature").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Person Found" + objects.length;
            audio.stop();

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    else {
        document.getElementById("stature").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Person Not Found" + objects.length;
        audio.play();
    }
}
    