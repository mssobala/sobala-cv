async function loadLanguage(lang) {
  const response = await fetch(`/lang/${lang}.json`);
  const data = await response.json();

  const t = data.text;

  const mapText = [
    "name",
    "title",
    "profile",
    "dob",
    "phone",
    "email",
    "linkedin",
    "driving_license",
    "website",
    "section_profile",
    "section_languages",
    "section_key_competencies",
    "section_certificates",
    "section_strengths",
    "section_interests",
    "section_experience",
    "section_clause",
    "clause"
  ];

  mapText.forEach((key) => {
    const el = document.querySelector(`[data-i18n='${key}']`);
    if (el && t[key]) el.textContent = t[key];
  });

  const languagesList = document.getElementById("languages-list");
  languagesList.innerHTML = data.languages
    .map((l) => `<li>${l}</li>`)
    .join("");

  const compList = document.getElementById("competencies-list");
  compList.innerHTML = data.key_competencies
    .map((c) => `<li>${c}</li>`)
    .join("");

  const certList = document.getElementById("certificates-list");
  certList.innerHTML = data.certificates
    .map(
      (c) =>
        `<li><strong>${c.date}</strong> — ${c.name} (${c.provider})</li>`
    )
    .join("");

  const strengthsList = document.getElementById("strengths-list");
  strengthsList.innerHTML = data.strengths
    .map((s) => `<li>${s}</li>`)
    .join("");

  const interestsList = document.getElementById("interests-list");
  interestsList.innerHTML = data.interests
    .map((i) => `<li>${i}</li>`)
    .join("");

  const expContainer = document.getElementById("experience");
  expContainer.innerHTML = data.experience
    .map((exp) => {
      const subroles = exp.subroles
        ? exp.subroles
            .map(
              (sr) => `
          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">${sr.title}</div>
              <div class="exp-meta">${sr.location} | ${sr.dates}</div>
            </div>
            <ul>
              ${sr.points.map((p) => `<li>${p}</li>`).join("")}
            </ul>
          </div>`
            )
            .join("")
        : "";

      const mainBlock = exp.points
        ? `
        <div class="exp-item">
          <div class="exp-header">
            <div class="exp-title">${exp.title}</div>
            <div class="exp-meta">${exp.location} | ${exp.dates}</div>
          </div>
          <ul>
            ${exp.points.map((p) => `<li>${p}</li>`).join("")}
          </ul>
        </div>`
        : `
        <div class="exp-item">
          <div class="exp-header">
            <div class="exp-title">${exp.title}</div>
            <div class="exp-meta">${exp.location} | ${exp.dates}</div>
          </div>
        </div>`;

      return mainBlock + subroles;
    })
    .join("");

  document.getElementById("download-pl").textContent =
    data.download.pl.label;
  document.getElementById("download-pl").href = data.download.pl.file;

  document.getElementById("download-en").textContent =
    data.download.en.label;
  document.getElementById("download-en").href = data.download.en.file;
}

document.getElementById("lang-pl").addEventListener("click", () =>
  loadLanguage("pl")
);
document.getElementById("lang-en").addEventListener("click", () =>
  loadLanguage("en")
);

loadLanguage("en");