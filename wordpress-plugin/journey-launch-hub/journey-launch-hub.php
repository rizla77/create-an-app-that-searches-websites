<?php
/**
 * Plugin Name: Journey Launch Hub
 * Description: Adds the Journey to Online Success launch hub, Creator Money Studio, affiliate toolbox, product CTAs, and lead capture form.
 * Version: 1.0.0
 * Author: Journey to Online Success
 * Text Domain: journey-launch-hub
 */

if (!defined('ABSPATH')) {
    exit;
}

define('JTOS_LAUNCH_HUB_VERSION', '1.0.0');
define('JTOS_LAUNCH_HUB_FILE', __FILE__);
define('JTOS_LAUNCH_HUB_DIR', plugin_dir_path(__FILE__));
define('JTOS_LAUNCH_HUB_URL', plugin_dir_url(__FILE__));

register_activation_hook(__FILE__, 'jtos_launch_hub_activate');

function jtos_launch_hub_activate() {
    global $wpdb;

    $table = jtos_launch_hub_table_name();
    $charset_collate = $wpdb->get_charset_collate();

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $sql = "CREATE TABLE {$table} (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        created_at datetime NOT NULL,
        name varchar(190) NOT NULL DEFAULT '',
        email varchar(190) NOT NULL DEFAULT '',
        goal varchar(190) NOT NULL DEFAULT '',
        topic varchar(190) NOT NULL DEFAULT '',
        source varchar(190) NOT NULL DEFAULT '',
        message text NULL,
        consent tinyint(1) NOT NULL DEFAULT 0,
        ip_address varchar(100) NOT NULL DEFAULT '',
        user_agent varchar(255) NOT NULL DEFAULT '',
        PRIMARY KEY  (id),
        KEY email (email),
        KEY created_at (created_at)
    ) {$charset_collate};";

    dbDelta($sql);
}

function jtos_launch_hub_table_name() {
    global $wpdb;
    return $wpdb->prefix . 'jtos_launch_hub_leads';
}

add_shortcode('journey_launch_hub', 'jtos_launch_hub_shortcode');

function jtos_launch_hub_shortcode($atts = array()) {
    $atts = shortcode_atts(
        array(
            'checkout_url' => '',
            'show_header' => 'yes',
        ),
        $atts,
        'journey_launch_hub'
    );

    jtos_launch_hub_enqueue_assets();

    $checkout_url = esc_url($atts['checkout_url']);
    $buy_url = $checkout_url ? $checkout_url : esc_url(JTOS_LAUNCH_HUB_URL . 'product/AI-Local-Service-Revenue-Kit.md');
    $calendar_url = esc_url(JTOS_LAUNCH_HUB_URL . 'product/30-day-content-calendar.csv');
    $image_url = esc_url(JTOS_LAUNCH_HUB_URL . 'assets/hero-revenue-kit.png');

    ob_start();
    ?>
    <div class="jtos-launch-hub" id="jtos-launch-hub">
        <?php if ('yes' === $atts['show_header']) : ?>
            <header class="jtos-site-header">
                <a class="jtos-brand" href="#jtos-top" aria-label="Journey to Online Success home">
                    <span class="jtos-brand-mark">JS</span>
                    <span>Journey to Online Success</span>
                </a>
                <nav aria-label="Journey launch hub navigation">
                    <a href="#jtos-studio">Studio</a>
                    <a href="#jtos-leads">Lead Magnet</a>
                    <a href="#jtos-kit">Revenue Kit</a>
                    <a href="#jtos-tools">Tools</a>
                </nav>
            </header>
        <?php endif; ?>

        <main id="jtos-top">
            <section class="jtos-hero">
                <div class="jtos-hero-copy">
                    <p class="jtos-eyebrow">Launch stack for making useful things pay</p>
                    <h1>Turn one idea into content, clicks, subscribers, and a product sale.</h1>
                    <p>
                        Use the free Creator Money Studio to generate campaign assets, collect leads, recommend useful tools,
                        and move buyers toward the AI Local Service Revenue Kit.
                    </p>
                    <div class="jtos-actions">
                        <a class="jtos-button jtos-primary" href="#jtos-studio">Use the studio</a>
                        <a class="jtos-button jtos-secondary" href="#jtos-leads">Get the launch plan</a>
                    </div>
                </div>
                <div class="jtos-launch-panel" aria-label="Launch funnel">
                    <article>
                        <span>01</span>
                        <strong>Free tool</strong>
                        <p>Give visitors an immediate campaign result before asking for anything.</p>
                    </article>
                    <article>
                        <span>02</span>
                        <strong>Lead capture</strong>
                        <p>Offer a launch plan and save contacts inside WordPress.</p>
                    </article>
                    <article>
                        <span>03</span>
                        <strong>Paid product</strong>
                        <p>Send the right visitors to the $29 local service revenue kit.</p>
                    </article>
                </div>
            </section>

            <section class="jtos-notice">
                <strong>Affiliate disclosure:</strong> Some links may be affiliate links. Results depend on traffic, offer quality, trust, and execution.
            </section>

            <section class="jtos-band jtos-lead-band" id="jtos-leads">
                <div class="jtos-section-head">
                    <p class="jtos-eyebrow">Lead magnet</p>
                    <h2>Collect subscribers before they leave.</h2>
                    <p>Offer the 7-day launch plan, then follow up with the kit, tools, and content tips.</p>
                </div>
                <form class="jtos-lead-form" id="jtosLeadForm">
                    <div class="jtos-two-col">
                        <label>
                            Name
                            <input name="name" type="text" autocomplete="name" required>
                        </label>
                        <label>
                            Email
                            <input name="email" type="email" autocomplete="email" required>
                        </label>
                    </div>
                    <div class="jtos-two-col">
                        <label>
                            Main goal
                            <select name="goal">
                                <option>Affiliate clicks</option>
                                <option>Email subscribers</option>
                                <option>Product sales</option>
                                <option>Consultation bookings</option>
                                <option>Career transition</option>
                            </select>
                        </label>
                        <label>
                            Topic
                            <input name="topic" id="jtosLeadTopic" type="text" value="AI tools for small business">
                        </label>
                    </div>
                    <label>
                        What are you trying to launch?
                        <textarea name="message" rows="4" placeholder="Example: a small digital product, affiliate site, or local service offer"></textarea>
                    </label>
                    <label class="jtos-consent">
                        <input name="consent" type="checkbox" value="1" required>
                        <span>Send me the launch plan and follow-up emails about online business tools, products, and offers.</span>
                    </label>
                    <input name="source" type="hidden" value="wordpress-launch-hub">
                    <button class="jtos-button jtos-primary" type="submit">Send me the launch plan</button>
                    <p class="jtos-form-status" id="jtosLeadStatus" aria-live="polite"></p>
                </form>
            </section>

            <section class="jtos-band jtos-studio-band" id="jtos-studio">
                <div class="jtos-section-head">
                    <p class="jtos-eyebrow">Creator Money Studio</p>
                    <h2>Generate traffic assets from one topic.</h2>
                    <p>Pick a niche, paste notes or leave them blank, then generate platform-ready content with affiliate CTAs and a 7-day publishing plan.</p>
                </div>

                <form class="jtos-studio-grid" id="jtosCampaignForm">
                    <section class="jtos-control-panel">
                        <label>
                            Topic or niche
                            <select id="jtosTopicSelect" name="topic">
                                <option>AI tools for small business</option>
                                <option>Affiliate marketing for beginners</option>
                                <option>Faceless YouTube channels</option>
                                <option>Home office gear</option>
                                <option>Personal finance</option>
                                <option>Local service lead follow-up</option>
                                <option>Custom topic</option>
                            </select>
                        </label>

                        <label id="jtosCustomTopicWrap" class="jtos-hidden">
                            Custom topic
                            <input id="jtosCustomTopic" type="text" placeholder="Example: bookkeeping for trades businesses">
                        </label>

                        <label>
                            Notes, offer, or rough idea
                            <textarea id="jtosSourceContent" rows="6" placeholder="Paste product notes, a blog idea, a video transcript, or leave blank for a generated angle."></textarea>
                        </label>

                        <div class="jtos-two-col">
                            <label>
                                Audience
                                <input id="jtosAudienceInput" type="text" value="busy beginners">
                            </label>
                            <label>
                                Goal
                                <select id="jtosGoalSelect">
                                    <option>Affiliate clicks</option>
                                    <option>Email subscribers</option>
                                    <option>Product sales</option>
                                    <option>Consultation bookings</option>
                                </select>
                            </label>
                        </div>

                        <fieldset>
                            <legend>Traffic channels</legend>
                            <label><input type="checkbox" name="jtosChannels" value="instagram" checked> Instagram</label>
                            <label><input type="checkbox" name="jtosChannels" value="tiktok" checked> TikTok</label>
                            <label><input type="checkbox" name="jtosChannels" value="youtube" checked> YouTube</label>
                            <label><input type="checkbox" name="jtosChannels" value="faceless" checked> Faceless Video</label>
                            <label><input type="checkbox" name="jtosChannels" value="email" checked> Email</label>
                            <label><input type="checkbox" name="jtosChannels" value="blog"> Blog</label>
                            <label><input type="checkbox" name="jtosChannels" value="linkedin"> LinkedIn</label>
                        </fieldset>

                        <button class="jtos-button jtos-primary jtos-full" type="submit">Generate campaign</button>
                        <button class="jtos-button jtos-secondary jtos-full" id="jtosRegenerateButton" type="button">New variation</button>
                    </section>

                    <aside class="jtos-strategy-panel">
                        <p class="jtos-eyebrow">Campaign brief</p>
                        <h3 id="jtosBriefTitle">Ready for your first campaign</h3>
                        <dl>
                            <div>
                                <dt>Money path</dt>
                                <dd id="jtosBriefMoney">Free tool to affiliate link or product sale</dd>
                            </div>
                            <div>
                                <dt>Angle</dt>
                                <dd id="jtosBriefAngle">Practical proof and useful next step</dd>
                            </div>
                            <div>
                                <dt>Next action</dt>
                                <dd id="jtosBriefAction">Publish one short video and one email today.</dd>
                            </div>
                        </dl>
                        <button class="jtos-button jtos-secondary jtos-full" id="jtosExportButton" type="button">Export campaign</button>
                    </aside>
                </form>

                <div class="jtos-output-grid" id="jtosOutputGrid" aria-live="polite"></div>
            </section>

            <section class="jtos-band jtos-kit-band" id="jtos-kit">
                <div class="jtos-kit-layout">
                    <div>
                        <p class="jtos-eyebrow">Digital product</p>
                        <h2>AI Local Service Revenue Kit</h2>
                        <p>
                            Sell this as a simple download for local businesses that need faster replies, quote follow-up,
                            and review requests.
                        </p>
                        <ul class="jtos-check-list">
                            <li>AI reply prompts for missed calls, quotes, objections, reviews, and old leads.</li>
                            <li>Daily and weekly staff SOPs for lead follow-up.</li>
                            <li>ROI worksheet and 30-day promotional content calendar.</li>
                            <li>Checkout-ready price positioning at $29.</li>
                        </ul>
                        <div class="jtos-actions">
                            <a class="jtos-button jtos-primary" data-buy-link href="<?php echo esc_url($buy_url); ?>">Preview product file</a>
                            <a class="jtos-button jtos-secondary" href="<?php echo esc_url($calendar_url); ?>">Open content calendar</a>
                        </div>
                    </div>
                    <figure class="jtos-product-media">
                        <img src="<?php echo esc_url($image_url); ?>" alt="AI Local Service Revenue Kit dashboard preview">
                    </figure>
                </div>

                <div class="jtos-calculator">
                    <form class="jtos-calc-panel" aria-label="Revenue recovery calculator">
                        <label>
                            Missed or stale leads per month
                            <input id="jtosLeads" type="number" value="35" min="0">
                        </label>
                        <label>
                            Average job value
                            <input id="jtosJobValue" type="number" value="420" min="0">
                        </label>
                        <label>
                            Recovery lift from faster follow-up
                            <input id="jtosLift" type="number" value="9" min="0" max="100">
                        </label>
                    </form>
                    <aside class="jtos-result-panel">
                        <span>Estimated recovered monthly revenue</span>
                        <strong id="jtosMonthly">$1,323</strong>
                        <span>Estimated annual upside</span>
                        <strong id="jtosAnnual">$15,876</strong>
                        <p id="jtosCalcNote">Based on recovering 9% of 35 missed or stale leads at $420 per job.</p>
                    </aside>
                </div>
            </section>

            <section class="jtos-band jtos-tools-band" id="jtos-tools">
                <div class="jtos-section-head">
                    <p class="jtos-eyebrow">Affiliate toolbox</p>
                    <h2>Recommended tools to place beside the workflow.</h2>
                    <p>Use real links where you already have them. Cards without approved links stay disabled.</p>
                </div>
                <div class="jtos-tool-grid" id="jtosToolGrid"></div>
            </section>

            <section class="jtos-band jtos-calendar-band">
                <div class="jtos-section-head">
                    <p class="jtos-eyebrow">7-day launch sprint</p>
                    <h2>Use the site to publish, not just plan.</h2>
                </div>
                <div class="jtos-calendar" id="jtosCalendarGrid"></div>
            </section>
        </main>
    </div>
    <?php
    return ob_get_clean();
}

function jtos_launch_hub_enqueue_assets() {
    wp_enqueue_style(
        'jtos-launch-hub',
        JTOS_LAUNCH_HUB_URL . 'assets/launch-hub.css',
        array(),
        JTOS_LAUNCH_HUB_VERSION
    );

    wp_enqueue_script(
        'jtos-launch-hub',
        JTOS_LAUNCH_HUB_URL . 'assets/launch-hub.js',
        array(),
        JTOS_LAUNCH_HUB_VERSION,
        true
    );

    wp_localize_script(
        'jtos-launch-hub',
        'JTOSLaunchHub',
        array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('jtos_launch_hub_lead'),
        )
    );
}

add_action('wp_ajax_jtos_capture_lead', 'jtos_launch_hub_capture_lead');
add_action('wp_ajax_nopriv_jtos_capture_lead', 'jtos_launch_hub_capture_lead');

function jtos_launch_hub_capture_lead() {
    check_ajax_referer('jtos_launch_hub_lead', 'nonce');

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $goal = sanitize_text_field(wp_unslash($_POST['goal'] ?? ''));
    $topic = sanitize_text_field(wp_unslash($_POST['topic'] ?? ''));
    $source = sanitize_text_field(wp_unslash($_POST['source'] ?? 'wordpress-launch-hub'));
    $message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));
    $consent = isset($_POST['consent']) && '1' === (string) wp_unslash($_POST['consent']);

    if (!$name || !is_email($email) || !$consent) {
        wp_send_json_error(
            array('message' => __('Please enter your name, a valid email, and consent.', 'journey-launch-hub')),
            400
        );
    }

    global $wpdb;
    $table = jtos_launch_hub_table_name();
    $inserted = $wpdb->insert(
        $table,
        array(
            'created_at' => current_time('mysql'),
            'name' => $name,
            'email' => $email,
            'goal' => $goal,
            'topic' => $topic,
            'source' => $source,
            'message' => $message,
            'consent' => 1,
            'ip_address' => sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'] ?? '')),
            'user_agent' => substr(sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 255),
        ),
        array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s')
    );

    if (!$inserted) {
        wp_send_json_error(array('message' => __('The lead could not be saved. Please try again.', 'journey-launch-hub')), 500);
    }

    $admin_email = get_option('admin_email');
    if ($admin_email) {
        wp_mail(
            $admin_email,
            __('New Journey Launch Hub lead', 'journey-launch-hub'),
            sprintf(
                "Name: %s\nEmail: %s\nGoal: %s\nTopic: %s\nSource: %s\n\nMessage:\n%s",
                $name,
                $email,
                $goal,
                $topic,
                $source,
                $message
            )
        );
    }

    wp_send_json_success(array('message' => __('You are in. Check your email and start with the studio below.', 'journey-launch-hub')));
}

add_action('admin_menu', 'jtos_launch_hub_admin_menu');

function jtos_launch_hub_admin_menu() {
    add_menu_page(
        __('Journey Leads', 'journey-launch-hub'),
        __('Journey Leads', 'journey-launch-hub'),
        'manage_options',
        'jtos-launch-hub-leads',
        'jtos_launch_hub_admin_page',
        'dashicons-email-alt2',
        26
    );
}

function jtos_launch_hub_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_GET['jtos_export']) && check_admin_referer('jtos_export_leads')) {
        jtos_launch_hub_export_leads();
        exit;
    }

    global $wpdb;
    $table = jtos_launch_hub_table_name();
    $leads = $wpdb->get_results("SELECT * FROM {$table} ORDER BY created_at DESC LIMIT 200");
    $export_url = wp_nonce_url(admin_url('admin.php?page=jtos-launch-hub-leads&jtos_export=1'), 'jtos_export_leads');
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Journey Launch Hub Leads', 'journey-launch-hub'); ?></h1>
        <p><?php esc_html_e('Latest 200 leads collected through the launch hub shortcode.', 'journey-launch-hub'); ?></p>
        <p><a class="button button-primary" href="<?php echo esc_url($export_url); ?>"><?php esc_html_e('Export CSV', 'journey-launch-hub'); ?></a></p>
        <table class="widefat striped">
            <thead>
                <tr>
                    <th><?php esc_html_e('Date', 'journey-launch-hub'); ?></th>
                    <th><?php esc_html_e('Name', 'journey-launch-hub'); ?></th>
                    <th><?php esc_html_e('Email', 'journey-launch-hub'); ?></th>
                    <th><?php esc_html_e('Goal', 'journey-launch-hub'); ?></th>
                    <th><?php esc_html_e('Topic', 'journey-launch-hub'); ?></th>
                    <th><?php esc_html_e('Message', 'journey-launch-hub'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if ($leads) : ?>
                    <?php foreach ($leads as $lead) : ?>
                        <tr>
                            <td><?php echo esc_html($lead->created_at); ?></td>
                            <td><?php echo esc_html($lead->name); ?></td>
                            <td><a href="mailto:<?php echo esc_attr($lead->email); ?>"><?php echo esc_html($lead->email); ?></a></td>
                            <td><?php echo esc_html($lead->goal); ?></td>
                            <td><?php echo esc_html($lead->topic); ?></td>
                            <td><?php echo esc_html(wp_trim_words($lead->message, 18)); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else : ?>
                    <tr>
                        <td colspan="6"><?php esc_html_e('No leads yet.', 'journey-launch-hub'); ?></td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

function jtos_launch_hub_export_leads() {
    if (!current_user_can('manage_options')) {
        wp_die(esc_html__('You do not have permission to export leads.', 'journey-launch-hub'));
    }

    global $wpdb;
    $table = jtos_launch_hub_table_name();
    $leads = $wpdb->get_results("SELECT created_at, name, email, goal, topic, source, message, consent FROM {$table} ORDER BY created_at DESC", ARRAY_A);

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=journey-launch-hub-leads.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('created_at', 'name', 'email', 'goal', 'topic', 'source', 'message', 'consent'));

    foreach ($leads as $lead) {
        fputcsv($output, $lead);
    }

    fclose($output);
}
