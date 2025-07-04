import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./editor.scss";
import arrow_up from "./img/arrow_up.svg";
import arrow_down from "./img/arrow_down.svg";

export default function Edit({ attributes, setAttributes }) {
	const { faqs = [], heading = "" } = attributes;
	const [toggle, setToggle] = useState({});

	const updateFaq = (index, key, value) => {
		const newFaqs = [...faqs];
		newFaqs[index][key] = value;
		setAttributes({ faqs: newFaqs });
	};

	const addFaq = () => {
		setAttributes({ faqs: [...faqs, { question: "", answer: "" }] });
	};

	const removeFaq = (index) => {
		const newFaqs = [...faqs];
		newFaqs.splice(index, 1);
		setAttributes({ faqs: newFaqs });

		setToggle((prev) => {
			const newToggle = { ...prev };
			delete newToggle[index];
			return newToggle;
		});
	};

	const toggleFaq = (index) => {
		setToggle((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="h2"
				placeholder="Enter the title"
				value={heading}
				onChange={(val) => setAttributes({ heading: val })}
			/>
			{faqs.map((faq, index) => (
				<div
					key={index}
					className={!toggle[index] ? "active faq" : "faq"}
					style={{
						marginBottom: "1rem",
						paddingBottom: "1.5rem",
						borderBottom: "1px dotted #cacaca",
					}}
				>
					<div>
						<strong>{index + 1}. </strong>
						<RichText
							tagName="h3"
							placeholder="Enter your question"
							value={faq.question}
							onChange={(val) => updateFaq(index, "question", val)}
						/>
						<div onClick={() => toggleFaq(index)}>
							{/* {!toggle[index] ? (
								<img src={arrow_up} alt="open" />
							) : (
								<img src={arrow_down} alt="close" />
							)} */}

							<img src={arrow_down} alt="closed" />
							<img src={arrow_up} alt="opened" />
						</div>
					</div>
					<div>
						<RichText
							tagName="p"
							placeholder="Enter your answer"
							value={faq.answer}
							onChange={(val) => updateFaq(index, "answer", val)}
						/>
					</div>
					<Button
						variant="secondary"
						isDestructive
						onClick={(e) => {
							e.stopPropagation();
							removeFaq(index);
						}}
						style={{ marginTop: "0.5rem" }}
					>
						Delete
					</Button>
				</div>
			))}
			<Button
				variant="primary"
				onClick={addFaq}
				style={{ marginTop: "0.5rem" }}
			>
				Add next question
			</Button>
		</div>
	);
}
