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
    // تشغيل الموسيقى
    const music = document.getElementById("bgMusic");
    music.play().catch(error => console.log("Playback interaction required:", error));

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