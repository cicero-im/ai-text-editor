import { Checkmark, Copy } from "@carbon/icons-react";
import type React from "react";
import { useState } from "react";
import BaseButton from "./BaseButton";

const CopyButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	return (
		<BaseButton
			icon={isCopied ? <Checkmark /> : <Copy />}
			onClick={(e) => {
				onClick(e);
				setIsCopied(true);
				window.setTimeout(() => {
					setIsCopied(false);
				}, 3000);
			}}
		/>
	);
};

export default CopyButton;
