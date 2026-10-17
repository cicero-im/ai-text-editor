import { TrashCan } from "@carbon/icons-react";
import type React from "react";
import { memo } from "react";

import BaseButton from "./BaseButton";

const DeleteButton = memo(
	({
		setIsDelete,
	}: {
		setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
	}) => {
		return <BaseButton icon={<TrashCan />} onClick={() => setIsDelete(true)} />;
	},
);

export default DeleteButton;
