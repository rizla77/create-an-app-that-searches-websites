const state = {
  lastCampaign: null,
  run: 0
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const offerCatalog = {
  aiKit: {
    name: "AI Local Service Revenue Kit",
    category: "Digital product",
    defaultUrl: "product/AI-Local-Service-Revenue-Kit.md",
    bestFor: "local service owners who miss leads, quotes, and reviews",
    benefit: "recover more revenue from leads they already have",
    proofAsset: "missed-lead revenue calculator",
    objection: "I do not have time to set up a complicated system",
    disclosure: "Digital product recommendation. Results depend on execution and lead quality."
  },
  bluehost: {
    name: "Bluehost",
    category: "Hosting",
    defaultUrl: "https://bluehost.sjv.io/c/3128380/1376228/11352",
    bestFor: "beginners who need a site, blog, or landing page",
    benefit: "get a simple online home for their offer",
    proofAsset: "launch checklist for a first website",
    objection: "I do not know what to put on the website",
    disclosure: "Affiliate link. You may earn a commission at no extra cost to the buyer."
  },
  mailerlite: {
    name: "MailerLite",
    category: "Email",
    defaultUrl: "https://bit.ly/gemautoresponder",
    bestFor: "creators who need a list before they sell",
    benefit: "capture subscribers and send simple follow-up emails",
    proofAsset: "lead magnet signup flow",
    objection: "I do not have anything to send yet",
    disclosure: "Affiliate link. You may earn a commission at no extra cost to the buyer."
  },
  descript: {
    name: "Descript",
    category: "Video",
    defaultUrl: "https://www.descript.com/affiliate",
    bestFor: "faceless video creators and short-form content publishers",
    benefit: "edit clips, captions, transcripts, and screen recordings faster",
    proofAsset: "before-and-after short video edit",
    objection: "I do not want to be on camera",
    disclosure: "Affiliate program application or affiliate link when approved."
  },
  leadcreator: {
    name: "LeadCreator",
    category: "Lead magnets",
    defaultUrl: "https://app.leadcreator.ai/q7tvx2vz06",
    bestFor: "affiliate marketers who need a reason for visitors to opt in",
    benefit: "turn a topic into a lead magnet quickly",
    proofAsset: "finished PDF or checklist lead magnet",
    objection: "I do not know what freebie to make",
    disclosure: "Affiliate link. You may earn a commission at no extra cost to the buyer."
  }
};

const hooks = [
  "Most people do this backwards",
  "The simple version is usually the profitable version",
  "Before you buy another tool, fix this first",
  "This is how I would launch it if I needed cash flow quickly",
  "Stop planning the perfect funnel and publish the useful one",
  "You do not need a bigger idea; you need a clearer next step",
  "The fastest test is one useful post and one measurable link"
];

const angles = [
  { label: "Proof-first", structure: "show the problem, show the cost, then show the next step" },
  { label: "Checklist", structure: "give a short checklist people can use today" },
  { label: "Comparison", structure: "compare the slow way against the faster practical way" },
  { label: "Mistake", structure: "name the common mistake and replace it with a smaller action" },
  { label: "Story", structure: "start with the stressful situation and lead to the useful fix" },
  { label: "Calculator", structure: "estimate the cost of delay, then show a small fix" }
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

Post goal: Saveable teaching post that earns a profile visit.

Slide 1:
${campaign.hook}: ${campaign.topic}

Slide 2:
If you are ${campaign.audience}, the costly mistake is trying to build the full business before testing one offer.

Slide 3:
Use this 4-step launch test:
1. Pick one painful problem.
2. Publish one useful asset.
3. Send people to ${campaign.leadMagnet}.
4. Recommend ${campaign.offer.name} only when it solves the next step.

Slide 4:
Today's promise: ${campaign.promise}.

Slide 5:
Tool/product fit: ${campaign.offer.name} helps ${campaign.offer.bestFor} ${campaign.offer.benefit}.

Slide 6:
Action today: publish one short post, one email, and one direct CTA.

Slide 7:
CTA: Comment "PLAN" or visit ${campaign.destination}.

Caption:
The goal is not to look busy. The goal is to test whether people click, reply, save, or ask for the next step. ${campaign.offer.disclosure}

Hashtags:
${hashtags(campaign).join(" ")}`;
  },
  tiktok(campaign) {
    return `TIKTOK / REELS SCRIPT

Length: 35-45 seconds
Visual style: screen recording, checklist overlay, cursor highlights

0-3s Hook:
"${campaign.hook}."

4-10s Problem:
"If you are ${campaign.audience} working on ${campaign.topic}, you probably do not need another big plan. You need one offer test people can react to."

11-25s Steps:
"Here is the test: write one useful post, offer ${campaign.leadMagnet}, and send qualified people to ${campaign.offer.name}. The promise is simple: ${campaign.promise}."

26-36s Product fit:
"${campaign.offer.name} is useful because it helps ${campaign.offer.bestFor} ${campaign.offer.benefit}."

37-45s CTA:
"Want the exact launch path? Go to ${campaign.destination} and start with the first checklist."

On-screen text:
One topic -> one asset -> one lead magnet -> one offer

Pinned comment:
Start here: ${campaign.destination}

Disclosure:
${campaign.offer.disclosure}`;
  },
  youtube(campaign) {
    return `YOUTUBE SHORT + DESCRIPTION

Short title:
${campaign.topic}: one launch test you can run today

0-3s:
${campaign.hook}

4-12s:
Stop trying to launch everything at once. Pick one audience: ${campaign.audience}.

13-28s:
Make one asset that teaches ${campaign.promise}. Send people to ${campaign.leadMagnet}. Then recommend ${campaign.offer.name} only if it solves the next step.

29-45s:
Measure real signals: clicks, replies, saves, email signups, and product clicks.

CTA line:
Get the launch path here: ${campaign.destination}

Description:
If you are building around ${campaign.topic}, this is the simplest test I would run first. It connects a useful free asset to ${campaign.leadMagnet}, then to ${campaign.offer.name}.

Tags:
${hashtags(campaign).map((tag) => tag.replace("#", "")).join(", ")}`;
  },
  faceless(campaign) {
    return `FACELESS VIDEO PLAN

Video idea:
Screen-record the launch hub and show the exact path from idea to monetized asset.

Scene 1:
Dashboard view. Text overlay: "One useful campaign, not 30 random posts."

Scene 2:
Type the topic: ${campaign.topic}
Voiceover: "The audience is ${campaign.audience}, and the promise is ${campaign.promise}."

Scene 3:
Show generated assets.
Voiceover: "Now we have a short video, carousel, email, and follow-up plan."

Scene 4:
Show the offer.
Voiceover: "${campaign.offer.name} fits when the person needs to ${campaign.offer.benefit}."

Scene 5:
Show CTA.
Text overlay: "${campaign.leadMagnet} -> ${campaign.offer.name}"

B-roll prompts:
- Cursor selecting traffic channels
- Calculator/result panel
- Copy button interaction
- Product page or checkout preview

Description CTA:
Start here: ${campaign.destination}

Compliance:
${campaign.offer.disclosure}`;
  },
  email(campaign) {
    return `EMAIL CAMPAIGN

Subject option 1: A simpler way to launch ${campaign.topic}
Subject option 2: Do this before building the full funnel
Subject option 3: One useful campaign is enough to test demand

Email body:

Hey,

If you are ${campaign.audience}, the trap is trying to make everything perfect before anybody has clicked, replied, or joined your list.

Here is the smaller test:

1. Pick one topic: ${campaign.topic}.
2. Make one promise: ${campaign.promise}.
3. Give away one useful thing: ${campaign.leadMagnet}.
4. Point the right people to one next step: ${campaign.offer.name}.

Why this works:
You are not guessing whether people care. You are watching for real signals: replies, saves, clicks, opt-ins, and product interest.

If your next step is to ${campaign.offer.benefit}, start here:
${campaign.destination}

Note:
${campaign.offer.disclosure}

Talk soon,
Journey to Online Success`;
  },
  blog(campaign) {
    return `BLOG / LANDING PAGE OUTLINE

Headline:
How to launch ${campaign.topic} without overbuilding

Subheadline:
A practical path for ${campaign.audience} who want to ${campaign.promise}.

Section 1: The problem
Most people build pages, logos, funnels, and content calendars before testing whether anyone wants the next step.

Section 2: The one-campaign test
- One audience: ${campaign.audience}
- One promise: ${campaign.promise}
- One lead magnet: ${campaign.leadMagnet}
- One offer: ${campaign.offer.name}

Section 3: Why ${campaign.offer.name}
Use ${campaign.offer.name} when someone needs to ${campaign.offer.benefit}. It is most relevant for ${campaign.offer.bestFor}.

Section 4: Objection handling
Objection: "${campaign.offer.objection}"
Answer: Start with the smallest version. Use the checklist, publish one asset, and measure one link.

Section 5: CTA block
Primary CTA: Get ${campaign.leadMagnet}
Secondary CTA: Open ${campaign.offer.name}
Destination: ${campaign.destination}

Disclosure:
${campaign.offer.disclosure}`;
  },
  linkedin(campaign) {
    return `LINKEDIN POST

${campaign.hook}.

I would not launch ${campaign.topic} by building a full funnel first.

I would run one practical test:

1. Audience: ${campaign.audience}
2. Promise: ${campaign.promise}
3. Free asset: ${campaign.leadMagnet}
4. Next step: ${campaign.offer.name}

The question is not "does this look like a business?"

The question is:
- Did anyone save it?
- Did anyone click?
- Did anyone reply?
- Did anyone join the list?
- Did anyone ask for the next step?

${campaign.offer.name} fits when the buyer needs to ${campaign.offer.benefit}.

Start here: ${campaign.destination}

${campaign.offer.disclosure}`;
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
  const offerKey = document.querySelector("#offerSelect").value;
  const offer = offerCatalog[offerKey] || offerCatalog.aiKit;
  const destinationInput = document.querySelector("#destinationInput");
  const destination = destinationInput.value.trim() || offer.defaultUrl;
  const promise = document.querySelector("#promiseInput").value.trim() || `make progress with ${topic} today`;
  const leadMagnet = document.querySelector("#leadMagnetInput").value.trim() || "7-day launch plan";
  const channels = [...document.querySelectorAll("input[name='channels']:checked")].map((input) => input.value);
  const angle = pick(angles, channels.length + offer.name.length);
  const hook = pick(hooks, topic.length + audience.length);

  return {
    topic,
    audience,
    goal,
    channels: channels.length ? channels : ["instagram", "email"],
    angle,
    hook,
    offer,
    destination,
    promise,
    leadMagnet,
    sourceSummary: source || `Use one campaign to teach ${promise}, capture interest with ${leadMagnet}, and move qualified visitors to ${offer.name}.`
  };
}

function renderCampaign(campaign) {
  state.lastCampaign = campaign;
  document.querySelector("#briefTitle").textContent = `${campaign.topic} for ${campaign.audience}`;
  document.querySelector("#briefMoney").textContent = `${campaign.goal} through ${campaign.offer.name}`;
  document.querySelector("#briefAngle").textContent = `${campaign.angle.label}: ${campaign.angle.structure}`;
  document.querySelector("#briefAction").textContent = `Publish ${campaign.channels.length} assets, collect ${campaign.leadMagnet} leads, then send qualified clicks to ${campaign.offer.name}.`;
  document.querySelector("#primaryDestinationLink").href = campaign.destination;

  document.querySelector("#outputGrid").innerHTML = [
    renderSummaryCard(campaign),
    ...campaign.channels.map((channel) => renderOutputCard(channel, campaign)),
    renderChecklistCard(campaign)
  ].join("");

  document.querySelectorAll(".copy-output").forEach((button) => {
    button.addEventListener("click", () => copyOutput(button));
  });

  renderCalendar(campaign);
}

function renderSummaryCard(campaign) {
  const content = `CAMPAIGN BRIEF

Audience: ${campaign.audience}
Topic: ${campaign.topic}
Promise: ${campaign.promise}
Lead magnet: ${campaign.leadMagnet}
Offer: ${campaign.offer.name}
Destination: ${campaign.destination}
Primary proof asset: ${campaign.offer.proofAsset}
Main objection: ${campaign.offer.objection}
Disclosure: ${campaign.offer.disclosure}`;

  return outputCardHtml("Campaign Brief", "Brief", "Use this to keep every asset consistent.", "campaign-brief", content);
}

function renderOutputCard(channel, campaign) {
  const content = channelBuilders[channel](campaign);
  return outputCardHtml(label(channel), campaign.angle.label, channelDescription(channel), `output-${channel}`, content);
}

function renderChecklistCard(campaign) {
  const content = `LAUNCH CHECKLIST

Before publishing:
[ ] Replace destination link if needed: ${campaign.destination}
[ ] Confirm affiliate or product disclosure is visible.
[ ] Put ${campaign.leadMagnet} above the fold or in the first CTA.
[ ] Use one tracking tag for this campaign: ${slugify(campaign.topic)}-${slugify(campaign.offer.name)}

Publish order:
1. Publish ${label(campaign.channels[0] || "instagram")}.
2. Send the email version to your list or save it for new leads.
3. Post the faceless or short video version within 24 hours.
4. Add the offer link only after the useful step.

Measure:
- Link clicks to ${campaign.offer.name}
- Email signups for ${campaign.leadMagnet}
- Replies or comments asking for help
- Saves, shares, and watch time

Decision rule:
If you get clicks but no sales, improve the offer page.
If you get saves but no clicks, strengthen the CTA.
If you get no saves, change the hook.`;

  return outputCardHtml("Launch Checklist", "Action", "Use this before publishing the campaign.", "launch-checklist", content);
}

function outputCardHtml(title, badge, description, id, content) {
  return `
    <article class="output-card">
      <header>
        <div>
          <span class="output-badge">${escapeHtml(badge)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
        </div>
      </header>
      <pre id="${escapeHtml(id)}">${escapeHtml(content)}</pre>
      <button class="button secondary copy-output" type="button" data-target="${escapeHtml(id)}">Copy ${escapeHtml(title)}</button>
    </article>
  `;
}

function channelDescription(channel) {
  const descriptions = {
    instagram: "Carousel, caption, CTA, and hashtags.",
    tiktok: "Timed short-form script with visual direction.",
    youtube: "Short outline, description, and tags.",
    faceless: "Voiceover, scenes, B-roll prompts, and compliance note.",
    email: "Subject lines and full email body.",
    blog: "Landing page outline with CTA blocks.",
    linkedin: "Post copy built for replies and clicks."
  };
  return descriptions[channel] || "Campaign asset.";
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
    ["Day 1", `Publish the ${label(campaign.channels[0] || "instagram")} asset and send traffic to ${campaign.leadMagnet}.`],
    ["Day 2", `Send the email version and mention ${campaign.offer.name} only after the useful framework.`],
    ["Day 3", `Post the short video and pin this destination: ${campaign.destination}.`],
    ["Day 4", `Publish the objection-handling angle: "${campaign.offer.objection}".`],
    ["Day 5", "Review clicks, replies, saves, and signups. Keep the strongest hook."],
    ["Day 6", "Republish the strongest idea with a different opening line and thumbnail."],
    ["Day 7", `Write a recap post: what ${campaign.audience} clicked, asked, or ignored.`]
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
  const text = buildAllAssetsText(state.lastCampaign);
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(state.lastCampaign.topic)}-${slugify(state.lastCampaign.offer.name)}-campaign.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildAllAssetsText(campaign) {
  const channelText = campaign.channels.map((channel) => channelBuilders[channel](campaign));
  return [
    "Journey to Online Success Campaign",
    `Topic: ${campaign.topic}`,
    `Audience: ${campaign.audience}`,
    `Offer: ${campaign.offer.name}`,
    `Destination: ${campaign.destination}`,
    "",
    stripHtmlText(renderSummaryCard(campaign)),
    ...channelText,
    stripHtmlText(renderChecklistCard(campaign))
  ].join("\n\n---\n\n");
}

function copyAllAssets() {
  if (!state.lastCampaign) return;
  navigator.clipboard.writeText(buildAllAssetsText(state.lastCampaign)).catch(() => {});
  const button = document.querySelector("#copyAllButton");
  const original = button.textContent;
  button.textContent = "Copied all assets";
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
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

function syncOfferDefaults() {
  const offer = offerCatalog[document.querySelector("#offerSelect").value] || offerCatalog.aiKit;
  document.querySelector("#destinationInput").value = offer.defaultUrl;
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

function hashtags(campaign) {
  const terms = [
    campaign.topic,
    campaign.offer.category,
    "online business",
    "affiliate marketing",
    "digital product",
    "side hustle"
  ];
  return [...new Set(terms)]
    .map((term) => `#${slugify(term).replaceAll("-", "")}`)
    .slice(0, 8);
}

function slugify(value) {
  return String(value || "campaign")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "campaign";
}

function stripHtmlText(value) {
  const div = document.createElement("div");
  div.innerHTML = value;
  return div.textContent.replace(/\s+\n/g, "\n").trim();
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

document.querySelector("#offerSelect").addEventListener("change", syncOfferDefaults);

document.querySelector("#campaignForm").addEventListener("submit", (event) => {
  event.preventDefault();
  renderCampaign(buildCampaign());
});

document.querySelector("#regenerateButton").addEventListener("click", () => renderCampaign(buildCampaign()));
document.querySelector("#exportButton").addEventListener("click", exportCampaign);
document.querySelector("#copyAllButton").addEventListener("click", copyAllAssets);
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
