<Collapse in={open}>
<Alert
    sx={{ mb: 2 }}
    >
    Spawned one more TikTok! Enjoy your brainrot!~
</Alert>
</Collapse>
            <Modal
            open={modalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                this is why we cannot have nice things.<br/>
                i must take this power away from you.<br/>
                press "ok" to go back to reading the information page.<br/><br/>
                <Button sx={{position: "relative", left: "50%", transform: "translateX(-50%)"}} onClick={() => setModalOpen(false)}>ok</Button>
            </Box>
        </Modal>
        <Collapse in={achieveOpen} sx={{position: "absolute", left: 0, bottom: 0}}>
                    <Alert
                        severity="info"
                        sx={{ mb: 2 }}
                        >
                        {insertText}
                    </Alert>
                </Collapse>
{/*adhdMode &&
                <div style={{columnGap: "5px", display: "grid", gridTemplateColumns: "auto auto", position: "fixed",bottom: 10,right: 10,zIndex: 9999}}>
                <Tooltip title="Remove distractions" arrow>
                    <IconButton sx={{bottom: "5px", opacity: count === 1 ? 0 : 1}}><RemoveCircle /></IconButton>
                </Tooltip>
                <Tooltip title="Indulge the zoomers' attention span issues" arrow>
                    <Chip label="ADHD Mode" onClick={handleClick} />  
                </Tooltip>
                
                </div>*/}