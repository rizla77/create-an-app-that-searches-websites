(function () {
  const root = document.querySelector(".jtos-launch-hub");
  if (!root) return;

  const state = { lastCampaign: null, run: 0 };
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
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
    ["Bluehost", "Hosting", "Primary hosting recommendation for WordPress sites, landing pages, and affiliate resource pages.", "https://bluehost.sjv.io/c/3128380/1376228/11352", "Visit Bluehost"],
    ["MailerLite", "Email", "Use for lead magnets, newsletters, broadcasts, and affiliate follow-up sequences.", "https://bit.ly/gemautoresponder", "Try MailerLite"],
    ["AWeber", "Email", "Established autoresponder for newsletters, opt-in pages, and simple follow-up campaigns.", "https://bit.ly/awebert", "Try AWeber"],
    ["GroovePages", "Funnels", "Build opt-in pages, affiliate bridge pages, sales pages, and simple launch funnels.", "https://bit.ly/groovetools", "Open GroovePages"],
    ["LeadCreator", "Lead magnets", "Good fit for lead magnet, list-building, and funnel content.", "https://app.leadcreator.ai/q7tvx2vz06", "Open LeadCreator"],
    ["Descript", "Video", "Apply if you want a creator-tool affiliate path for captions, transcripts, clips, and faceless video.", "https://www.descript.com/affiliate", "Apply"],
    ["HostPapa", "Hosting", "Primary hosting card reserved for your approved HostPapa affiliate link.", "", "Add link"],
    ["Namecheap", "Domains", "Primary domain and hosting card reserved for your approved Namecheap affiliate link.", "", "Add link"]
  ];
  const channels = {
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
Body: If you are working on ${campaign.topic}, the goal is not more random content. The goal is one useful asset that points to one next action.
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

  function query(selector) {
    return root.querySelector(selector);
  }

  function pick(list, offset = 0) {
    return list[(state.run + offset) % list.length];
  }

  function getTopic() {
    const topic = query("#jtosTopicSelect").value;
    return topic === "Custom topic" ? query("#jtosCustomTopic").value.trim() || "online business launch" : topic;
  }

  function buildCampaign() {
    state.run += 1;
    const topic = getTopic();
    const audience = query("#jtosAudienceInput").value.trim() || "busy beginners";
    const goal = query("#jtosGoalSelect").value;
    const source = query("#jtosSourceContent").value.trim();
    const selectedChannels = [...root.querySelectorAll("input[name='jtosChannels']:checked")].map((input) => input.value);
    const angle = pick(angles, selectedChannels.length);
    query("#jtosLeadTopic").value = topic;
    return {
      topic,
      audience,
      goal,
      channels: selectedChannels.length ? selectedChannels : ["instagram", "email"],
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
    query("#jtosBriefTitle").textContent = `${campaign.topic} for ${campaign.audience}`;
    query("#jtosBriefMoney").textContent = `${campaign.goal} through ${recommendedTool(campaign)}`;
    query("#jtosBriefAngle").textContent = `${campaign.angle.label}: ${campaign.angle.structure}`;
    query("#jtosBriefAction").textContent = `Publish ${campaign.channels.length} assets and point them to one clear next step.`;
    query("#jtosOutputGrid").innerHTML = campaign.channels.map((channel) => {
      const content = channels[channel](campaign);
      return `
        <article class="jtos-output-card">
          <h3>${label(channel)}</h3>
          <pre id="jtos-output-${channel}">${escapeHtml(content)}</pre>
          <button class="jtos-button jtos-secondary jtos-copy-output" type="button" data-target="jtos-output-${channel}">Copy ${label(channel)}</button>
        </article>
      `;
    }).join("");
    root.querySelectorAll(".jtos-copy-output").forEach((button) => button.addEventListener("click", () => copyOutput(button)));
    renderCalendar(campaign);
  }

  function renderTools() {
    query("#jtosToolGrid").innerHTML = tools.map(([name, category, description, url, button]) => {
      const hasUrl = Boolean(url);
      return `
        <article class="jtos-tool-card">
          <span>${escapeHtml(category)}</span>
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(description)}</p>
          <a class="jtos-button ${hasUrl ? "jtos-secondary" : "jtos-disabled"}" href="${hasUrl ? escapeHtml(url) : "#"}" ${hasUrl ? 'target="_blank" rel="nofollow sponsored noopener noreferrer"' : 'aria-disabled="true"'}>${escapeHtml(button)}</a>
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
    query("#jtosCalendarGrid").innerHTML = days.map(([day, task]) => `
      <article>
        <span>${day}</span>
        <p>${escapeHtml(task)}</p>
      </article>
    `).join("");
  }

  function updateCalculator() {
    const leads = Number(query("#jtosLeads").value || 0);
    const jobValue = Number(query("#jtosJobValue").value || 0);
    const lift = Number(query("#jtosLift").value || 0) / 100;
    const recovered = leads * jobValue * lift;
    query("#jtosMonthly").textContent = money.format(recovered);
    query("#jtosAnnual").textContent = money.format(recovered * 12);
    query("#jtosCalcNote").textContent = `Based on recovering ${Math.round(lift * 100)}% of ${leads} missed or stale leads at ${money.format(jobValue)} per job.`;
  }

  function submitLead(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = query("#jtosLeadStatus");
    const payload = new URLSearchParams(new FormData(form));
    payload.set("action", "jtos_capture_lead");
    payload.set("nonce", window.JTOSLaunchHub ? window.JTOSLaunchHub.nonce : "");
    status.textContent = "Saving...";

    fetch(window.JTOSLaunchHub.ajaxUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: payload
    })
      .then((response) => response.json())
      .then((data) => {
        status.textContent = data.data && data.data.message ? data.data.message : "Saved.";
        if (data.success) form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong. Please try again.";
      });
  }

  function exportCampaign() {
    if (!state.lastCampaign) return;
    const parts = state.lastCampaign.channels.map((channel) => channels[channel](state.lastCampaign));
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
    const target = root.querySelector(`#${button.dataset.target}`);
    navigator.clipboard.writeText(target.textContent.trim()).catch(() => {});
    const original = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }

  function label(value) {
    return {
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      faceless: "Faceless Video",
      email: "Email",
      blog: "Blog",
      linkedin: "LinkedIn"
    }[value] || value;
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

  query("#jtosTopicSelect").addEventListener("change", (event) => {
    query("#jtosCustomTopicWrap").classList.toggle("jtos-hidden", event.target.value !== "Custom topic");
    query("#jtosLeadTopic").value = getTopic();
  });
  query("#jtosCampaignForm").addEventListener("submit", (event) => {
    event.preventDefault();
    renderCampaign(buildCampaign());
  });
  query("#jtosRegenerateButton").addEventListener("click", () => renderCampaign(buildCampaign()));
  query("#jtosExportButton").addEventListener("click", exportCampaign);
  query("#jtosLeadForm").addEventListener("submit", submitLead);
  ["#jtosLeads", "#jtosJobValue", "#jtosLift"].forEach((selector) => query(selector).addEventListener("input", updateCalculator));

  renderTools();
  renderCampaign(buildCampaign());
  updateCalculator();
})();
