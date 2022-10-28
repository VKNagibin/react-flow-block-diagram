import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from "styled-components";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '246px',
    borderRadius: '4px',
    background: '#FFFFFF',
    boxShadow: 24,
    padding: '16px',
};

const buttonStyles = {
    textTransform: 'capitalize',
    position: 'absolute',
    padding: '2px 10px',
    bottom: '16px',
    right: '16px',
};

const File = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  background: transparent;
`

const HeadingStyles = {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    fontSize: '22px',
    padding: 0
}

export default function ImportModal({open, handleHideModal, changeRFInstance}) {
    const handleFile = (e) => {
        if (!e.target.files[0]) return
        handleHideModal();
        const reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = (e) => {
            changeRFInstance(JSON.parse(e.target.result));
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleHideModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={HeadingStyles}
                    >
                        Хотите продолжить?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: '500' }}>
                        Импортирование схемы, приведет к потере текущих наработок. Что бы сохранить текущие изменения - экспортируйте их.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button sx={buttonStyles} onClick={() => handleHideModal()}>Отменить</Button>
                        <Button
                            sx={{...buttonStyles, right: '132px'}}
                        >
                            продолжить
                            <File
                                type='file'
                                accept='.rffc'
                                onChange={handleFile}
                            >
                            </File>
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
