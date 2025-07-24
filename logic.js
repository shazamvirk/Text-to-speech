
let textarea=document.querySelector("textarea");
let voiceList=document.querySelector("select");
let speechBtn=document.querySelector("button")
let synth=speechSynthesis,
IsSpeaking=true;
voices();
function voices(){
    for(let voice of synth.getVoices()){
        let selected=voice.name === "Google US English" ? "selected" : "";
        let option=`<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang}) </option>`;
        voiceList.insertAdjacentHTML("beforeend",option)
    }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance=new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice=voice;
        }
    }
    // let utternance=new SpeechSynthesisUtterance(text);
    synth.speak(utternance);
}
speechBtn.addEventListener("click", e=>{
        e.preventDefault();
        if(textarea.value!== ""){
            if(!synth.speaking){
            textToSpeech(textarea.value)
            }
            if(textarea.value.length >80){
                if(IsSpeaking){
                    synth.resume();
                    IsSpeaking=false;
                    speechBtn.innerHTML="Pause Speech"
                }
                else{
                    synth.pause();
                    IsSpeaking=true;
                    speechBtn.innerHTML="Resume Speech"
                }
                setInterval(()=>{
                    if(!synth.speaking && !IsSpeaking){
                        IsSpeaking=true;
                        speechBtn.innerHTML ="Listen";
                    }
                })
            }else{
                speechBtn.innerHTML ="Listen";
            }
        }
        
    });