const state = {
  lastCampaign: null,
  run: 0
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const hooks = [
  "Most people do this backwards",
  "The simple version is usually the profitable version",
  "Before you buy another tool, fix this first",
  "This is how I would launch it if I needed cash flow quickly",
  "Stop planning the perfect funnel and publish the useful one"
];

const angles = [
  { label: "Proof-first", structure: "show the problem, show the cost, then show the next step" },
  { label: "Checklist", structure: "give a short checklist people can use today" },
  { label: "Comparison", structure: "compare the slow way against the faster practical way" },
  { label: "Mistake", structure: "name the common mistake and replace it with a smaller action" },
  { label: "Story", structure: "start with the stressful situation and lead to the useful fix" }
];

const ctas = [
  "Use the free studio, then grab the tool that fits your next step.",
  "Start with one campaign today and send traffic to one clear link.",
  "If this saves you time, use the recommended stack to build it faster.",
  "Turn the idea into a post, an email, and one monetized recommendation.",
  "Keep the path simple: useful content, disclosed link, email capture, offer."
];

const tools = [
  {
    name: "Bluehost",
    category: "Hosting",
    description: "Primary hosting recommendation for WordPress sites, landing pages, and affiliate resource pages.",
    url: "https://bluehost.sjv.io/c/3128380/1376228/11352",
    button: "Visit Bluehost"
  },
  {
    name: "MailerLite",
    category: "Email",
    description: "Use for lead magnets, newsletters, broadcasts, and affiliate follow-up sequences.",
    url: "https://bit.ly/gemautoresponder",
    button: "Try MailerLite"
  },
  {
    name: "AWeber",
    category: "Email",
    description: "Established autoresponder for newsletters, opt-in pages, and simple follow-up campaigns.",
    url: "https://bit.ly/awebert",
    button: "Try AWeber"
  },
  {
    name: "GroovePages",
    category: "Funnels",
    description: "Build opt-in pages, affiliate bridge pages, sales pages, and simple launch funnels.",
    url: "https://bit.ly/groovetools",
    button: "Open GroovePages"
  },
  {
    name: "LeadCreator",
    category: "Lead magnets",
    description: "Good fit for lead magnet, list-building, and funnel content.",
    url: "https://app.leadcreator.ai/q7tvx2vz06",
    button: "Open LeadCreator"
  },
  {
    name: "Descript",
    category: "Video",
    description: "Apply if you want a creator-tool affiliate path for captions, transcripts, clips, and faceless video.",
    url: "https://www.descript.com/affiliate",
    button: "Apply"
  },
  {
    name: "HostPapa",
    category: "Hosting",
    description: "Primary hosting card reserved for your approved HostPapa affiliate link.",
    url: "",
    button: "Add link"
  },
  {
    name: "Namecheap",
    category: "Domains",
    description: "Primary domain and hosting card reserved for your approved Namecheap affiliate link.",
    url: "",
    button: "Add link"
  }
];

const channelBuilders = {
  instagram(campaign) {
    return `INSTAGRAM CAROUSEL

Slide 1: ${campaign.hook}: ${campaign.topic}
Slide 2: The expensive problem: ${campaign.audience} wait too long to publish.
Slide 3: Use this structure: ${campaign.angle.structure}.
Slide 4: One post should lead to one next step, not five choices.
Slide 5: Recommended tool: ${recommendedTool(campaign)}.
Slide 6: Disclosure: this may include affiliate links.
Slide 7: CTA: ${campaign.cta}`;
  },
  tiktok(campaign) {
    return `TIKTOK / REELS SCRIPT

Hook: ${campaign.hook}.
Body: If you are working on ${campaign.topic}, the goal is not to create more random content. The goal is to create one useful asset that points to one next action.
Proof: ${campaign.sourceSummary}
CTA: ${campaign.cta}`;
  },
  youtube(campaign) {
    return `YOUTUBE SHORT OUTLINE

Title: ${campaign.topic}: the fastest useful launch path
0-3s: ${campaign.hook}
4-20s: Show the before state for ${campaign.audience}.
21-45s: Walk through ${campaign.angle.structure}.
46-58s: Mention the tool or product only after the useful step.
CTA: ${campaign.cta}`;
  },
  faceless(campaign) {
    return `FACELESS VIDEO PLAN

Voiceover: ${campaign.hook}. Here is the simple way to turn ${campaign.topic} into a money path without overbuilding.
Scenes:
1. Screen recording of the free studio.
2. Cursor highlights one generated post.
3. Show a checklist: content, affiliate link, email capture, product.
4. Show the recommended tool or $29 kit.
On-screen text: Useful content first. Monetized next step second.
CTA: ${campaign.cta}`;
  },
  email(campaign) {
    return `EMAIL

Subject: A simpler way to launch ${campaign.topic}

If you are a ${campaign.audience}, the slow part is usually not ideas. It is turning ideas into something publishable.

Try this:
1. Pick one topic.
2. Generate one short video, one email, and one recommendation.
3. Publish today.
4. Track clicks and replies.

Useful next step: ${recommendedTool(campaign)}.

Disclosure: some links may be affiliate links.

${campaign.cta}`;
  },
  blog(campaign) {
    return `BLOG OUTLINE

Headline: How to launch ${campaign.topic} without overbuilding

Sections:
1. Why unfinished products fail to earn
2. The ${campaign.angle.label.toLowerCase()} approach
3. The free tool to create traffic assets
4. Where affiliate recommendations fit honestly
5. When to offer the $29 kit
6. What to publish over the next seven days`;
  },
  linkedin(campaign) {
    return `LINKEDIN POST

${campaign.hook}.

Unfinished products do not make money because they are not connected to traffic and a clear next step.

For ${campaign.topic}, I would use this path:
- free useful tool
- one traffic asset per day
- one disclosed recommendation
- one low-ticket paid product

Today's angle: ${campaign.angle.structure}.

${campaign.cta}`;
  }
};

function pick(list, offset = 0) {
  return list[(state.run + offset) % list.length];
}

function getTopic() {
  const topic = document.querySelector("#topicSelect").value;
  if (topic === "Custom topic") {
    return document.querySelector("#customTopic").value.trim() || "online business launch";
  }
  return topic;
}

function buildCampaign() {
  state.run += 1;
  const topic = getTopic();
  const audience = document.querySelector("#audienceInput").value.trim() || "busy beginners";
  const goal = document.querySelector("#goalSelect").value;
  const source = document.querySelector("#sourceContent").value.trim();
  const channels = [...document.querySelectorAll("input[name='channels']:checked")].map((input) => input.value);
  const angle = pick(angles, channels.length);

  return {
    topic,
    audience,
    goal,
    channels: channels.length ? channels : ["instagram", "email"],
    angle,
    hook: pick(hooks, topic.length),
    cta: pick(ctas, audience.length),
    sourceSummary: source || `Use the free studio to create content for ${topic}, then connect the content to one monetized next step.`
  };
}

function recommendedTool(campaign) {
  const text = `${campaign.topic} ${campaign.goal}`.toLowerCase();
  if (/video|youtube|tiktok|faceless/.test(text)) return "Descript for editing, captions, and clips";
  if (/email|subscriber|lead/.test(text)) return "MailerLite or AWeber for follow-up";
  if (/site|blog|hosting|wordpress/.test(text)) return "Bluehost for the site foundation";
  if (/local|service|quote|review/.test(text)) return "AI Local Service Revenue Kit";
  return "the affiliate toolbox below";
}

function renderCampaign(campaign) {
  state.lastCampaign = campaign;
  document.querySelector("#briefTitle").textContent = `${campaign.topic} for ${campaign.audience}`;
  document.querySelector("#briefMoney").textContent = `${campaign.goal} through ${recommendedTool(campaign)}`;
  document.querySelector("#briefAngle").textContent = `${campaign.angle.label}: ${campaign.angle.structure}`;
  document.querySelector("#briefAction").textContent = `Publish ${campaign.channels.length} assets and point them to one clear next step.`;

  document.querySelector("#outputGrid").innerHTML = campaign.channels.map((channel) => {
    const content = channelBuilders[channel](campaign);
    return `
      <article class="output-card">
        <h3>${label(channel)}</h3>
        <pre id="output-${channel}">${escapeHtml(content)}</pre>
        <button class="button secondary copy-output" type="button" data-target="output-${channel}">Copy ${label(channel)}</button>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".copy-output").forEach((button) => {
    button.addEventListener("click", () => copyOutput(button));
  });

  renderCalendar(campaign);
}

function renderTools() {
  document.querySelector("#toolGrid").innerHTML = tools.map((tool) => {
    const hasUrl = Boolean(tool.url);
    return `
      <article class="tool-card">
        <span>${escapeHtml(tool.category)}</span>
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.description)}</p>
        <a class="button ${hasUrl ? "secondary" : "disabled"}" href="${hasUrl ? escapeHtml(tool.url) : "#"}" ${hasUrl ? 'target="_blank" rel="nofollow sponsored noopener noreferrer"' : 'aria-disabled="true"'}>${escapeHtml(tool.button)}</a>
      </article>
    `;
  }).join("");
}

function renderCalendar(campaign) {
  const days = [
    ["Day 1", `Publish the ${label(campaign.channels[0] || "instagram")} output and link to the free studio.`],
    ["Day 2", "Turn the same idea into an email with one disclosed recommendation."],
    ["Day 3", "Post a comparison or mistake angle and point to the $29 kit where relevant."],
    ["Day 4", "Add the best-performing hook to a short video description or pinned comment."],
    ["Day 5", "Send traffic to the tools section and measure affiliate clicks."],
    ["Day 6", "Republish the strongest angle with a new opening line."],
    ["Day 7", "Keep what got clicks, replies, or sales. Replace what did not."]
  ];

  document.querySelector("#calendarGrid").innerHTML = days.map(([day, task]) => `
    <article>
      <span>${day}</span>
      <p>${escapeHtml(task)}</p>
    </article>
  `).join("");
}

function updateCalculator() {
  const leads = Number(document.querySelector("#leads").value || 0);
  const jobValue = Number(document.querySelector("#jobValue").value || 0);
  const lift = Number(document.querySelector("#lift").value || 0) / 100;
  const recovered = leads * jobValue * lift;
  document.querySelector("#monthly").textContent = money.format(recovered);
  document.querySelector("#annual").textContent = money.format(recovered * 12);
  document.querySelector("#calcNote").textContent = `Based on recovering ${Math.round(lift * 100)}% of ${leads} missed or stale leads at ${money.format(jobValue)} per job.`;
}

function exportCampaign() {
  if (!state.lastCampaign) return;
  const parts = state.lastCampaign.channels.map((channel) => channelBuilders[channel](state.lastCampaign));
  const text = [`Journey to Online Success Campaign`, `Topic: ${state.lastCampaign.topic}`, "", ...parts].join("\n\n---\n\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.lastCampaign.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-campaign.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function copyOutput(button) {
  const target = document.querySelector(`#${button.dataset.target}`);
  navigator.clipboard.writeText(target.textContent.trim()).catch(() => {});
  const original = button.textContent;
  button.textContent = "Copied";
  setTimeout(() => {
    button.textContent = original;
  }, 1200);
}

function label(value) {
  const labels = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    faceless: "Faceless Video",
    email: "Email",
    blog: "Blog",
    linkedin: "LinkedIn"
  };
  return labels[value] || value;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

document.querySelector("#topicSelect").addEventListener("change", (event) => {
  document.querySelector("#customTopicWrap").classList.toggle("hidden", event.target.value !== "Custom topic");
});

document.querySelector("#campaignForm").addEventListener("submit", (event) => {
  event.preventDefault();
  renderCampaign(buildCampaign());
});

document.querySelector("#regenerateButton").addEventListener("click", () => renderCampaign(buildCampaign()));
document.querySelector("#exportButton").addEventListener("click", exportCampaign);
["#leads", "#jobValue", "#lift"].forEach((selector) => document.querySelector(selector).addEventListener("input", updateCalculator));

const paymentLink = new URLSearchParams(window.location.search).get("pay");
if (paymentLink) {
  document.querySelectorAll("[data-buy-link]").forEach((link) => {
    link.href = paymentLink;
  });
}

renderTools();
renderCampaign(buildCampaign());
updateCalculator();
