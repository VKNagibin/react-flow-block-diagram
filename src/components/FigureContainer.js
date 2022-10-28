import styled from "styled-components";

const Wrapper = styled.div`
  width: 180px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`

const FigureComponent = styled.img`
  display: block;
`

export default function FigureContainer({src, translation, textAreaSize}) {
    const translate = translation ?  translation : 0;
    const textArea = textAreaSize ?  textAreaSize : null;
    const onDragStart = (event, nodeType, src) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('data/src', src);
        event.dataTransfer.setData('data/translation', translate);
        event.dataTransfer.setData('data/textAreaSize', textArea);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Wrapper>
            <FigureComponent
                className='figure'
                src={src}
                onDragStart={(event) => onDragStart(event, 'imageNode', src)}
                draggable
            />
        </Wrapper>
    )
}