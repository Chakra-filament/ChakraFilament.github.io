├── index.html
   ├── style.css
   ├── script.js
   └── img/


      document.addEventListener("DOMContentLoaded", function () {

  // SCROLL REVEAL
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal();


  // COUNTER ANIMATION
  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      const increment = target / 200;
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  // PARTICLES ANIMATION
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,120,0.5)";
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

});
