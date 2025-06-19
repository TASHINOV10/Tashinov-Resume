fetch('data/experience.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(experience => {
    const tabList = document.getElementById('tab-list');
    const tabContent = document.getElementById('tab-content');

    // Count experience years
    const expYears = new Set();
    experience.forEach(job => {
      for (let y = job.startYear; y <= job.endYear; y++) {
        expYears.add(y);
      }
    });

    const animateCounter = (id, finalValue, suffix = '') => {
      let count = 0;
      const speed = 40;
      const el = document.getElementById(id);
      const step = Math.ceil(finalValue / 20);
      const interval = setInterval(() => {
        count += step;
        if (count >= finalValue) {
          count = finalValue;
          clearInterval(interval);
        }
        el.textContent = count + suffix;
      }, speed);
    };

    animateCounter('exp-count', expYears.size);
    animateCounter('emp-count', experience.length);

    setTimeout(() => {
      document.getElementById('exp-label').textContent = 'Years of Experience';
      document.getElementById('emp-label').textContent = 'Employers';
    }, 1200);

    // Generate tabs and content
    experience.forEach((job, index) => {
      const tab = document.createElement('button');
      tab.textContent = job.company;
      tab.classList.add('tab');
      if (index === 0) tab.classList.add('active');
      tabList.appendChild(tab);

      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabContent.innerHTML = `
          <h2>${job.company} – <em>${job.role}</em></h2>
          <p><strong>Duration:</strong> ${job.duration}</p>
          <p><strong>Skills:</strong> ${job.skills.join(', ')}</p>
          <p><strong>Challenges:</strong></p>
          <ul>
            ${job.challenges.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
      });

      if (index === 0) tab.click();
    });
  })
  .catch(error => {
    console.error('Failed to load experience data:', error);
    document.getElementById('tab-content').innerHTML = `<p style="color: red;">Failed to load experience information.</p>`;
  });
