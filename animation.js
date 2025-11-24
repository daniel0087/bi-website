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
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 25 : 60;  // fewer particles on mobile

    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            color: Math.random() > 0.5 ? "#6f27ff" : "#437bff"
        });
    }
}
createParticles();

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
