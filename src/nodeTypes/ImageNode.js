import { Handle, Position } from 'reactflow';
import styled from "styled-components";
import {useState} from "react";

const ImageNodeWrapper = styled.div`
  height: fit-content;
  position: relative;
  width: fit-content;
  transform: scale(1.5);
`

const styles = `
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  overflow: hidden;
  text-align: center;
  height: 60%;
  font-size: .8rem;
  border: none;
  transform: translate(-50%, -50%);
`
const InputComponent = styled.textarea`
  resize: none;
  ${styles};
  overflow: auto;
`

const Text = styled.span`
  ${styles}
`

const ImageNodeElement = styled.img`
  display: block;
`

export default function ImageNode({ data }) {
    const translation = data.translation > 0 ? data.translation + 'px' : 'none';
    const [ showInput, setShowInput ] = useState(false);
    const [content, setContent] = useState(data.content);
    const handleDoubleClick = () => {
        setShowInput(true)
    }
    const onBlur = () => {
        setShowInput(false)
        data.setText(content);
    }

    const onKeyDown = (e) => {
        if (e.key !== 'Enter') return
        onBlur()
    }

    const onInput = (e) => {
        setContent(e.target.value)
    }
    return (
        <ImageNodeWrapper onDoubleClick={handleDoubleClick}>
            { showInput ?
                <InputComponent
                    rows='2'
                    value={content}
                    onBlur={onBlur}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                /> :
                <Text style={{ width: data.textArea }}>
                    { data.content }
                </Text>
            }
            <Handle type='target' position={Position.Top} style={{left: '50%'}}/>
            <ImageNodeElement
                src={data.src}
            />
            <Handle
                type='source'
                position={Position.Left}
                id='a'
                style={{left: translation}}
            />
            <Handle
                type='source'
                position={Position.Right}
                id='b'
                style={{right: translation}}
            ></Handle>
            <Handle type='target' position={Position.Bottom} id='c' style={{left: '50%'}} ></Handle>
        </ImageNodeWrapper>
    )
}
