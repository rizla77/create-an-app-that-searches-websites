const sourceLabels = {
  linkedin: "LinkedIn",
  indeed: "Indeed",
  google: "Google Jobs",
  remoteok: "Remote OK",
  remotive: "Remotive",
  arbeitnow: "Arbeitnow"
};

const skillCatalog = {
  automation: [
    "Automation pyramid, test selection, and maintainable test strategy",
    "Selectors, waits, fixtures, page objects, and test data design",
    "Playwright or Selenium fundamentals with one primary language",
    "API testing, contract basics, and service-level assertions",
    "CI/CD execution, reports, artifacts, retries, and flake analysis",
    "Framework architecture, coding standards, and review habits"
  ],
  qa: [
    "Risk-based testing, traceability, and acceptance criteria analysis",
    "Defect reporting, triage facilitation, and release readiness signals",
    "Exploratory testing charters and session notes",
    "Regression strategy and test case portfolio cleanup"
  ],
  data: [
    "SQL querying, joins, aggregations, and test data validation",
    "Data quality checks, ETL validation, and dashboard sanity testing",
    "Python notebooks or scripts for repeatable analysis"
  ],
  frontend: [
    "HTML, CSS, browser DevTools, network inspection, and accessibility checks",
    "JavaScript or TypeScript fundamentals",
    "Component testing and visual regression basics"
  ],
  backend: [
    "HTTP, REST, JSON, authentication, and common integration patterns",
    "Database basics and environment configuration",
    "Logging, observability, and failure-mode testing"
  ],
  cloud: [
    "Git, pull requests, branching, and code review workflows",
    "Docker fundamentals and environment parity",
    "Cloud CI runners, secrets, and deployment gates"
  ]
};

const feedSources = {
  remotive: async ({ role }) => {
    const response = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(role)}`);
    if (!response.ok) throw new Error("Remotive did not respond");
    const data = await response.json();
    return (data.jobs || []).map((job) => ({
      source: "Remotive",
      title: job.title,
      company: job.company_name || "Company not listed",
      location: job.candidate_required_location || "Remote",
      tags: [job.category, ...(job.tags || [])].filter(Boolean).slice(0, 5),
      url: normalizeUrl(job.url),
      description: stripHtml(job.description || "")
    }))
      .filter((job) => isActualJob(job) && matchesProfile(job, role))
      .slice(0, 8);
  },
  arbeitnow: async ({ role, location }) => {
    const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
    if (!response.ok) throw new Error("Arbeitnow did not respond");
    const data = await response.json();
    return (data.data || []).map((job) => ({
      source: "Arbeitnow",
      title: job.title,
      company: job.company_name || "Company not listed",
      location: job.location || location || "Location varies",
      tags: [job.job_types, job.remote ? "Remote" : ""].flat().filter(Boolean).slice(0, 5),
      url: normalizeUrl(job.url),
      description: stripHtml(job.description || "")
    }))
      .filter((job) => isActualJob(job) && matchesProfile(job, role))
      .slice(0, 8);
  }
};

const searchBuilders = {
  linkedin: ({ role, location, jobType, keywords }) => {
    const parts = [role, keywords, jobType === "any" ? "" : jobType].filter(Boolean).join(" ");
    return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(parts)}&location=${encodeURIComponent(location || "United States")}`;
  },
  indeed: ({ role, location, jobType, keywords }) => {
    const parts = [role, keywords, jobType === "any" ? "" : jobType].filter(Boolean).join(" ");
    return `https://www.indeed.com/jobs?q=${encodeURIComponent(parts)}&l=${encodeURIComponent(location || "")}`;
  },
  google: ({ role, location, jobType, keywords }) => {
    const parts = [role, keywords, jobType === "any" ? "" : jobType, "jobs", location].filter(Boolean).join(" ");
    return `https://www.google.com/search?q=${encodeURIComponent(parts)}&ibp=htl;jobs`;
  },
  remoteok: ({ role }) => `https://remoteok.com/remote-${encodeURIComponent(role.replace(/\s+/g, "-"))}-jobs`,
  remotive: ({ role }) => `https://remotive.com/remote-jobs/search?search=${encodeURIComponent(role)}`,
  arbeitnow: ({ role }) => `https://www.arbeitnow.com/jobs/remote/${encodeURIComponent(role.replace(/\s+/g, "-"))}`
};

const form = document.querySelector("#searchForm");
const statusPill = document.querySelector("#statusPill");
const jobResults = document.querySelector("#jobResults");
const planOutput = document.querySelector("#planOutput");
const copyPlanBtn = document.querySelector("#copyPlanBtn");
const resetBtn = document.querySelector("#resetBtn");
const jobTemplate = document.querySelector("#jobCardTemplate");
const searchLinks = document.querySelector("#searchLinks");
const searchLinkTemplate = document.querySelector("#searchLinkTemplate");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const profile = readProfile();
  statusPill.textContent = "Searching";
  renderLoading(profile);

  const { jobs, links } = await collectJobs(profile);
  renderJobs(jobs, profile);
  renderSearchLinks(links);
  renderPlan(profile, jobs);
  statusPill.textContent = `${jobs.length} direct jobs`;
});

resetBtn.addEventListener("click", () => {
  form.reset();
  document.querySelector("#roleInput").value = "automation framework";
  document.querySelector("#locationInput").value = "United States";
  document.querySelector("#keywordsInput").value = "Selenium, Playwright, JavaScript, CI/CD";
  document.querySelector("#targetYearsInput").value = "1";
  document.querySelector("#relatedYearsInput").value = "10";
  document.querySelector("#hoursInput").value = "8";
  document.querySelector("#experienceInput").value = "Manual QA lead with strong test planning, defect triage, exploratory testing, regression ownership, and stakeholder communication. Newer to automation frameworks.";
  statusPill.textContent = "Ready";
  jobResults.className = "job-results empty";
  jobResults.innerHTML = "<p>Run a search to see live postings with direct job URLs.</p>";
  searchLinks.innerHTML = "";
  planOutput.innerHTML = "<p>Your custom plan will appear here after the first search.</p>";
});

copyPlanBtn.addEventListener("click", async () => {
  const text = planOutput.innerText.trim();
  if (!text) return;
  await navigator.clipboard.writeText(text);
  copyPlanBtn.textContent = "Copied";
  setTimeout(() => {
    copyPlanBtn.textContent = "Copy plan";
  }, 1500);
});

function readProfile() {
  const data = new FormData(form);
  const selectedSources = data.getAll("sources");
  return {
    role: String(data.get("role") || "").trim(),
    location: String(data.get("location") || "").trim(),
    jobType: String(data.get("jobType") || "any"),
    keywords: String(data.get("keywords") || "").trim(),
    targetYears: Number(data.get("targetYears") || 0),
    relatedYears: Number(data.get("relatedYears") || 0),
    hours: Number(data.get("hours") || 8),
    experience: String(data.get("experience") || "").trim(),
    selectedSources: selectedSources.length ? selectedSources : ["remotive", "arbeitnow"]
  };
}

function renderLoading(profile) {
  jobResults.className = "job-results";
  jobResults.innerHTML = `<p>Checking live feeds for <strong>${escapeHtml(profile.role)}</strong>. Cards shown here open actual job posts.</p>`;
  searchLinks.innerHTML = "";
}

async function collectJobs(profile) {
  const links = profile.selectedSources
    .filter((source) => searchBuilders[source])
    .map((source) => ({
      source: sourceLabels[source],
      url: searchBuilders[source](profile)
    }));

  const liveFeedTasks = profile.selectedSources
    .filter((source) => feedSources[source])
    .map((source) => feedSources[source](profile).catch(() => []));

  const liveResults = (await Promise.all(liveFeedTasks)).flat();
  return {
    jobs: dedupeJobs(liveResults).slice(0, 14),
    links
  };
}

function dedupeJobs(jobs) {
  const seen = new Set();
  return jobs.filter((job) => {
    const key = `${job.source}|${job.title}|${job.company}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderJobs(jobs, profile) {
  jobResults.className = "job-results";
  jobResults.innerHTML = "";

  if (!jobs.length) {
    jobResults.className = "job-results empty";
    jobResults.innerHTML = `<p>No direct live postings loaded for <strong>${escapeHtml(profile.role)}</strong>. Use the search shortcuts below for sites that require their own search pages.</p>`;
    return;
  }

  jobs.forEach((job) => {
    const card = jobTemplate.content.cloneNode(true);
    card.querySelector(".job-source").textContent = job.source;
    card.querySelector("h3").textContent = job.title;
    card.querySelector(".job-meta").textContent = `${job.company} - ${job.location}`;
    card.querySelector(".job-tags").textContent = (job.tags || []).filter(Boolean).join(" - ");
    card.querySelector("a").href = job.url;
    jobResults.appendChild(card);
  });
}

function renderSearchLinks(links) {
  searchLinks.innerHTML = "";
  if (!links.length) return;

  const label = document.createElement("p");
  label.className = "search-links-label";
  label.textContent = "Search shortcuts";
  searchLinks.appendChild(label);

  links.forEach((link) => {
    const item = searchLinkTemplate.content.cloneNode(true);
    const anchor = item.querySelector("a");
    anchor.href = link.url;
    anchor.textContent = link.source;
    searchLinks.appendChild(item);
  });
}

function renderPlan(profile, jobs) {
  const level = getLevel(profile.targetYears, profile.relatedYears);
  const roleType = classifyRole(profile.role, profile.keywords);
  const skills = buildSkillList(roleType, profile);
  const weeks = estimateWeeks(level, profile.hours);
  const phases = buildPhases(level, roleType, skills, profile, weeks);
  const jobSignals = extractJobSignals(jobs, profile);

  planOutput.innerHTML = `
    <section class="plan-summary">
      ${metric("Level", level.label)}
      ${metric("Timeline", `${weeks} weeks`)}
      ${metric("Weekly pace", `${profile.hours} hrs/week`)}
      ${metric("Focus", roleType.title)}
    </section>

    <section class="checklist">
      <h3>Profile read</h3>
      <ul>
        <li>${escapeHtml(level.summary)}</li>
        <li>Use your ${profile.relatedYears} related years as proof of domain judgment, test design, release risk, and communication.</li>
        <li>Position the ${profile.targetYears} target-skill year as hands-on foundation work, then close gaps with visible projects.</li>
      </ul>
    </section>

    <section class="checklist">
      <h3>Common job signals to prepare for</h3>
      <ul>${jobSignals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join("")}</ul>
    </section>

    ${phases.map(renderPhase).join("")}

    <section class="checklist">
      <h3>Portfolio proof</h3>
      <ul>
        <li>Create one public repo with a clean README, installation steps, test examples, CI screenshots, and a short architecture note.</li>
        <li>Write three STAR stories: framework design decision, flaky test diagnosis, and release-risk call based on manual QA experience.</li>
        <li>Apply to roles where you meet roughly 60% or more of the posting; track missing skills and feed them back into this plan weekly.</li>
      </ul>
    </section>
  `;
}

function metric(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderPhase(phase) {
  return `
    <section class="phase">
      <h3>${escapeHtml(phase.title)}</h3>
      <p>${escapeHtml(phase.goal)}</p>
      <ul>${phase.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul>
    </section>
  `;
}

function getLevel(targetYears, relatedYears) {
  if (targetYears < 1 && relatedYears < 2) {
    return {
      label: "Entry foundation",
      summary: "You should build fundamentals first, then add job-specific projects before applying aggressively."
    };
  }
  if (targetYears < 2 && relatedYears >= 5) {
    return {
      label: "Bridge candidate",
      summary: "You have senior adjacent experience, so the plan should convert that judgment into target-skill proof quickly."
    };
  }
  if (targetYears < 3) {
    return {
      label: "Junior plus",
      summary: "You have enough exposure to deepen patterns, improve reliability, and show independent delivery."
    };
  }
  return {
    label: "Experienced",
    summary: "You should focus on architecture, scale, leadership signals, and advanced interview depth."
  };
}

function classifyRole(role, keywords) {
  const text = `${role} ${keywords}`.toLowerCase();
  if (/automation|selenium|playwright|cypress|qa|test/.test(text)) {
    return { key: "automation", title: "QA automation" };
  }
  if (/data|analyst|sql|etl|bi/.test(text)) {
    return { key: "data", title: "Data skills" };
  }
  if (/front|react|angular|vue|javascript|typescript/.test(text)) {
    return { key: "frontend", title: "Frontend engineering" };
  }
  if (/backend|api|java|python|node|server/.test(text)) {
    return { key: "backend", title: "Backend engineering" };
  }
  if (/cloud|devops|ci|cd|docker|aws|azure/.test(text)) {
    return { key: "cloud", title: "Cloud and delivery" };
  }
  return { key: "qa", title: "Role readiness" };
}

function buildSkillList(roleType, profile) {
  const base = skillCatalog[roleType.key] || skillCatalog.qa;
  const keywords = profile.keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
  return [...new Set([...keywords, ...base])];
}

function estimateWeeks(level, hours) {
  const base = {
    "Entry foundation": 18,
    "Bridge candidate": 12,
    "Junior plus": 10,
    "Experienced": 8
  }[level.label] || 12;
  if (hours >= 14) return Math.max(6, base - 3);
  if (hours <= 5) return base + 5;
  return base;
}

function buildPhases(level, roleType, skills, profile, weeks) {
  const third = Math.max(2, Math.round(weeks / 3));
  const roleExamples = {
    automation: [
      "Build a small framework with 8 UI tests, 6 API tests, fixtures, tags, and HTML reporting.",
      "Add CI execution, trace/video artifacts where supported, and a flake investigation checklist.",
      "Refactor one brittle flow into stable locators, explicit waits, and reusable page or screen objects."
    ],
    data: [
      "Create a SQL portfolio dataset with validation queries and documented assumptions.",
      "Automate one repeatable data-quality report.",
      "Practice explaining data anomalies and tradeoffs to a non-technical stakeholder."
    ],
    frontend: [
      "Build a small component app with forms, validation, state, and API loading states.",
      "Add unit and accessibility checks.",
      "Prepare explanations for rendering, state management, and browser debugging."
    ],
    backend: [
      "Build a small REST API with validation, persistence, auth assumptions, and tests.",
      "Add logging and error handling.",
      "Practice explaining API contracts, data modeling, and deployment tradeoffs."
    ],
    cloud: [
      "Create a CI pipeline that tests, reports, and gates merges.",
      "Containerize a sample app with environment configuration.",
      "Document rollback, secrets, and monitoring assumptions."
    ],
    qa: [
      "Convert a manual regression area into a prioritized automated or semi-automated suite.",
      "Create a risk matrix tied to business impact.",
      "Practice release-readiness storytelling."
    ]
  };

  return [
    {
      title: `Weeks 1-${third}: Close core gaps`,
      goal: `Build fluency in the highest-frequency skills for ${roleType.title}.`,
      tasks: [
        `Study and practice: ${skills.slice(0, 4).join("; ")}.`,
        "Spend the first hour each week reading 5 target job posts and updating your skill-gap notes.",
        "Turn your current experience summary into resume bullets that connect business risk to technical execution."
      ]
    },
    {
      title: `Weeks ${third + 1}-${third * 2}: Build proof`,
      goal: "Create portfolio evidence that hiring managers can inspect.",
      tasks: roleExamples[roleType.key] || roleExamples.qa
    },
    {
      title: `Weeks ${third * 2 + 1}-${weeks}: Interview and apply`,
      goal: "Move from learning mode into targeted applications and interview practice.",
      tasks: [
        `Apply to 6-10 ${profile.jobType === "any" ? "" : profile.jobType} roles per week that mention ${profile.role}.`.replace(/\s+/g, " ").trim(),
        "Practice one technical explanation and one behavioral story per day for 20 minutes.",
        "Run mock interviews using real job descriptions: explain tradeoffs, not just tool definitions.",
        "Refresh the plan every Sunday based on rejected postings, recruiter screens, and missing keywords."
      ]
    }
  ];
}

function extractJobSignals(jobs, profile) {
  const text = `${profile.role} ${profile.keywords} ${jobs.flatMap((job) => [job.title, ...(job.tags || [])]).join(" ")}`.toLowerCase();
  const signals = [];
  const checks = [
    [/playwright|selenium|cypress/, "UI automation tools and stable end-to-end test design"],
    [/api|rest|contract/, "API testing and service-level validation"],
    [/ci|cd|jenkins|github actions|gitlab/, "CI/CD execution, reports, and build troubleshooting"],
    [/javascript|typescript|java|python|c#/, "One implementation language used well enough to debug and refactor tests"],
    [/sql|database|data/, "SQL and test data setup or validation"],
    [/agile|scrum|jira/, "Agile delivery, ticket hygiene, and cross-functional communication"],
    [/lead|senior|mentor/, "Leadership examples: standards, coaching, quality strategy, and risk calls"]
  ];

  checks.forEach(([pattern, signal]) => {
    if (pattern.test(text)) signals.push(signal);
  });

  if (!signals.length) {
    signals.push("Role vocabulary, must-have tools, portfolio proof, and interview stories from selected job posts");
  }

  return signals.slice(0, 6);
}

function normalizeUrl(url) {
  if (!url) return "";
  const value = String(url).trim();
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `https://remoteok.com${value}`;
  return "";
}

function isActualJob(job) {
  return Boolean(job.title && job.company && job.url && /^https?:\/\//.test(job.url));
}

function matchesProfile(job, role) {
  const terms = String(role)
    .toLowerCase()
    .split(/[^a-z0-9+#]+/)
    .filter((term) => term.length > 2 && !["job", "jobs", "role", "with", "and", "the"].includes(term));

  if (!terms.length) return true;

  const haystack = [
    job.title,
    job.company,
    job.location,
    job.description,
    ...(job.tags || [])
  ].join(" ").toLowerCase();

  return terms.some((term) => haystack.includes(term));
}

function stripHtml(value) {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.requestSubmit();
