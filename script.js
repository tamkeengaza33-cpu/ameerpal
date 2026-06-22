const cards = document.querySelectorAll('.service-card, .project-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 22px 60px rgba(0,0,0,0.28)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
  });
});
