// Simple animated particles background
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

function createParticles(num) {
    particles = [];
    for (let i = 0; i < num; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 0.8,
            dy: (Math.random() - 0.5) * 0.8,
            color: Math.random() > 0.5 ? "#6f27ff" : "#437bff"
        });
    }
}
createParticles(60);

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
    });

    requestAnimationFrame(animate);
}
animate();
