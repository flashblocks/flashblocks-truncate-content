import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, TextControl, TextareaControl } from "@wordpress/components";
import { ButtonColorInspector } from "../shared/color-inspector";
import { TogglePreview } from "../shared/editor-toggle";
import "./editor.scss";

const B = "wp-block-flashblocks-truncate-content";
const TD = "flashblocks-truncate-content";

export default function Edit({ attributes, setAttributes, clientId }) {
	const { maxLines, readMoreText, readLessText, svgIcon, buttonColor, targetSelector, typeRevealSpeed } = attributes;
	const [expanded, setExpanded] = useState(false);

	const blockProps = useBlockProps({
		className: expanded ? "is-expanded" : "",
		style: {
			"--truncate-max-lines": maxLines,
			"--truncate-button-color": buttonColor,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Truncation Settings", TD)} initialOpen>
					<RangeControl
						label={__("Max Lines", TD)}
						value={maxLines}
						onChange={(value) => setAttributes({ maxLines: value })}
						min={0}
						max={500}
						step={1}
						withInputField
					/>
					<TextControl
						label={__("Typing Speed (ms/char)", TD)}
						type="number"
						value={typeRevealSpeed}
						onChange={(value) => setAttributes({ typeRevealSpeed: value })}
						step="any"
					/>
					<TextControl
						label={__("Read More Text", TD)}
						value={readMoreText}
						onChange={(value) => setAttributes({ readMoreText: value })}
					/>
					<TextControl
						label={__("Read Less Text", TD)}
						value={readLessText}
						onChange={(value) => setAttributes({ readLessText: value })}
					/>
					<TextareaControl
						label={__("SVG Icon", TD)}
						help={__("Paste SVG markup for the toggle icon.", TD)}
						value={svgIcon}
						onChange={(value) => setAttributes({ svgIcon: value })}
					/>
					<TextControl
						label={__("Target Selector", TD)}
						help={__("CSS selector for elements to also truncate with these settings.", TD)}
						value={targetSelector}
						onChange={(value) => setAttributes({ targetSelector: value })}
						placeholder=".my-class"
					/>
				</PanelBody>
			</InspectorControls>
			<ButtonColorInspector clientId={clientId} buttonColor={buttonColor} setAttributes={setAttributes} textDomain={TD} />
			<div {...blockProps}>
				<div className={`${B}__body`}>
					<InnerBlocks />
				</div>
				<TogglePreview
					blockClass={B}
					onToggle={() => setExpanded(!expanded)}
					label={expanded ? readLessText : readMoreText}
					svgIcon={svgIcon}
				/>
			</div>
		</>
	);
}
