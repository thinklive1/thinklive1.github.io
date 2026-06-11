(function fairyDustCursor() {
    const EFFECTS_STORAGE_KEY = 'site-effects-disabled';

    function effectsDisabled() {
        try {
            return localStorage.getItem(EFFECTS_STORAGE_KEY) === 'true';
        } catch (error) {
            return false;
        }
    }

    if (effectsDisabled()) return;

    var possibleColors = ["#000", "#AAA", "#FFF"]
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: width / 2 };
    var particles = [];
    let lastPosition = { x: 0, y: 0 };
    let animationFrameId;
    let active = true;

    function init() {
        bindEvents();
        loop();
    }

    // Bind events that are needed
    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);

        window.addEventListener('resize', onWindowResize);
        window.addEventListener('site-effects-change', onEffectsChange);
    }

    function unbindEvents() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchstart', onTouchMove);
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('site-effects-change', onEffectsChange);
    }

    function onEffectsChange(event) {
        if (!event.detail || !event.detail.disabled) return;

        active = false;
        cancelAnimationFrame(animationFrameId);
        unbindEvents();
        particles.forEach(particle => particle.die());
        particles = [];
    }
    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onTouchMove(e) {
        if (!active || effectsDisabled()) return;

        if (e.touches.length > 0) {
            for (var i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
            }
        }
    }

    function onMouseMove(e) {
        if (!active || effectsDisabled()) return;

        cursor.x = e.clientX;
        cursor.y = e.clientY;
        lastPosition.x = e.clientX;
        lastPosition.y = e.clientY;

        if (Math.random() < 0.2) { // 调整此值以减少生成粒子的频率
            addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
        }
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {

        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }

    }

    function loop() {
        if (!active || effectsDisabled()) return;

        animationFrameId = requestAnimationFrame(loop);
        updateParticles();
        if (Math.random() > 0.9) {
            addParticle(lastPosition.x, lastPosition.y);
        }
    }

    function Particle() {

        this.character = "*";
        this.lifeSpan = 100; //ms
        this.initialStyles = {
            "position": "fixed",
            "top": "0", //必须加
            "display": "block",
            "pointerEvents": "none",
            "z-index": "10000000",
            "fontSize": "30px",
            "will-change": "transform"
        };

        this.init = function (x, y, color) {

            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = { x: x - 10, y: y - 20 };
            this.initialStyles.color = color;
            //console.log(color);

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.body.appendChild(this.element);
        };

        this.update = function () {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        }

        this.die = function () {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }

    }

    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    init();
})();
