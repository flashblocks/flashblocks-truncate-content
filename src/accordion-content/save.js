import clsx from "clsx";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { SaveToggle } from "../shared/save-toggle";

const B = "wp-block-flashblocks-accordion-content";

export default function save({ attributes }) {
	const { maxHeight, readMoreText, readLessText, svgIcon, showFade, buttonColor, targetSelector } = attributes;

	const blockProps = useBlockProps.save({
		className: clsx({ "has-no-fade": !showFade }),
		style: {
			"--accordion-max-height": `${maxHeight}px`,
			"--accordion-button-color": buttonColor,
		},
		"data-read-more": readMoreText,
		"data-read-less": readLessText,
		...(targetSelector ? { "data-target-selector": targetSelector } : {}),
	});

	return (
		<div {...blockProps}>
			<div className={`${B}__body`}>
				<InnerBlocks.Content />
			</div>
			<SaveToggle blockClass={B} label={readMoreText} svgIcon={svgIcon} />
		</div>
	);
}
