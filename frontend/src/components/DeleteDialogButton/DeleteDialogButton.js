import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteButtonThemeProvider from '../../themes/DeleteButtonThemeProvider';
import CancelButtonThemeProvider from '../../themes/CancelButtonThemeProvider';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteDialogButton = ({ confirmAction }) =>  {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        <DeleteButtonThemeProvider>
            <Button variant='contained' onClick={handleClickOpen} style={{marginLeft: '10px'}}>
                <DeleteIcon style={{ fontSize: 18 }}/>
            </Button>
        </DeleteButtonThemeProvider>   
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Delete this item"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this item?
                This action cannot be undone.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <CancelButtonThemeProvider>
              <Button onClick={confirmAction} autoFocus>Delete</Button>
            </CancelButtonThemeProvider>
            </DialogActions>
        </Dialog>
    </>
  );
}

export default DeleteDialogButton