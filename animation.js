// animation.js — Animation 6 (sway motion + 3D-ish linking lines)

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const container = document.getElementById("heroAnimation");
container.appendChild(canvas);

let particles = [];
let width, height;

function resize() {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

function createParticles() {
    const mobile = window.innerWidth < 768;
    const count = mobile ? 25 : 70;

    particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 1,         // depth
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.6,
            dy: (Math.random() - 0.5) * 0.6,
            color: "#6f27ff"
        });
    }
}
createParticles();

// Animation style #6
function updateParticle(p) {
    p.x += p.dx + Math.sin(p.y * 0.01);  // Animation 6 horizontal sway
    p.y += p.dy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw & move particles
    particles.forEach(p => {
        updateParticle(p);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r * (1 + p.z), 0, Math.PI * 2);
        ctx.fill();
    });

    // Connect lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];

            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 130) {
                ctx.strokeStyle = "rgba(120,120,255,0.2)";
                ctx.lineWidth = (1 - a.z) * 0.6;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();
