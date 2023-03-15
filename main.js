//https://teachablemachine.withgoogle.com/models/lHmA-p8TK/

prediction = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id = "imageResult" src = "'+data_uri+'">'
    })
}

console.log('ml5_version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lHmA-p8TK/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('imageResult');
    classifier.classify(img, gotResult);
 }


 function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);

        prediction = result[0].label;
        
        document.getElementById("Hand_Gesture_Name").innerHTML = prediction;

        if(prediction == "Three"){
            document.getElementById('Hand_Gesture_Emoji').innerHTML = "3️⃣";
        }
        
        if(prediction == "Finger Gun"){
            document.getElementById('Hand_Gesture_Emoji').innerHTML = "👉"
        }

        if(prediction == "Pinky"){
            document.getElementById('Hand_Gesture_Emoji').innerHTML = "🤙"
        }

        if(prediction == "Superb"){
            document.getElementById('Hand_Gesture_Emoji').innerHTML = "👌"
        }

    }
 }

 function speak(){
    synth = window.speechSynthesis;
    speakdata = "The system thinks it's a" + prediction;
    utterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
}