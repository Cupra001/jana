let player;

// تهيئة مشغل اليوتيوب المخفي عند تحميل الصفحة
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: '31qYeEsoClw', // معرف الأغنية الخاصة بك
        playerVars: {
            'start': 45,       // بدء التشغيل من الثانية 45 (0:45)
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    // مراقبة الوقت لإيقاف الأغنية بدقة عند الدقيقة 1:30 (الثانية 90)
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
    // 1. تشغيل الأغنية بصوت نقي عند التفاعل
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
    }

    // 2. إخفاء الكارت مع أنميشن لطيف
    const giftCard = document.getElementById('gift-card');
    giftCard.style.opacity = '0';

    setTimeout(() => {
        giftCard.classList.add('hidden');

        // 3. إظهار حقل الورود المتباعدة والوردة البيضاء الساحرة
        const flowerContainer = document.getElementById('flower-container');
        flowerContainer.classList.remove('hidden');
    }, 500);
});