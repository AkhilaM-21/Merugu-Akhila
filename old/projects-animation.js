/*
  Unified Particle Animation System for Portfolio Projects
  - Manages particle transitions between multiple shapes based on scroll position.
*/
window.particleAnimator = (function() {
    const PARTICLE_COLOR = '#F4D6F5';
    // This script will now control BOTH canvases, but we only need to find one to start.
    const firstCanvas = document.getElementById('particle-canvas'); // Used for checks

    const stcCanvas = document.getElementById('particle-canvas');
    const agriCanvas = document.getElementById('agri-canvas');
    const stcCtx = stcCanvas.getContext('2d', { alpha: true });
    const agriCtx = agriCanvas.getContext('2d', { alpha: true });

    let W, H;
    let laptopTargets = [], chipTargets = [];
    let particles = [];
    let animationFrameId;
    let currentScrollRatio = 0;
    let textAlpha = 0;
    let formationProgress = 0;
    // --- Shape 1: Laptop ---
    function buildLaptopShape(width, height) {
        const off = document.createElement('canvas');
        const drawWidth = Math.min(width * 0.7, 520);
        const drawHeight = drawWidth * 0.6;
        const baseExtra = drawWidth * 0.28;
        const offW = Math.ceil(drawWidth + 60);
        const offH = Math.ceil(drawHeight + baseExtra + 60);
        off.width = offW; off.height = offH;
        const o = off.getContext('2d');
        o.fillStyle = PARTICLE_COLOR;
        const centerX = offW / 2, topY = 20;
        const screenW = drawWidth * 0.98, screenH = drawHeight * 0.78;
        const screenX = centerX - screenW / 2, screenY = topY + 6;
        roundRect(o, screenX, screenY, screenW, screenH, Math.max(6, drawWidth * 0.02));
        o.fill();
        const innerPad = Math.max(6, drawWidth * 0.03);
        o.fillRect(screenX + innerPad, screenY + innerPad, screenW - innerPad * 2, screenH - innerPad * 2);
        const baseTopW = screenW * 0.96, baseTopX = centerX - baseTopW / 2, baseTopY = screenY + screenH + 6;
        const baseBottomW = baseTopW + drawWidth * 0.18, baseBottomX = centerX - baseBottomW / 2, baseBottomY = baseTopY + baseExtra;
        o.beginPath(); o.moveTo(baseTopX, baseTopY); o.lineTo(baseTopX + baseTopW, baseTopY); o.lineTo(baseBottomX + baseBottomW, baseBottomY); o.lineTo(baseBottomX, baseBottomY); o.closePath(); o.fill();
        const keysCols = 10, keysRows = 3;
        const kpadX = baseTopX + baseTopW * 0.06, kpadY = baseTopY + (baseExtra * 0.12);
        const kpadW = baseTopW * 0.88, kpadH = (baseBottomY - baseTopY) * 0.5;
        const keyW = (kpadW / keysCols) * 0.6, keyH = (kpadH / keysRows) * 0.55;
        for (let r = 0; r < keysRows; r++) { for (let c = 0; c < keysCols; c++) { o.clearRect(kpadX + (c * (kpadW / keysCols)) + ((kpadW / keysCols - keyW) / 2), kpadY + (r * (kpadH / keysRows)) + ((kpadH / keysRows - keyH) / 2), keyW, keyH); } }
        const padW = baseTopW * 0.26, padH = (baseBottomY - baseTopY) * 0.18;
        o.clearRect(centerX - padW / 2, baseBottomY - padH - baseExtra * 0.07, padW, padH);
        o.fillRect(centerX - screenW * 0.45, baseTopY - 6, screenW * 0.9, 4);

        const img = o.getImageData(0, 0, offW, offH).data;
        const targets = [];
        for (let y = 0; y < offH; y += 4) {
            for (let x = 0; x < offW; x += 4) {
                if (img[(y * offW + x) * 4 + 3] > 128) {
                    targets.push({ x: (width / 2) - offW / 2 + x, y: (height / 2) - offH / 2 + y });
                }
            }
        }
        return targets;
    }

    // --- Shape 2: Agri Chip ---
    function buildChipShape(width, height) {
        const off = document.createElement('canvas');
        const s = Math.min(width * 0.7, 420);
        off.width = off.height = s;
        const o = off.getContext('2d');
        const cx = s / 2, cy = s / 2;
        const chip = s * 0.6, pin = s * 0.08, pinT = s * 0.025;
        o.fillStyle = PARTICLE_COLOR;
        roundRect(o, cx - chip / 2, cy - chip / 2, chip, chip, chip * 0.1);
        o.fill();
        for (let i = 0; i < 6; i++) {
            const offx = (-chip / 2) + (i + 0.5) * (chip / 6);
            o.fillRect(cx + offx - pinT / 2, cy - chip / 2 - pin, pinT, pin); o.fillRect(cx + offx - pinT / 2, cy + chip / 2, pinT, pin);
            o.fillRect(cx - chip / 2 - pin, cy + offx - pinT / 2, pin, pinT); o.fillRect(cx + chip / 2, cy + offx - pinT / 2, pin, pinT);
        }
        const inner = chip * 0.68;
        o.clearRect(cx - inner / 2, cy - inner / 2, inner, inner);
        const scx = cx, scy = cy + inner * 0.1;
        o.lineWidth = s * 0.05; o.lineCap = "round"; o.strokeStyle = PARTICLE_COLOR; o.fillStyle = PARTICLE_COLOR;
        o.beginPath(); o.moveTo(scx - inner * 0.3, scy); o.quadraticCurveTo(scx, scy - inner * 0.08, scx + inner * 0.3, scy); o.stroke();
        o.beginPath(); o.moveTo(scx, scy); o.lineTo(scx, scy - inner * 0.3); o.stroke();
        o.beginPath(); o.moveTo(scx, scy - inner * 0.3); o.quadraticCurveTo(scx - inner * 0.18, scy - inner * 0.38, scx - inner * 0.15, scy - inner * 0.22); o.quadraticCurveTo(scx - inner * 0.1, scy - inner * 0.28, scx, scy - inner * 0.3); o.closePath(); o.fill();
        o.beginPath(); o.moveTo(scx, scy - inner * 0.3); o.quadraticCurveTo(scx + inner * 0.18, scy - inner * 0.38, scx + inner * 0.15, scy - inner * 0.22); o.quadraticCurveTo(scx + inner * 0.1, scy - inner * 0.28, scx, scy - inner * 0.3); o.closePath(); o.fill();

        const img = o.getImageData(0, 0, s, s).data;
        const targets = [];
        for (let y = 0; y < s; y += 4) {
            for (let x = 0; x < s; x += 4) {
                if (img[(y * s + x) * 4 + 3] > 128) {
                    targets.push({ x: width / 2 - s / 2 + x, y: height / 2 - s / 2 + y });
                }
            }
        }
        return targets;
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
    }

    function init() {
        if (!stcCanvas || !agriCanvas) return;

        const parent = stcCanvas.parentElement;
        if (!parent) return;
        W = stcCanvas.width = agriCanvas.width = parent.clientWidth;
        H = stcCanvas.height = agriCanvas.height = parent.clientHeight;

        laptopTargets = buildLaptopShape(W, H);
        chipTargets = buildChipShape(W, H);
        
        const maxPoints = Math.max(laptopTargets.length, chipTargets.length);
        shuffle(laptopTargets);
        shuffle(chipTargets);

        particles = [];
        const stcProjectRow = stcCanvas.closest('.row');
        const agriProjectRow = agriCanvas.closest('.row');
        if (!stcProjectRow || !agriProjectRow) return;

        for (let i = 0; i < maxPoints; i++) {
            const fromLeft = Math.random() > 0.5;
            const sx = fromLeft ? -30 - Math.random() * W * 0.25 : W + 30 + Math.random() * W * 0.25;
            const sy = Math.random() * H;

            // Initial target positions for particles, relative to their respective canvas's parent row.
            // We need to store the absolute Y position in the scrollable container for correct interpolation.
            const laptopTarget = laptopTargets[i % laptopTargets.length];
            const chipTarget = chipTargets[i % chipTargets.length];

            particles.push({
                x: sx, y: sy,
                ox: sx, oy: sy,
                size: 1.4 + Math.random() * 0.8,
                delay: Math.random() * 500,
                target1: { x: laptopTarget.x, y: laptopTarget.y + stcProjectRow.offsetTop }, // Absolute Y for laptop
                target2: { x: chipTarget.x, y: chipTarget.y + agriProjectRow.offsetTop },   // Absolute Y for chip
            });
        }

        const scrollContainer = document.querySelector('.tab-content');
        // Ensure only one scroll listener is attached
        // Remove any existing listener to prevent duplicates on re-init
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true }); // Use passive for better performance

        // Initial call to set positions correctly before any scrolling
        handleScroll({ target: document.querySelector('.tab-content') });
        
        window.addEventListener('resize', handleResize);

        animate();
        console.log("Particle animation initialized.");
    }

    function handleScroll(e) {        
        const container = e.target;
        const stcProject = stcCanvas.closest('.row');
        const agriProject = agriCanvas.closest('.row');
        if (!stcProject || !agriProject) return;

        const stcTop = stcProject.offsetTop;
        const stcHeight = stcProject.clientHeight;
        const viewHeight = container.clientHeight;
        const scrollTop = container.scrollTop;

        // Calculate transition progress between the two shapes
        const transitionStartPoint = stcTop;
        const transitionEndPoint = agriProject.offsetTop - viewHeight / 2;
        const transitionDuration = transitionEndPoint - transitionStartPoint;
        let ratio = (scrollTop - transitionStartPoint) / transitionDuration;
        currentScrollRatio = Math.max(0, Math.min(1, ratio));

        // Calculate formation progress based on the visibility of the STC project container.
        // formationProgress = 0 means fully formed, 1 means fully dispersed.
        const stcBottom = stcTop + stcHeight;
        const viewTop = scrollTop;
        const viewBottom = scrollTop + viewHeight;

        const visibleTop = Math.max(stcTop, viewTop);
        const visibleBottom = Math.min(stcBottom, viewBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityRatio = visibleHeight / stcHeight;
        formationProgress = 1 - visibilityRatio;
    }

    function drawPortalText(alpha) {
        if (!laptopTargets.length) return;

        // Calculate the bounding box of the laptop screen from the particle targets
        let ys = laptopTargets.map(t => t.y), minY = Math.min(...ys), maxY = Math.max(...ys);
        let xs = laptopTargets.map(t => t.x), minX = Math.min(...xs), maxX = Math.max(...xs);

        const totalH = maxY - minY;
        const screenTop = minY + totalH * 0.02;
        const screenBottom = minY + totalH * 0.55;
        const screenCenterX = (minX + maxX) / 2;
        const screenCenterY = screenTop + (screenBottom - screenTop) / 2;

        const fontSize = Math.max(14, Math.round(Math.min(W, 520) * 0.03));
        stcCtx.save();
        stcCtx.globalAlpha = alpha;
        stcCtx.fillStyle = 'plum';
        stcCtx.textAlign = 'center';
        stcCtx.textBaseline = 'middle';
        stcCtx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial`;
        stcCtx.fillText('STC Employee Portal', screenCenterX, screenCenterY);
        stcCtx.restore();
    }

    let lastTime = 0;
    function animate(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;

        const stcProjectRow = stcCanvas.closest('.row');
        const agriProjectRow = agriCanvas.closest('.row');
        if (!stcProjectRow || !agriProjectRow) {
            cancelAnimationFrame(animationFrameId);
            return;
        }

        for (const p of particles) {
            // Calculate the absolute target Y position in the scrollable world
            // The target Ys are already absolute in the particle object now.
            const worldTargetY_stc = p.target1.y;
            const worldTargetY_agri = p.target2.y;
            
            let targetX, targetY;

            // The formation logic should only apply when we are not yet transitioning to the next shape.
            if (currentScrollRatio <= 0) {
                // In formation/de-formation phase
                const formationTargetX = p.target1.x;
                const formationTargetY = worldTargetY_stc;

                // Interpolate between original off-screen position and first target shape
                targetX = p.ox + (formationTargetX - p.ox) * (1 - formationProgress);
                targetY = p.oy + (formationTargetY - p.oy) * (1 - formationProgress);
            } else {
                // In transition phase (scrolling between shapes)
                targetX = p.target1.x + (p.target2.x - p.target1.x) * currentScrollRatio;
                targetY = p.target1.y + (p.target2.y - p.target1.y) * currentScrollRatio;
            }

            // Smoothly move particles towards their target
            // This is a simple easing function. You could use a more complex one if needed.
            p.x += (targetX - p.x) * 0.1;
            p.y += (targetY - p.y) * 0.1;
        }

        stcCtx.clearRect(0, 0, W, H);
        agriCtx.clearRect(0, 0, W, H);

        // Calculate text alpha based on formation and transition state
        // Text should be visible when laptop is formed (formationProgress is low)
        // and we are not transitioning to the next shape (currentScrollRatio is 0).
        if (formationProgress < 0.1 && currentScrollRatio <= 0) {
            textAlpha = Math.min(1, textAlpha + 0.05);
        } else {
            textAlpha = Math.max(0, textAlpha - 0.05);
        }


        for (const p of particles) {
            // Draw the particle on the first (STC/laptop) canvas by translating its absolute Y position
            // into the local coordinate system of that canvas.
            stcCtx.beginPath();
            stcCtx.fillStyle = PARTICLE_COLOR;
            stcCtx.arc(p.x, p.y - stcProjectRow.offsetTop, p.size, 0, Math.PI * 2);
            stcCtx.fill();

            // Also draw the particle on the second (Agri/chip) canvas by translating its absolute Y
            // into that canvas's local coordinate system.
            agriCtx.beginPath();
            agriCtx.fillStyle = PARTICLE_COLOR;
            agriCtx.arc(p.x, p.y - agriProjectRow.offsetTop, p.size, 0, Math.PI * 2);
            agriCtx.fill();
        }

        if (textAlpha > 0.01) {
            drawPortalText(textAlpha);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    let resizeTimeout;    
    function handleResize() {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => { init(); }, 250);
    }

    function destroy() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        const scrollContainer = document.querySelector('.tab-content');
        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        particles = []; // Clear particles array
        console.log("Particle animation destroyed.");
    }

    // Expose public methods
    return {
        init: init,
        destroy: destroy
    };
})();