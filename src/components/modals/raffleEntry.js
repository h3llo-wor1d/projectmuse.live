import { Button, Modal, Typography, Box } from "@mui/material";
import { useState } from "react";
import DiscordButton from "../DiscordButton";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function RaffleEntry(props) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal
            open={open}
            onClose={() => setOpen(false)}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Register For Project Muse
                    </Typography>
                    <p id="modal-modal-description" sx={{ mt: 2 }}>
                        First things first, we need to register your discord account so we can add you to the server automatically once you have paid!
                    </p>

                    <DiscordButton />
                </Box>
            </Modal>
        </div>
    )
}

/*
<Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
*/