function speak(){
    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(document.getElementById('textarea').value);
    let sounds = synth.getVoices();
    console.log(sounds)
    voice.voice = sounds[4];
    synth.speak(voice);
}
window.onload = function() {
    document.getElementById('textarea').value = ''; // Clear the textarea
};