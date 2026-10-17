import Toggle from "@components/Toggle";
import useStore from "@store/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AdvancedModeToggle = () => {
	const { t } = useTranslation();

	const setAdvancedMode = useStore((state) => state.setAdvancedMode);

	const [isChecked, setIsChecked] = useState<boolean>(
		useStore.getState().advancedMode,
	);

	useEffect(() => {
		setAdvancedMode(isChecked);
	}, [isChecked, setAdvancedMode]);

	return (
		<Toggle
			label={t("advancedMode") as string}
			isChecked={isChecked}
			setIsChecked={setIsChecked}
		/>
	);
};

export default AdvancedModeToggle;
