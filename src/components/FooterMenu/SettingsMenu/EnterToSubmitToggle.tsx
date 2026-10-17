import Toggle from "@components/Toggle";
import useStore from "@store/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const EnterToSubmitToggle = () => {
	const { t } = useTranslation();

	const setEnterToSubmit = useStore((state) => state.setEnterToSubmit);

	const [isChecked, setIsChecked] = useState<boolean>(
		useStore.getState().enterToSubmit,
	);

	useEffect(() => {
		setEnterToSubmit(isChecked);
	}, [isChecked, setEnterToSubmit]);

	return (
		<Toggle
			label={t("enterToSubmit") as string}
			isChecked={isChecked}
			setIsChecked={setIsChecked}
		/>
	);
};

export default EnterToSubmitToggle;
