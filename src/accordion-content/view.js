/**
 * Accordion Content — frontend
 * Pure height-based accordion with fade option. No text manipulation.
 */

import { promoteTargets } from "../shared/promote";
import { initToggle } from "../shared/toggle";
import { hideToggleWhenFits } from "../shared/init";

const B = "wp-block-flashblocks-accordion-content";
const SEL = { block: `.${B}`, body: `.${B}__body`, toggle: `.${B}__toggle` };

/* Promote targeted elements */
promoteTargets(SEL.block, `${B}__body`, SEL.toggle, ["has-no-fade"], ["--accordion-max-height", "--accordion-button-color"]);

/* Hide toggle when content fits */
hideToggleWhenFits(SEL.block, SEL.body, SEL.toggle);

/* Toggle */
initToggle(SEL.block, SEL.toggle, {
	onExpand(block, updateLabel) {
		block.classList.add("is-expanded");
		updateLabel(true);
	},
	onCollapse(block, updateLabel) {
		block.classList.remove("is-expanded");
		updateLabel(false);
	},
});
