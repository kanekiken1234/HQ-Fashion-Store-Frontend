
import { Link, useHistory } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { Divider, Grid, Paper, Typography, } from '@material-ui/core';



const Review = () => {
  const history = useHistory();

  const handleProceed = () => {
    history.replace('/')
  }

  return (
    <Grid style={{ marginTop: '5rem' }} container justify='center' alignItems='center'>
      <Paper elevation={10} style={{
        padding: '2rem',
        width: '50%',
        height: 'auto'
      }}>
        <div style={{ margin: '1rem', height: 'auto' }}>
          <CheckIcon fontSize='large' style={{ margin: '0.5rem' }} />
          <Typography variant='h3'>Payment Successful</Typography>
          <br />
          <Divider />
        </div>
        <Typography variant='h6'>Thank you</Typography>
        <Link onClick={handleProceed} >Proceed</Link>
      </Paper>
    </Grid>
  );
}

export default Review;