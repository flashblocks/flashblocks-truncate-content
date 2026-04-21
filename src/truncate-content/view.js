/**
 * Truncate Content — line-clamp + typing reveal, reversible mid-animation.
 *
 * Uses binary search on scrollHeight to find the exact character where
 * line-clamp truncation occurs, so the reveal animation starts precisely
 * at the ellipsis point.
 */

import { promoteTargets } from "../shared/promote";
import { initToggle } from "../shared/toggle";
import { hideToggleWhenFits } from "../shared/init";

const B = "wp-block-flashblocks-truncate-content";
const SEL = { block: `.${B}`, body: `.${B}__body`, toggle: `.${B}__toggle` };
const anims = new WeakMap();

/* ── Text node helpers ── */

function textEntries(body) {
	const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
	const entries = [];
	let n;
	while ((n = walker.nextNode())) entries.push({ node: n, full: n.textContent });
	return entries;
}

/**
 * Binary-search across all text nodes to find the exact global character
 * offset where content first exceeds the clamped height.
 *
 * We temporarily remove line-clamp so we can measure the natural height
 * of progressively longer slices. The character at which the body's
 * scrollHeight exceeds clampedH is our precise cutoff.
 */
function findCutoffChar(body, entries, clampedH) {
	const total = entries.reduce((sum, e) => sum + e.full.length, 0);

	// Temporarily unclamped so we can measure real heights
	body.style.webkitLineClamp = "unset";
	body.style.lineClamp = "unset";

	// Render a given global char count into the text nodes
	const setChars = (count) => {
		let rem = count;
		for (const e of entries) {
			const show = Math.min(Math.max(0, rem), e.full.length);
			e.node.textContent = e.full.slice(0, show);
			rem -= show;
		}
	};

	// Binary search: find the first char count where height > clampedH
	let lo = 0;
	let hi = total;

	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		setChars(mid);
		if (body.scrollHeight <= clampedH) {
			lo = mid + 1;
		} else {
			hi = mid;
		}
	}

	// Restore full text
	for (const e of entries) e.node.textContent = e.full;

	// Restore clamp
	body.style.webkitLineClamp = "";
	body.style.lineClamp = "";

	return lo;
}

/* ── Render / Animation ── */

function render(entries, pos) {
	let rem = pos;
	for (const e of entries) {
		const show = Math.min(Math.max(0, rem), e.full.length);
		e.node.textContent = e.full.slice(0, show);
		rem -= show;
	}
}

function tick(s) {
	const delay = Math.max(1, s.speed);
	const batch = s.speed < 1 ? Math.round(1 / s.speed) : 1;

	for (let c = 0; c < batch; c++) {
		s.pos += s.dir;

		if (s.pos >= s.total) {
			s.pos = s.total;
			render(s.entries, s.pos);
			s.timer = null;
			return;
		}

		if (s.pos <= s.start) {
			s.pos = s.start;
			// Restore full text so CSS line-clamp can take over again
			for (const e of s.entries) e.node.textContent = e.full;
			s.block.classList.remove("is-expanded");
			s.timer = null;
			return;
		}
	}

	render(s.entries, s.pos);
	s.timer = setTimeout(() => tick(s), delay);
}

function animate(block, forward) {
	const body = block.querySelector(SEL.body);
	if (!body) return;

	let s = anims.get(block);
	const speed = parseFloat(block.dataset.typeSpeed) || 8;

	// Mid-animation — just flip direction
	if (s?.timer) {
		clearTimeout(s.timer);
		s.timer = null;
		s.dir = forward ? 1 : -1;
		s.speed = speed;
		tick(s);
		return;
	}

	// Fresh start — measure the precise cutoff while still clamped
	const entries = textEntries(body);
	const total = entries.reduce((sum, e) => sum + e.full.length, 0);
	const clampedH = parseFloat(body.dataset.clampedHeight) || body.clientHeight;

	const start = findCutoffChar(body, entries, clampedH);

	block.classList.add("is-expanded");

	s = {
		block, entries, total, start, speed,
		pos: forward ? start : total,
		dir: forward ? 1 : -1,
		timer: null,
	};
	anims.set(block, s);

	if (forward) render(entries, start);
	tick(s);
}

/* ── Setup ── */

promoteTargets(SEL.block, `${B}__body`, SEL.toggle, [], ["--truncate-max-lines", "--truncate-button-color"]);

// Store clamped height before anything changes
document.querySelectorAll(SEL.block).forEach((el) => {
	const body = el.querySelector(SEL.body);
	if (body) body.dataset.clampedHeight = body.clientHeight;
});

hideToggleWhenFits(SEL.block, SEL.body, SEL.toggle);

initToggle(SEL.block, SEL.toggle, {
	onExpand(block, label) { label(true); animate(block, true); },
	onCollapse(block, label) { label(false); animate(block, false); },
});
