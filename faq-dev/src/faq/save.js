import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import "./style.scss";
import arrow_up from "./img/arrow_up.svg";
import arrow_down from "./img/arrow_down.svg";

export default function Save({ attributes }) {
	const { faqs = [], heading } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<RichText.Content tagName="h2" value={heading} />
			{faqs.map((faq, index) => (
				<div key={index} className="faq">
					<div>
						<strong>{index + 1}. </strong>
						<RichText.Content tagName="h3" value={faq.question} />
						<div>
							<img src={arrow_down} alt="closed" />
							<img src={arrow_up} alt="opened" />
						</div>
					</div>
					<div>
						<RichText.Content tagName="p" value={faq.answer} />
					</div>
				</div>
			))}
		</div>
	);
}
