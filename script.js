let player;

// تهيئة مشغل اليوتيوب المخفي عند تحميل الصفحة
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: '31qYeEsoClw',
        playerVars: {
            'start': 45,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'autoplay': 1
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        const checkTimeInterval = setInterval(() => {
            if (player.getCurrentTime() >= 90) {
                player.stopVideo();
                clearInterval(checkTimeInterval);
            }
        }, 500);
    }
}

document.getElementById('open-btn').addEventListener('click', function () {
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
    }

    const giftCard = document.getElementById('gift-card');
    giftCard.style.opacity = '0';
    giftCard.style.transform = 'scale(0.8) translateY(-50px)';

    setTimeout(() => {
        giftCard.classList.add('hidden');

        const flowerContainer = document.getElementById('flower-container');
        flowerContainer.classList.remove('hidden');

        // إنشاء الفراشات بعد ظهور الورود
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createButterfly(), i * 500);
        }
    }, 500);
});

// تأثير الفراشات العشوائية
function createButterfly() {
    const flowerContainer = document.getElementById('flower-container');
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.innerHTML = '🦋';
    butterfly.style.left = Math.random() * 100 + '%';
    butterfly.style.top = Math.random() * 50 + '%';
    butterfly.style.animationDelay = Math.random() * 2 + 's';
    flowerContainer.appendChild(butterfly);

    setTimeout(() => butterfly.remove(), 10000);
}