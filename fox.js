// Fox Runner Animation Shared Logic
function spawnFox() {
    const fox = document.createElement('div');
    fox.className = 'fox-runner';

    // Randomly pick a side: top, bottom, left, right
    const sides = ['top', 'bottom', 'left', 'right'];
    const side = sides[Math.floor(Math.random() * sides.length)];
    fox.classList.add(side);

    // Randomize direction (forward or reverse)
    if (Math.random() > 0.5) {
        fox.classList.add('reverse');
    }

    // Duration (keeping your setting of 6s)
    const baseDuration = 6;
    let currentDuration = baseDuration;
    let startTime = Date.now();
    let removeTimeout;

    fox.style.setProperty('--run-duration', `${currentDuration}s`);

    // Use the fox.gif image
    const img = document.createElement('img');
    img.src = 'fox.gif';
    img.alt = 'Running fox';
    fox.appendChild(img);

    // Click handler for speed boost using Web Animations API
    fox.addEventListener('click', (e) => {
        e.stopPropagation();

        // Get the running animation
        const animations = fox.getAnimations();
        if (animations.length > 0) {
            const anim = animations[0];

            // Boost speed to 3x for 0.5 seconds, then stay at 2x
            anim.playbackRate = 3;

            // Calculate remaining time at boosted speed
            const remainingTime = (anim.effect.getTiming().duration - anim.currentTime) / anim.playbackRate;

            // After 0.5s, reduce to 2x speed (still faster than normal)
            setTimeout(() => {
                if (animations.length > 0 && anim.playState === 'running') {
                    anim.playbackRate = 2;
                }
            }, 500);

            // Update the removal timeout
            clearTimeout(removeTimeout);
            const newRemainingTime = (anim.effect.getTiming().duration - anim.currentTime) / anim.playbackRate;
            removeTimeout = setTimeout(() => {
                fox.remove();
            }, newRemainingTime + 100);
        }
    });

    document.body.appendChild(fox);

    // Remove fox after animation completes
    removeTimeout = setTimeout(() => {
        fox.remove();
    }, currentDuration * 1000 + 100);
}

// Make globally available
window.spawnFox = spawnFox;
