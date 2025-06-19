const experience = [
  {
    company: "TechNova",
    role: "Frontend Developer",
    duration: "2022–2024",
    startYear: 2022,
    endYear: 2024,
    skills: ["HTML", "CSS", "JavaScript", "Figma"],
    challenges: [
      "Redesigned UI using mobile-first principles",
      "Improved Lighthouse accessibility score by 30%",
      "Refactored code into reusable UI components"
    ]
  },
  {
    company: "DataPulse",
    role: "Intern",
    duration: "2021–2022",
    startYear: 2021,
    endYear: 2022,
    skills: ["Excel", "Data cleanup", "Communication"],
    challenges: [
      "Conducted user feedback sessions",
      "Created internal style guides and templates"
    ]
  },
  {
    company: "BlueLogic",
    role: "Junior Dev",
    duration: "2019–2021",
    startYear: 2019,
    endYear: 2021,
    skills: ["Git", "jQuery", "Teamwork"],
    challenges: [
      "Supported legacy platform migration",
      "Worked with QA team on release cycles"
    ]
  }
];

const tabList = document.getElementById('tab-list');
const tabContent = document.getElementById('tab-content');

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
