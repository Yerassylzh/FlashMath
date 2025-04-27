const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(25, 55); // 🚀 Достаточно, чтобы разлететься до краёв
    this.angle = random(0, Math.PI * 2);
    this.radius = random(3, 7); // ✨ Меньше, чётче, но всё ещё заметны
    this.alpha = 1;
    this.gravity = 0.06;
    this.friction = 0.96; // Плавное замедление
    this.color = `hsl(${Math.floor(random(0, 360))}, 100%, 60%)`;
  }

  update() {
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= 0.004; // Мягкое исчезновение
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];

function launchFinalFirework() {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const count = 900; // 💥 Плотный и красивый взрыв

  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

launchFinalFirework();

function animate() {
  requestAnimationFrame(animate);
  // 🟢 Прозрачный фон — НЕ закрашиваем чёрным
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => p.update());
  particles.forEach((p) => p.draw());
  particles = particles.filter((p) => p.alpha > 0);
}

animate();
