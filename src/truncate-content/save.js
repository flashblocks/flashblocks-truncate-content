import clsx from "clsx";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { RawHTML } from "@wordpress/element";

export default function save({ attributes }) {
	const { maxHeight, readMoreText, readLessText, svgIcon, showFade, buttonColor } =
		attributes;

	const blockProps = useBlockProps.save({
		className: clsx({ "has-no-fade": !showFade }),
		style: {
			"--truncate-max-height": `${maxHeight}px`,
			"--truncate-button-color": buttonColor,
		},
		"data-read-more": readMoreText,
		"data-read-less": readLessText,
	});

	return (
		<div {...blockProps}>
			<div className="wp-block-flashblocks-truncate-content__body">
				<InnerBlocks.Content />
			</div>
			<button
				className="wp-block-flashblocks-truncate-content__toggle"
				type="button"
				aria-expanded="false"
			>
				{readMoreText}
				{svgIcon && (
					<RawHTML className="wp-block-flashblocks-truncate-content__icon">
						{svgIcon}
					</RawHTML>
				)}
			</button>
		</div>
	);
}
