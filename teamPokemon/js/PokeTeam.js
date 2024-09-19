function selectImage(element) {
    const audio = document.getElementById('select-audio');
    
    audio.currentTime = 0;
    audio.play();

    document.querySelectorAll('.section-gender-images').forEach(el => {
        el.classList.remove('active');
        el.querySelector('img').classList.remove('active');
    });
    
    element.classList.add('active');
    element.querySelector('img').classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const muteButton = document.getElementById('mute-toggle');
    const volumeIcon = muteButton.querySelector('i');

    if (audio) {

        audio.volume = 0.1; 

        audio.addEventListener('canplaythrough', () => {
            console.log('Audio cargado y listo para reproducir.');
        }, { once: true });


        audio.addEventListener('error', () => {
            console.log('Error al cargar el audio.');
        });

        muteButton.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            } else {
                audio.muted = true;
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            }
        });
    } else {
        console.log('Elemento de audio no encontrado.');
    }
});