/**
 * Shared: promote targeted elements into truncate/accordion blocks.
 *
 * @param {string}   blockSel       — block selector, e.g. `.wp-block-flashblocks-truncate-content`
 * @param {string}   bodyCls        — body class name
 * @param {string}   toggleSel      — toggle selector
 * @param {string[]} inheritClasses — modifier classes to copy
 * @param {string[]} inheritVars    — CSS custom properties to copy
 */
export function promoteTargets(blockSel, bodyCls, toggleSel, inheritClasses = [], inheritVars = []) {
	document.querySelectorAll(`${blockSel}[data-target-selector]`).forEach((src) => {
		try {
			document.querySelectorAll(src.dataset.targetSelector).forEach((el) => {
				if (el.closest(blockSel)) return;

				const body = document.createElement("div");
				body.className = bodyCls;
				while (el.firstChild) body.appendChild(el.firstChild);
				el.appendChild(body);

				const btn = src.querySelector(toggleSel);
				if (btn) el.appendChild(btn.cloneNode(true));

				el.classList.add(blockSel.replace(/^\./, ""));
				inheritClasses.forEach((c) => { if (src.classList.contains(c)) el.classList.add(c); });
				inheritVars.forEach((v) => { const val = src.style.getPropertyValue(v); if (val) el.style.setProperty(v, val); });

				// Copy data attributes
				for (const [k, v] of Object.entries(src.dataset)) {
					if (k !== "targetSelector") el.dataset[k] = v;
				}
			});
		} catch { /* invalid selector */ }
	});
}
