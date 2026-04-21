import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, TextControl, TextareaControl, ToggleControl } from "@wordpress/components";
import { ButtonColorInspector } from "../shared/color-inspector";
import { TogglePreview } from "../shared/editor-toggle";
import "./editor.scss";

const B = "wp-block-flashblocks-accordion-content";
const TD = "flashblocks-truncate-content";

export default function Edit({ attributes, setAttributes, clientId }) {
	const { maxHeight, readMoreText, readLessText, svgIcon, showFade, buttonColor, targetSelector } = attributes;
	const [expanded, setExpanded] = useState(false);

	const blockProps = useBlockProps({
		className: [
			!showFade ? "has-no-fade" : "",
			expanded ? "is-expanded" : "",
		].filter(Boolean).join(" "),
		style: {
			"--accordion-max-height": `${maxHeight}px`,
			"--accordion-button-color": buttonColor,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Accordion Settings", TD)} initialOpen>
					<ToggleControl
						label={__("Show fade effect", TD)}
						checked={showFade}
						onChange={(value) => setAttributes({ showFade: value })}
					/>
					<RangeControl
						label={__("Content Height (px)", TD)}
						value={maxHeight}
						onChange={(value) => setAttributes({ maxHeight: value })}
						min={30}
						max={2000}
						step={5}
						withInputField
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
						help={__("CSS selector for elements to also accordion with these settings.", TD)}
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
