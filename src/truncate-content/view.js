/**
 * Truncate Content — frontend
 *
 * Handles native blocks + elements matched via [data-target-selector].
 * Shared structure: .wp-block-flashblocks-truncate-content > __body + __toggle
 */

const CLS    = "wp-block-flashblocks-truncate-content";
const BLOCK  = `.${CLS}`;
const TOGGLE = `.${CLS}__toggle`;
const VARS   = ["--truncate-max-height", "--truncate-button-color"];

/** Hide toggle when content already fits within max-height. */
function initBlock(el) {
	const body   = el.querySelector(`.${CLS}__body`);
	const toggle = el.querySelector(TOGGLE);
	if (!body || !toggle) return;
	if (body.scrollHeight <= body.clientHeight) {
		toggle.hidden = true;
		el.classList.add("is-fully-visible");
	}
}

/** Promote matched elements into truncate blocks, inheriting settings from src. */
document.querySelectorAll(`${BLOCK}[data-target-selector]`).forEach((src) => {
	try {
		document.querySelectorAll(src.dataset.targetSelector).forEach((el) => {
			if (el.closest(BLOCK)) return;

			const body = document.createElement("div");
			body.className = `${CLS}__body`;
			while (el.firstChild) body.appendChild(el.firstChild);
			el.appendChild(body);

			const btn = src.querySelector(TOGGLE);
			if (btn) el.appendChild(btn.cloneNode(true));

			el.classList.add(CLS);
			if (src.classList.contains("has-no-fade")) el.classList.add("has-no-fade");
			VARS.forEach((p) => { const v = src.style.getPropertyValue(p); if (v) el.style.setProperty(p, v); });
			el.dataset.readMore = src.dataset.readMore;
			el.dataset.readLess = src.dataset.readLess;

			initBlock(el);
		});
	} catch { /* invalid selector */ }
});

document.querySelectorAll(BLOCK).forEach(initBlock);

/** Expand / collapse — single delegated listener for all instances. */
document.addEventListener("click", (e) => {
	const btn = e.target.closest(TOGGLE);
	if (!btn) return;
	const block = btn.closest(BLOCK);
	if (!block) return;

	const expanded = block.classList.toggle("is-expanded");
	const text = btn.firstChild;
	if (text?.nodeType === Node.TEXT_NODE) {
		text.textContent = expanded ? (block.dataset.readLess || "Read Less") : (block.dataset.readMore || "Read More");
	}
	btn.setAttribute("aria-expanded", String(expanded));
});
