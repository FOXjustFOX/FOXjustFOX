var fox_enabled = false;
var fox_clicked_once = true;
var cannonActive = false;

// Initialize Repo List
async function init() {
    const app = document.getElementById('app');

    try {
        // Fetch the JSON file
        const response = await fetch('repos.json');

        if (!response.ok) {
            throw new Error(`Failed to load repos.json (${response.status})`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos) || repos.length === 0) {
            app.innerHTML = '<div>No repositories found in repos.json</div>';
            return;
        }

        // Render the list
        const ul = document.createElement('ul');

        repos.forEach(repo => {
            // Check for visible flag (default to true if not specified)
            if (repo.visible === false) return;

            const li = document.createElement('li');

            const a = document.createElement('a');
            a.href = repo.url;

            // Title
            const title = document.createElement('h3');
            title.textContent = repo.title;
            a.appendChild(title);

            // Description
            if (repo.description) {
                const desc = document.createElement('p');
                desc.textContent = repo.description;
                a.appendChild(desc);
            }

            li.appendChild(a);

            ul.appendChild(li);
        });

        app.innerHTML = '';
        app.appendChild(ul);


        // Add fox button as the last element
        const foxLi = document.createElement('li');
        foxLi.className = 'fox-button';
        foxLi.innerHTML = `<span>🦊</span>`;
        foxLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (fox_clicked_once) {
                if (window.spawnFox) window.spawnFox();
            }
            fox_clicked_once = false;
            fox_enabled = !fox_enabled;
        });
        ul.appendChild(foxLi);

    } catch (err) {
        console.error(err);
        app.innerHTML = `
            <div style="color: red;">
                <p>Error loading repositories.</p>
                <small>${err.message}</small>
            </div>
        `;
    }
}

// Fox Scheduling Logic
function scheduleNextFox() {
    // Random interval between 5-15 seconds (10s fixed in previous code)
    const delay = 10000;
    setTimeout(() => {
        // Don't spawn fox when barrel mode is active
        if (!cannonActive && fox_enabled && window.spawnFox) {
            window.spawnFox();
        }
        scheduleNextFox();
    }, delay);
}

// ========== CANNON LOGIC ==========
// Create cannon element
function createCannon() {
    const cannonContainer = document.createElement('div');
    cannonContainer.className = 'cannon-container';
    cannonContainer.id = 'cannon';
    cannonContainer.innerHTML = `<div class="barrel"></div>`;

    cannonContainer.addEventListener('click', toggleCannon);
    document.body.appendChild(cannonContainer);

    // Create invisible corner trigger zone
    const cornerTrigger = document.createElement('div');
    cornerTrigger.className = 'corner-trigger';
    cornerTrigger.id = 'corner-trigger';

    cornerTrigger.addEventListener('mouseenter', () => {
        if (!cannonActive) {
            cannonContainer.classList.add('peek');
        }
    });

    cornerTrigger.addEventListener('mouseleave', () => {
        if (!cannonActive) {
            cannonContainer.classList.remove('peek');
        }
    });

    document.body.appendChild(cornerTrigger);
}

function toggleCannon(e) {
    e.stopPropagation();
    cannonActive = !cannonActive;
    const cannon = document.getElementById('cannon');

    if (cannonActive) {
        cannon.classList.remove('peek');
        cannon.classList.add('active', 'visible');
        document.body.classList.add('cannon-mode');
    } else {
        cannon.classList.remove('active', 'visible');
        document.body.classList.remove('cannon-mode');
    }
}

// Fire cannonball
function fireCannonball(targetX, targetY, targetElement) {
    const cannon = document.getElementById('cannon');
    const cannonRect = cannon.getBoundingClientRect();

    // Start position (from cannon muzzle)
    const startX = cannonRect.left + 20;
    const startY = cannonRect.top - 10;

    // Create muzzle flash
    const flash = document.createElement('div');
    flash.className = 'muzzle-flash';
    flash.style.left = (startX - 20) + 'px';
    flash.style.top = (startY - 20) + 'px';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 150);

    // Create cannonball
    const ball = document.createElement('div');
    ball.className = 'cannonball';
    ball.style.left = startX + 'px';
    ball.style.top = startY + 'px';
    document.body.appendChild(ball);

    // Calculate flight duration based on distance
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = Math.min(500, Math.max(200, distance / 2));

    // Animate cannonball with arc
    const startTime = Date.now();
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Parabolic arc
        const arcHeight = -100 * Math.sin(progress * Math.PI);
        const currentX = startX + dx * progress;
        const currentY = startY + dy * progress + arcHeight;

        ball.style.left = currentX + 'px';
        ball.style.top = currentY + 'px';

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            ball.remove();
            createExplosion(targetX, targetY);
            destroyEntry(targetElement);
        }
    };

    requestAnimationFrame(animate);
}

// Create explosion effect
function createExplosion(x, y) {
    // Create explosion container
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';

    // Create particles
    const colors = ['#ff4500', '#ff6b00', '#ffa500', '#ffcc00', '#ff0000', '#333'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.width = (5 + Math.random() * 15) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = '0px';
        particle.style.top = '0px';

        explosion.appendChild(particle);
    }

    document.body.appendChild(explosion);
    setTimeout(() => explosion.remove(), 600);

    // Create smoke ring
    const smoke = document.createElement('div');
    smoke.className = 'smoke-ring';
    smoke.style.left = (x - 10) + 'px';
    smoke.style.top = (y - 10) + 'px';
    document.body.appendChild(smoke);
    setTimeout(() => smoke.remove(), 500);
}

// Destroy entry
function destroyEntry(element) {
    if (!element || element.classList.contains('destroying')) return;

    element.classList.add('destroying');

    setTimeout(() => {
        element.remove();
    }, 500);
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    init();
    createCannon();
    scheduleNextFox();

    // Handle clicks on entries when cannon is active
    document.addEventListener('click', (e) => {
        if (!cannonActive) return;

        // Find if we clicked on an entry (li element)
        let target = e.target;
        while (target && target !== document.body) {
            if (target.tagName === 'LI' && target.closest('#app')) {
                e.preventDefault();
                e.stopPropagation();

                const rect = target.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;

                fireCannonball(targetX, targetY, target);
                return;
            }
            target = target.parentElement;
        }
    }, true);
});
