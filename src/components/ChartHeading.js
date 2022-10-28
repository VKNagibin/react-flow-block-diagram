import styled from "styled-components";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useState} from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {TextField} from "@mui/material";

const ChartHeader = styled.div`
  font-family: 'Inter', sans-serif;
  width: 1440px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`

const Heading = styled.h1`
  margin-left: 16px;
`

const IconsBlock = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  height: max-content;

  & .icon {
    border-radius: 4px;
    box-sizing: content-box;
    transform: scale(2);
    padding: 2px;
  }

  & .icon:hover {
    background: #D9D9D9;
  }
`

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        width: '280px',
        boxSizing: 'content-box',
        outline: 'none !important',
        height: '55px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '32px',
        padding: '0 16px',
    },
});

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        background: 'rgba(97, 97, 97, 0.92)',
        borderRadius: '4px',
        padding: '8px',
        fontSize: '14px',
        lineHeight: '17px',
    },
}));

export default function ChartHeading({title, handleShowModal, handleExport, changeHeading}) {
    const [content, setContent] = useState(title);
    const [previousContent, setPreviousContent] = useState(title);
    const [isHeading, setIsHeading] = useState(true)

    const HandleDoubleClick = (e) => {
        e.preventDefault();
        setPreviousContent(content)
        setIsHeading(false);
    };

    const setNewTitle = () => {
        if(content.trim() === '') {
            setContent(previousContent)
        }
        setIsHeading(true);
        changeHeading(content);
    }

    const handleEnterTap = (e) => {
        if(e.key !== 'Enter') return
        setNewTitle()
    };

    return (
        <ChartHeader>
            { isHeading ?
            <Heading
                className='heading-typo'
                onDoubleClick={HandleDoubleClick}
            >
                {content}
            </Heading> :
                <CssTextField
                    id="outlined-required"
                    value={content}
                    onInput={(e) => setContent(e.target.value)}
                    onBlur={setNewTitle}
                    onKeyDown={handleEnterTap}
                />
            }
            <IconsBlock>
                <HtmlTooltip title="Import chart">
                    <FileDownloadIcon
                        onClick={() => handleShowModal()}
                        className='custom-cursor icon'
                    />
                </HtmlTooltip>
                <HtmlTooltip title="Export chart">
                    <FileUploadIcon
                        onClick={() => handleExport()}
                        className='custom-cursor icon'
                        style={{marginRight: '26px', marginLeft: '36px'}}
                    />
                </HtmlTooltip>
            </IconsBlock>
        </ChartHeader>
    )
}