import FigureContainer from "./FigureContainer";
import figureList from "../configs/figureList";

export default function FiguresList() {
    return (
        figureList.map(({src, translation, textAreaSize}, index) => {
            return (
                <FigureContainer
                    key={index}
                    src={src}
                    translation={translation}
                    textAreaSize={textAreaSize}
                />
            )
        })
    )
}