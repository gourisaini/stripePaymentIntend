import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { ListItem } from '@mui/material';
import StripePayment from './Stripe';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ open, handleClose, totalPrice,setPaymentSuccess }) {

  return (
    <>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Payment
            </Typography>

          </Toolbar>
        </AppBar>
        <List>
          < ListItem>
          <StripePayment totalPrice={totalPrice} onClose={handleClose} setPaymentSuccess={setPaymentSuccess}/>
          </ ListItem>
        </List>
      </Dialog>
    </>
  );
}