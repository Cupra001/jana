// توليد أجزاء الورود ديناميكياً داخل الحاويات
document.querySelectorAll('.flower-container').forEach(el => {
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

// التحكم ببدء الحركة والموسيقى والمكتوب عند النقر على زر "افتح الهدية"
document.getElementById('startBtn').addEventListener('click', function() {
    // 1. تشغيل الأغنية فوراً وبدون كتم
    const music = document.getElementById("bgMusic");
    music.play().catch(error => console.log("Playback interaction required:", error));

    // 2. إخفاء واجهة الترحيب بنعومة
    const overlay = document.getElementById('welcome-overlay');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => overlay.style.display = 'none', 1000);

    // 3. إظهار نص الاسم المضيء فوق الورود
    const title = document.getElementById('flower-title');
    setTimeout(() => {
        title.classList.add('show-title');
    }, 1500);

    // 4. إظهار حاوية المكتوب المضيء في المنتصف
    const envelopeContainer = document.getElementById('envelope-container');
    setTimeout(() => {
        envelopeContainer.classList.add('show-envelope');
    }, 2000);

    // 5. تشغيل أنيميشن نمو الورود بالتتابع الاحترافي الخاص بك
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

// حدث فتح المكتوب وإطلاق الفراشات الحمراء
const envelope = document.querySelector('.envelope');
envelope.addEventListener('click', function() {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        
        // إطلاق الفراشات فور فتح المكتوب
        createButterflies();
    }
});

// دالة توليد الفراشات الحمراء الطائرة
function createButterflies() {
    const container = document.getElementById('butterflies-container');
    const envelopeRect = envelope.getBoundingClientRect();
    
    // نقطة انطلاق الفراشات (مركز المكتوب)
    const startX = envelopeRect.left + envelopeRect.width / 2;
    const startY = envelopeRect.top + envelopeRect.height / 3;

    // توليد 25 فراشة
    for (let i = 0; i < 25; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        
        butterfly.innerHTML = `
            <div class="wing left"></div>
            <div class="wing right"></div>
        `;
        
        // موقع البدء
        butterfly.style.left = `${startX}px`;
        butterfly.style.top = `${startY}px`;
        
        // حساب مسارات عشوائية متفرقة للطيران للأعلى والجوانب
        const targetX = (Math.random() - 0.5) * window.innerWidth * 1.2;
        const targetY = -(Math.random() * window.innerHeight * 0.8 + 200);
        const randomScale = Math.random() * 0.8 + 0.6;
        const randomRotation = (Math.random() - 0.5) * 90;
        const duration = Math.random() * 2 + 2.5; // سرعات متفاوتة بين 2.5 إلى 4.5 ثانية
        const delay = Math.random() * 0.4; // تأخير خفيف ليعطي تتابع مريح بالخروج

        // تمرير المتغيرات العشوائية إلى كود الـ CSS الخاص بالفراشة
        butterfly.style.setProperty('--x', `${targetX}px`);
        butterfly.style.setProperty('--y', `${targetY}px`);
        butterfly.style.setProperty('--s', randomScale);
        butterfly.style.setProperty('--r', `${randomRotation}deg`);
        
        // تطبيق أنيميشن الطيران
        butterfly.style.animation = `fly-away ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        butterfly.style.animationDelay = `${delay}s`;
        
        container.appendChild(butterfly);
        
        // حذف الفراشة من الـ DOM بعد انتهاء الحركة لتوفير أداء المتصفح
        setTimeout(() => {
            butterfly.remove();
        }, (duration + delay) * 1000);
    }
}
