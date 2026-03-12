<?php

/**
 * Plugin Name:       Flashblocks Truncate Content
 * Description:       A container that truncates its content with a read more/less toggle.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Sunny Morgan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flashblocks-truncate-content
 *
 * @package FlashblocksTruncateContent
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function flashblocks_truncate_content_init() {
	$manifest_path = __DIR__ . '/build/blocks-manifest.php';
	if (! file_exists($manifest_path)) {
		return;
	}

	$manifest_data = require $manifest_path;
	foreach (array_keys($manifest_data) as $block_type) {
		register_block_type(__DIR__ . "/build/{$block_type}");
	}
}
add_action('init', 'flashblocks_truncate_content_init');
