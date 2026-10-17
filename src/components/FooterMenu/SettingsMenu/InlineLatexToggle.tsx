import Toggle from "@components/Toggle";
import useStore from "@store/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const InlineLatexToggle = () => {
	const { t } = useTranslation();

	const setInlineLatex = useStore((state) => state.setInlineLatex);

	const [isChecked, setIsChecked] = useState<boolean>(
		useStore.getState().inlineLatex,
	);

	useEffect(() => {
		setInlineLatex(isChecked);
	}, [isChecked, setInlineLatex]);

	return (
		<Toggle
			label={t("inlineLatex") as string}
			isChecked={isChecked}
			setIsChecked={setIsChecked}
		/>
	);
};

export default InlineLatexToggle;
