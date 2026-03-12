/**
 * Truncate Content — frontend interaction
 *
 * On load:  hides the toggle when content fits within the max-height.
 * On click: toggles expanded/collapsed state and swaps button text.
 */

const BLOCK = ".wp-block-flashblocks-truncate-content";
const BODY = `${BLOCK}__body`;
const TOGGLE = `${BLOCK}__toggle`;

/* Hide toggle + fade for blocks whose content isn't clipped */
function initTruncateBlocks() {
	document.querySelectorAll(BLOCK).forEach((block) => {
		const body = block.querySelector(BODY);
		const toggle = block.querySelector(TOGGLE);
		if (!body || !toggle) return;

		if (body.scrollHeight <= body.clientHeight) {
			toggle.hidden = true;
			block.classList.add("is-fully-visible");
		}
	});
}

initTruncateBlocks();

/* Expand / collapse on toggle click */
document.addEventListener("click", (e) => {
	const btn = e.target.closest(TOGGLE);
	if (!btn) return;

	const block = btn.closest(BLOCK);
	if (!block) return;

	const isExpanded = block.classList.toggle("is-expanded");

	/* Swap the text node only, preserving any SVG icon sibling */
	const textNode = btn.firstChild;
	if (textNode?.nodeType === Node.TEXT_NODE) {
		textNode.textContent = isExpanded
			? block.dataset.readLess || "Read Less"
			: block.dataset.readMore || "Read More";
	}

	btn.setAttribute("aria-expanded", String(isExpanded));
});
