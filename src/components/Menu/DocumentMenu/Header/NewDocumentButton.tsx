import { Add, DocumentAdd } from "@carbon/icons-react";
import defaultStyles from "@components/style";
import useAddDocument from "@hooks/useAddDocument";
import useStore from "@store/store";
import { useTranslation } from "react-i18next";

const NewDocumentButton = ({ folder }: { folder?: string }) => {
	const { t } = useTranslation();
	const addChat = useAddDocument();
	const generating = useStore((state) => state.generating);

	return (
		<a
			className={defaultStyles.buttonStyle}
			onClick={() => {
				if (!generating) addChat(folder);
			}}
			title={folder ? String(t("newDocument")) : ""}
		>
			{folder ? (
				<div className={defaultStyles.buttonStyle}>
					<Add size={16} />
				</div>
			) : (
				<DocumentAdd size={16} />
			)}
		</a>
	);
};

export default NewDocumentButton;
