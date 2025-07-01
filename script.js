// Global variables
let currentTheme = 'dark';
let currentFont = 'jetbrains';
let gameInstance = null;
let gameInitialized = false;

// Prevent multiple script execution
if (window.portfolioLoaded) {
    console.log('Portfolio already loaded, skipping duplicate execution');
} else {
    window.portfolioLoaded = true;
    
    // Global game control functions (available immediately)
    window.startBrickBreakerGame = function() {
        console.log('startBrickBreakerGame called');
        if (!gameInitialized) {
            console.log('Initializing game first...');
            initializeHeroGame();
        }
        if (window.startBrickBreakerGameInternal) {
            console.log('Starting game...');
            window.startBrickBreakerGameInternal();
        } else {
            console.log('Game internal function not available');
        }
    };

    window.stopBrickBreakerGame = function() {
        console.log('stopBrickBreakerGame called');
        if (window.stopBrickBreakerGameInternal) {
            console.log('Stopping game...');
            window.stopBrickBreakerGameInternal();
        } else {
            console.log('Game internal function not available');
        }
    };

// DOM Content Loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializePreloader();
        initializeThemeControls();
        initializeNavigation();
        initializeScrollAnimations();
        // Don't initialize game here - it will be called after preloader
    });

// Preloader functionality
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.loading-percentage');
    const loadingStatus = document.querySelector('.loading-status');
    const typingAnimation = document.querySelector('.typing-animation');
    
    const loadingStates = [
        "Initializing...",
        "Loading dependencies...",
        "Setting up environment...",
        "Starting services...",
        "Almost ready..."
    ];
    
    let progress = 0;
    let statusIndex = 0;
    
    // Typing animation for command
    const command = "npm start";
    let typingIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (typingIndex <= command.length) {
            typingAnimation.textContent = command.substring(0, typingIndex);
            typingIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
    
    // Progress animation
    const progressInterval = setInterval(() => {
        const increment = Math.random() * 15 + 5;
        progress = Math.min(progress + increment, 100);
        
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress) + '%';
        
        // Update status based on progress
        const newStatusIndex = Math.floor((progress / 100) * loadingStates.length);
        if (newStatusIndex < loadingStates.length && newStatusIndex !== statusIndex) {
            statusIndex = newStatusIndex;
            loadingStatus.textContent = loadingStates[statusIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Only initialize if not already initialized
                    if (!gameInitialized) {
                        initializeHeroGame();
                    }
                    initializeHeroTyping();
                    
                    // Update play button text since game auto-starts
                    setTimeout(() => {
                        const playBtn = document.querySelector('.play-btn');
                        if (playBtn) {
                            playBtn.textContent = 'RESTART_GAME()';
                        }
                    }, 1000);
                }, 500);
            }, 1000);
        }
    }, 150);
}

// Theme controls
function initializeThemeControls() {
    const themeToggle = document.getElementById('theme-toggle');
    const fontToggle = document.getElementById('font-toggle');
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.className = `font-${currentFont} ${currentTheme}`;
        themeToggle.textContent = currentTheme === 'dark' ? '🌙 Dark' : '☀️ Light';
    });
    
    fontToggle.addEventListener('click', () => {
        currentFont = currentFont === 'jetbrains' ? 'fira' : 'jetbrains';
        document.body.className = `font-${currentFont} ${currentTheme}`;
        fontToggle.textContent = currentFont === 'jetbrains' ? 'Fira Code' : 'JetBrains Mono';
    });
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNav() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced Comic Book Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation classes
                entry.target.classList.add('visible');
                
                // Animate child elements with staggered delays
                const animatableElements = entry.target.querySelectorAll(
                    '.section-title, .work-item, .about-stat, .contact-method, .project-card'
                );
                
                animatableElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('comic-reveal');
                    }, index * 150); // Stagger by 150ms
                });
                
                // Add particle burst effect for section entrance
                createSectionParticles(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all section slides
    document.querySelectorAll('.section-slide').forEach(section => {
        observer.observe(section);
    });
    
    // Add parallax effect to background elements
    addParallaxEffect();
}

// Create particle burst effect for sections
function createSectionParticles(section) {
    const particleCount = 15;
    const sectionRect = section.getBoundingClientRect();
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'section-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #3b82f6;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${sectionRect.left + Math.random() * sectionRect.width}px;
            top: ${sectionRect.top + sectionRect.height / 2}px;
            animation: particleBurst 1.5s ease-out forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Add parallax scrolling effect
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.geometric-shape, .code-climbers');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * (0.5 + index * 0.1);
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16));
}

// Hero typing animation
function initializeHeroTyping() {
    const typingElement = document.querySelector('.typing-text');
    const text = "Building digital solutions that matter_";
    let index = 0;
    
    function typeText() {
        if (index <= text.length) {
            typingElement.textContent = text.substring(0, index);
            index++;
            setTimeout(typeText, 100);
        }
    }
    
    typeText();
}

// Brick Breaker Game
function initializeHeroGame() {
    // Prevent duplicate initialization
    if (gameInitialized) {
        console.log('Game already initialized, skipping...');
        return;
    }
    
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.log('Canvas not found, retrying in 100ms...');
        setTimeout(initializeHeroGame, 100);
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size with mobile optimizations
    function resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;
        
        // Optimize for mobile performance by reducing canvas resolution on smaller screens
        const scaleFactor = isMobile() ? Math.min(pixelRatio, 2) : pixelRatio;
        
        canvas.width = displayWidth * scaleFactor;
        canvas.height = displayHeight * scaleFactor;
        
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
        
        // Scale context to ensure correct drawing operations
        ctx.scale(scaleFactor, scaleFactor);
        
        // Adjust game elements for screen size
        if (isMobile()) {
            // Make paddle larger on mobile for easier control
            game.paddle.width = Math.max(80, displayWidth * 0.15);
            game.paddle.height = 10;
            game.ball.radius = Math.max(5, displayWidth * 0.008);
            game.ball.speed = Math.max(2, displayWidth * 0.003);
        } else {
            // Desktop sizes
            game.paddle.width = 100;
            game.paddle.height = 12;
            game.ball.radius = 6;
            game.ball.speed = 3;
        }
        
        // Reinitialize game positions if game is active
        if (gameInitialized) {
            game.paddle.x = canvas.width / scaleFactor / 2 - game.paddle.width / 2;
            game.paddle.y = canvas.height / scaleFactor - 40;
            
            if (!gameActive) {
                game.ball.x = canvas.width / scaleFactor / 2;
                game.ball.y = canvas.height / scaleFactor - 60;
            }
        }
    }
    
    resizeCanvas();
    
    // Throttled resize handler for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
    });
    
    // Game variables
    const game = {
        paddle: {
            width: 100,
            height: 12,
            x: 0,
            y: 0,
            speed: 8
        },
        ball: {
            x: 0,
            y: 0,
            radius: 6,
            dx: 3,
            dy: -3,
            speed: 3
        },
        bricks: [],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
        codeSymbols: ['{}', '<>', '()', '[]', '//', '&&', '||', '==', '!=', '++', '--', '=>', '??', '::'],
        keywords: ['var', 'let', 'const', 'if', 'else', 'for', 'function', 'class', 'import', 'export'],
        score: 0,
        lives: 3
    };
    
    // Initialize game objects
    function initGame() {
        // Paddle position
        game.paddle.x = canvas.width / 2 - game.paddle.width / 2;
        game.paddle.y = canvas.height - 40;
        
        // Ball position
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height - 60;
        
        // Create bricks
        createBricks();
    }
    
    function createBricks() {
        const brickRows = 6;
        const brickCols = Math.floor(canvas.width / 100);
        const brickWidth = 80;
        const brickHeight = 20;
        const brickPadding = 8;
        const offsetTop = 80;
        const offsetLeft = (canvas.width - (brickCols * (brickWidth + brickPadding) - brickPadding)) / 2;
        
        game.bricks = [];
        
        for (let r = 0; r < brickRows; r++) {
            for (let c = 0; c < brickCols; c++) {
                // Randomize between symbols and keywords
                const isSymbol = Math.random() > 0.5;
                const codeText = isSymbol 
                    ? game.codeSymbols[Math.floor(Math.random() * game.codeSymbols.length)]
                    : game.keywords[Math.floor(Math.random() * game.keywords.length)];
                
                const brick = {
                    x: offsetLeft + c * (brickWidth + brickPadding),
                    y: offsetTop + r * (brickHeight + brickPadding),
                    width: brickWidth,
                    height: brickHeight,
                    visible: true,
                    color: game.colors[r % game.colors.length],
                    text: codeText,
                    isSymbol: isSymbol
                };
                game.bricks.push(brick);
            }
        }
    }
    
    // Draw functions
    function drawPaddle() {
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height);
        
        // Add subtle glow effect (reduced)
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 3;
        ctx.fillRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height);
        ctx.shadowBlur = 0;
        
        // Add code bracket styling
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 1;
        ctx.strokeRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height);
    }
    
    function drawBall() {
        ctx.beginPath();
        ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        
        // Add subtle glow effect (reduced)
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Add coding cursor effect
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    function drawBricks() {
        game.bricks.forEach(brick => {
            if (brick.visible) {
                // Draw brick background with minimal glow
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                
                // Add very subtle glow (reduced from 5 to 2)
                ctx.shadowColor = brick.color;
                ctx.shadowBlur = 2;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                ctx.shadowBlur = 0;
                
                // Add code-themed border
                ctx.strokeStyle = '#374151';
                ctx.lineWidth = 1;
                ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
                
                // Draw code text on the brick
                ctx.fillStyle = '#ffffff';
                ctx.font = brick.isSymbol ? '14px "JetBrains Mono", monospace' : '12px "JetBrains Mono", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Add text shadow for better readability
                ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                ctx.shadowBlur = 1;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                
                ctx.fillText(
                    brick.text, 
                    brick.x + brick.width / 2, 
                    brick.y + brick.height / 2
                );
                
                // Reset shadow
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
        });
    }
    
    // Collision detection
    function ballBrickCollision() {
        game.bricks.forEach(brick => {
            if (brick.visible &&
                game.ball.x + game.ball.radius > brick.x &&
                game.ball.x - game.ball.radius < brick.x + brick.width &&
                game.ball.y + game.ball.radius > brick.y &&
                game.ball.y - game.ball.radius < brick.y + brick.height) {
                
                brick.visible = false;
                game.ball.dy = -game.ball.dy;
                game.score++;
                
                // Create particle effect
                createParticles(brick.x + brick.width / 2, brick.y + brick.height / 2, brick.color);
            }
        });
    }
    
    function ballPaddleCollision() {
        if (game.ball.y + game.ball.radius > game.paddle.y &&
            game.ball.x > game.paddle.x &&
            game.ball.x < game.paddle.x + game.paddle.width) {
            
            // Calculate hit position for angle
            const hitPos = (game.ball.x - game.paddle.x) / game.paddle.width;
            const angle = (hitPos - 0.5) * Math.PI / 3; // Max 60 degrees
            
            game.ball.dx = Math.sin(angle) * game.ball.speed;
            game.ball.dy = -Math.abs(Math.cos(angle) * game.ball.speed);
        }
    }
    
    // Particle system
    const particles = [];
    
    function createParticles(x, y, color) {
        // Create code-themed particles
        const codeChars = ['0', '1', '{', '}', ';', '/', '*', '+', '-', '='];
        for (let i = 0; i < 12; i++) {
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                color: color,
                life: 40,
                maxLife: 40,
                char: codeChars[Math.floor(Math.random() * codeChars.length)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    }
    
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.rotation += particle.rotationSpeed;
            particle.life--;
            
            // Add gravity effect to particles
            particle.dy += 0.1;
            
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }
    
    function drawParticles() {
        particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = particle.color;
            
            // Draw code characters instead of rectangles
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.font = '12px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.char, 0, 0);
            
            ctx.restore();
        });
    }
    
    // Game control variables
    let gameActive = false;
    let mouseX = canvas.width / 2;
    let mouseInitialized = false;
    let keys = {};
    
    // Mobile detection
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Game canvas event listeners (only when game is active)
    function addGameControls() {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        canvas.style.pointerEvents = 'auto';
        
        // Mobile-specific optimizations
        if (isMobile()) {
            // Disable zoom on touch
            document.addEventListener('touchstart', preventZoom, { passive: false });
            document.addEventListener('gesturestart', preventZoom, { passive: false });
        }
    }
    
    function removeGameControls() {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
        canvas.style.pointerEvents = 'none';
        
        if (isMobile()) {
            document.removeEventListener('touchstart', preventZoom);
            document.removeEventListener('gesturestart', preventZoom);
        }
    }
    
    function preventZoom(e) {
        if (e.touches && e.touches.length > 1) {
            e.preventDefault();
        }
    }
    
    let touchStartX = 0;
    let touchStartTime = 0;
    
    function handleTouchStart(e) {
        if (!gameActive) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        touchStartX = e.touches[0].clientX - rect.left;
        touchStartTime = Date.now();
        mouseX = touchStartX;
        mouseInitialized = true;
    }
    
    function handleTouchEnd(e) {
        if (!gameActive) return;
        e.preventDefault();
        // Handle tap/swipe gestures if needed
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 200) {
            // Quick tap - could be used for special actions
        }
    }
    
    function handleMouseMove(e) {
        if (!gameActive) return;
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseInitialized = true;
    }
    
    function handleTouchMove(e) {
        if (!gameActive) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseInitialized = true;
    }
    
    function handleKeyDown(e) {
        if (!gameActive) return;
        keys[e.key] = true;
    }
    
    function handleKeyUp(e) {
        if (!gameActive) return;
        keys[e.key] = false;
    }
    
    // Update game
    function update() {
        if (!gameActive) return;
        
        // Handle keyboard controls
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            game.paddle.x -= game.paddle.speed;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            game.paddle.x += game.paddle.speed;
        }
        
        // Handle mouse/touch controls (only if mouse has been moved and no keyboard input)
        if (mouseInitialized && !keys['ArrowLeft'] && !keys['ArrowRight'] && !keys['a'] && !keys['A'] && !keys['d'] && !keys['D']) {
            const targetX = mouseX - game.paddle.width / 2;
            const diff = targetX - game.paddle.x;
            // Only move if the difference is significant to avoid jittery movement
            if (Math.abs(diff) > 2) {
                // Use more responsive movement but cap the speed
                const moveAmount = Math.max(-8, Math.min(8, diff * 0.3));
                game.paddle.x += moveAmount;
            }
        }
        
        // Keep paddle in bounds
        if (game.paddle.x < 0) game.paddle.x = 0;
        if (game.paddle.x + game.paddle.width > canvas.width) {
            game.paddle.x = canvas.width - game.paddle.width;
        }
        
        // Move ball
        game.ball.x += game.ball.dx;
        game.ball.y += game.ball.dy;
        
        // Ball wall collision
        if (game.ball.x + game.ball.radius > canvas.width || game.ball.x - game.ball.radius < 0) {
            game.ball.dx = -game.ball.dx;
        }
        
        if (game.ball.y - game.ball.radius < 0) {
            game.ball.dy = -game.ball.dy;
        }
        
        // Ball bottom collision (reset)
        if (game.ball.y + game.ball.radius > canvas.height) {
            game.ball.x = canvas.width / 2;
            game.ball.y = canvas.height - 60;
            game.ball.dx = (Math.random() - 0.5) * 6;
            game.ball.dy = -3;
        }
        
        // Check collisions
        ballBrickCollision();
        ballPaddleCollision();
        
        // Update particles
        updateParticles();
        
        // Recreate bricks if all destroyed
        const visibleBricks = game.bricks.filter(brick => brick.visible);
        if (visibleBricks.length === 0) {
            setTimeout(createBricks, 1000);
        }
    }
    
    // Render game
    function render() {
        // Clear canvas with reduced trail effect for better visibility
        ctx.fillStyle = 'rgba(13, 17, 23, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle code-grid pattern
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        drawBricks();
        drawPaddle();
        drawBall();
        drawParticles();
        
        // Draw enhanced game info
        ctx.fillStyle = '#10b981';
        ctx.font = '18px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // Add glow effect to score
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.fillText(`Score: ${game.score}`, 20, 30);
        ctx.shadowBlur = 0;
        
        // Draw lives
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 8;
        ctx.fillText(`Lives: ${game.lives}`, 20, 60);
        ctx.shadowBlur = 0;
        
        // Draw controls hint
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillText('Controls: Mouse, Arrow Keys, WASD', 20, canvas.height - 30);
        
        // Update HUD if available
        updateGameHUD();
    }
    
    // Game state functions
    function startGame() {
        gameActive = true;
        addGameControls();
        
        // Update UI elements
        const gameOverlay = document.querySelector('.game-overlay');
        const gameHud = document.querySelector('.game-hud');
        const heroContent = document.querySelector('.hero-content');
        const nav = document.querySelector('.nav');
        
        if (gameOverlay) gameOverlay.style.display = 'flex';
        if (gameHud) gameHud.classList.add('active');
        if (heroContent) heroContent.style.filter = 'blur(5px)';
        if (nav) nav.style.filter = 'blur(5px)';
        
        // Enhanced canvas styling
        canvas.classList.add('active');
        canvas.style.opacity = '1';
        canvas.style.filter = 'blur(0px)';
        canvas.style.pointerEvents = 'auto';
        
        console.log('Game started successfully');
    }
    
    function stopGame() {
        gameActive = false;
        removeGameControls();
        
        // Update UI elements
        const gameOverlay = document.querySelector('.game-overlay');
        const gameHud = document.querySelector('.game-hud');
        const heroContent = document.querySelector('.hero-content');
        const nav = document.querySelector('.nav');
        
        if (gameOverlay) gameOverlay.style.display = 'none';
        if (gameHud) gameHud.classList.remove('active');
        if (heroContent) heroContent.style.filter = 'blur(0px)';
        if (nav) nav.style.filter = 'blur(0px)';
        
        // Reset canvas styling
        canvas.classList.remove('active');
        canvas.style.opacity = '0.3';
        canvas.style.filter = 'blur(2px)';
        canvas.style.pointerEvents = 'none';
        
        // Reset game state
        initGame();
        mouseInitialized = false;
        keys = {};
        
        console.log('Game stopped successfully');
    }
    
    // Game loop
    function gameLoop() {
        if (gameActive) {
            update();
        }
        render();
        requestAnimationFrame(gameLoop);
    }
    
    // HUD update function
    function updateGameHUD() {
        const hudScore = document.querySelector('.hud-score');
        const hudLives = document.querySelector('.hud-lives');
        const hudBricks = document.querySelector('.hud-bricks');
        
        if (hudScore) hudScore.textContent = game.score;
        if (hudLives) hudLives.textContent = game.lives;
        if (hudBricks) {
            const remainingBricks = game.bricks.filter(brick => brick.visible).length;
            hudBricks.textContent = remainingBricks;
        }
    }
    
    // Initialize game and start automatically
    initGame();
    gameLoop();
    
    // Auto-start the game after a brief delay
    setTimeout(() => {
        startGame();
        console.log('Game auto-started');
    }, 500);
    
    // Expose internal game control functions
    window.startBrickBreakerGameInternal = startGame;
    window.stopBrickBreakerGameInternal = stopGame;
    
    gameInstance = game;
    gameInitialized = true;
    console.log('Game initialized successfully');
}

// Utility functions
function downloadCV() {
    // Placeholder for CV download
    console.log('CV download functionality would be implemented here');
    alert('CV download feature coming soon!');
}

// Contact form handling (if needed)
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // This would typically send data to a server
    console.log('Contact form submitted:', {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    });
    
    alert('Thank you for your message! I\'ll get back to you soon.');
    event.target.reset();
}

// Smooth scrolling for all anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add scroll-based animations
const scrollHandler = throttle(function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero background elements
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
}, 16);

window.addEventListener('scroll', scrollHandler);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        document.getElementById('theme-toggle').click();
    }
    
    // Press 'F' to toggle font
    if (e.key === 'f' || e.key === 'F') {
        document.getElementById('font-toggle').click();
    }
    
    // Press 'Escape' to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Print debug info
    console.log('%c🚀 blue1x Portfolio Loaded', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%cKeyboard shortcuts:', 'color: #10b981; font-weight: bold;');
    console.log('%c  T - Toggle theme', 'color: #6b7280;');
    console.log('%c  F - Toggle font', 'color: #6b7280;');
    console.log('%c  ESC - Scroll to top', 'color: #6b7280;');
}

// Define functions outside the check so they're always available
console.log('Game functions defined and ready');