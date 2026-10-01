(() => {
  const profile = window.PROFILE;
  if (!profile) return;

  const $ = (id) => document.getElementById(id);

  const link = (href, label, extra = "") =>
    `<a href="${href}" ${extra}>${label}</a>`;

  $("hero-eyebrow").textContent = `${profile.role} · ${profile.university}`;
  $("hero-name").textContent = profile.name;
  $("hero-tagline").textContent = profile.tagline;
  $("hero-meta").textContent = `${profile.location} · ${profile.graduation} · CGPA ${profile.cgpa}`;
  $("hero-availability").textContent = profile.availability;
  $("about-copy").textContent = profile.summary;
  $("footer-copy").textContent = `© ${new Date().getFullYear()} ${profile.name}`;

  $("hero-actions").innerHTML = [
    link("#projects", "View projects", 'class="btn btn-primary"'),
    link("#contact", "Contact", 'class="btn btn-ghost"'),
    link(profile.contact.github, "GitHub", 'class="btn btn-ghost" target="_blank" rel="noopener noreferrer"'),
  ].join("");

  $("quick-links").innerHTML = [
    `<li>${link(profile.contact.email.includes("@") ? `mailto:${profile.contact.email}` : profile.contact.email, profile.contact.email)}</li>`,
    `<li>${link(profile.contact.phoneHref, profile.contact.phone)}</li>`,
    `<li>${link(profile.contact.linkedin, "LinkedIn", 'target="_blank" rel="noopener noreferrer"')}</li>`,
    `<li>${link(profile.contact.github, "GitHub", 'target="_blank" rel="noopener noreferrer"')}</li>`,
  ].join("");

  $("now-list").innerHTML = profile.now.map((item) => `<li>${item}</li>`).join("");

  $("projects-grid").innerHTML = profile.projects
    .map(
      (project) => `
      <article class="project-card">
        <header>
          <p class="card-year">${project.year}</p>
          <h3>${project.title}</h3>
          <p class="card-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</p>
        </header>
        <p>${project.summary}</p>
        <ul>${project.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  const renderRoles = (items) =>
    items
      .map(
        (item) => `
      <article class="timeline-item">
        <p class="when">${item.period}${item.type ? ` · ${item.type}` : ""}</p>
        <h3>${item.title}</h3>
        <p class="org">${item.org}</p>
        ${item.bullets ? `<ul>${item.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
      </article>`
      )
      .join("");

  $("experience-list").innerHTML = renderRoles(profile.experience);

  const internships = $("internships-block");
  if (!profile.internships.length) {
    internships.hidden = false;
  } else {
    internships.hidden = false;
    internships.innerHTML = `<h3>Internships</h3>${renderRoles(profile.internships)}`;
  }

  $("skills-grid").innerHTML = Object.entries(profile.skills)
    .map(
      ([group, items]) => `
      <div class="skill-group">
        <h3>${group}</h3>
        <p>${items.join(" · ")}</p>
      </div>`
    )
    .join("");

  $("education-list").innerHTML = profile.education
    .map(
      (item) => `
      <article class="timeline-item">
        <p class="when">${item.period}</p>
        <h3>${item.title}</h3>
        <p class="org">${item.org}</p>
        <p>${item.detail}</p>
      </article>`
    )
    .join("");

  $("cert-list").innerHTML = profile.certifications
    .map(
      (item) => `
      <li>
        <strong>${item.title}</strong>
        <span>${item.issuer} · ${item.year}</span>
      </li>`
    )
    .join("");

  $("activity-list").innerHTML = profile.activities.map((item) => `<li>${item}</li>`).join("");

  $("contact-actions").innerHTML = [
    link(`mailto:${profile.contact.email}`, "Email me", 'class="btn btn-primary"'),
    link(profile.contact.linkedin, "LinkedIn", 'class="btn btn-ghost" target="_blank" rel="noopener noreferrer"'),
    link(profile.contact.github, "GitHub", 'class="btn btn-ghost" target="_blank" rel="noopener noreferrer"'),
  ].join("");

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-list a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;

  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
})();
