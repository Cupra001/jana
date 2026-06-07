let player;

// تهيئة مشغل اليوتيوب
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: '31qYeEsoClw', // معرف الأغنية
        playerVars: {
            'start': 45, // البدء من الثانية 0:45
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'autoplay': 0,
            'fs': 0,
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("Player is ready");
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("Music is playing");
        const checkTimeInterval = setInterval(() => {
            if (player && typeof player.getCurrentTime === 'function') {
                const currentTime = player.getCurrentTime();
                // التوقف بعد حوالي 1.5 دقيقة من البدء
                if (currentTime >= 135) { // 45 + 90 = 135 ثانية
                    player.stopVideo();
                    clearInterval(checkTimeInterval);
                }
            }
        }, 500);
    }
}

// توليد أجزاء الورود ديناميكياً
document.querySelectorAll('.flower-container').forEach((el, index) => {
    el.innerHTML = `
        <div class="flower-top">
            <div class="flower-petal flower-petal__1"></div>
            <div class="flower-petal flower-petal__2"></div>
            <div class="flower-petal flower-petal__3"></div>
            <div class="flower-petal flower-petal__4"></div>
            <div class="flower-petal flower-petal__5"></div>
            <div class="flower-petal flower-petal__6"></div>
            <div class="flower-petal flower-petal__7"></div>
            <div class="flower-petal flower-petal__8"></div>
            <div class="flower-circle"></div>
            <div class="flower-light flower-light__1"></div>
            <div class="flower-light flower-light__2"></div>
            <div class="flower-light flower-light__3"></div>
            <div class="flower-light flower-light__4"></div>
            <div class="flower-light flower-light__5"></div>
            <div class="flower-light flower-light__6"></div>
            <div class="flower-light flower-light__7"></div>
            <div class="flower-light flower-light__8"></div>
        </div>
        <div class="flower-bottom">
            <div class="flower-stem"></div>
            <div class="flower-leaf flower-leaf__1"></div>
            <div class="flower-leaf flower-leaf__2"></div>
            <div class="flower-leaf flower-leaf__3"></div>
            <div class="flower-leaf flower-leaf__4"></div>
            <div class="flower-leaf flower-leaf__5"></div>
            <div class="flower-leaf flower-leaf__6"></div>
            <div class="flower-grass flower-grass__1"></div>
            <div class="flower-grass flower-grass__2"></div>
            <div class="flower-grass flower-grass__3"></div>
            <div class="flower-grass flower-grass__4"></div>
        </div>`;
});

// التحكم ببدء الحركة والموسيقى
document.getElementById('startBtn').addEventListener('click', function () {
    console.log("Start button clicked");

    // تشغيل الموسيقى من اليوتيوب
    try {
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            console.log("YouTube video playing");
        }
    } catch (error) {
        console.error("Error playing YouTube video:", error);
    }

    // إخفاء واجهة الترحيب
    const overlay = document.getElementById('welcome-overlay');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => overlay.style.display = 'none', 1000);

    // إظهار العنوان
    const title = document.getElementById('flower-title');
    setTimeout(() => {
        title.classList.add('show-title');
    }, 1500);

    // تشغيل أنيميشن الورود بالتتابع
    const flowers = Array.from(document.querySelectorAll('.flower-container'));
    const animatedClass = 'animate';

    flowers[0].classList.add(animatedClass);

    setTimeout(() => {
        for (let i = 1; i <= 2 && i < flowers.length; i++) {
            flowers[i].classList.add(animatedClass);
        }

        let remaining = flowers.slice(3);
        const interval = setInterval(() => {
            if (remaining.length === 0) {
                clearInterval(interval);
                return;
            }

            const randomIndex = Math.floor(Math.random() * remaining.length);
            const el = remaining.splice(randomIndex, 1)[0];
            el.classList.add(animatedClass);
        }, 500);

    }, 3000);
});
