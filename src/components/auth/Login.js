import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { useHistory } from 'react-router-dom'

import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    background: '#1D2938',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#29394D',
  },
  collapseItem: {
    marginTop: theme.spacing(0.5),
  },
  card: {
    background: '#29394D',
    color: '#fff',
    borderRadius: 0,
  },
  button: {
    borderRadius: 30,
    padding: '10px 20px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 10, 10),
    borderRadius: 30,
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      padding: theme.spacing(10, 5, 10, 5),
    },
  },
  cardHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  loader: {
    color: '#1a90ff',
    animationDuration: '550ms',
  },
}))

const Home = ({ login }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <Fade in={true}>
        <div className={classes.paper}>
          <h2 id='transition-modal-title'>Login</h2>
          <p id='transition-modal-description'>
            <Formik
              initialValues={{
                username: '',
                password: '',
                // username: 'user_id1',
                // password: '12121212',
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await login(values.username, values.password)

                setTimeout(async () => {
                  history.push('/')
                }, 500)
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <Grid container spacing={2} direction='column'>
                    <Grid item>
                      <TextField
                        name='username'
                        style={{ width: '100%' }}
                        id='filled-basic'
                        label='Username'
                        onChange={handleChange}
                        variant='filled'
                        value={values.username}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        name='password'
                        style={{ width: '100%' }}
                        id='filled-basic'
                        label='Password'
                        onChange={handleChange}
                        variant='filled'
                        type='password'
                        value={values.password}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    style={{ marginTop: 20 }}
                    justify='flex-end'
                  >
                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        type='submit'
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        style={{ width: 120 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            className={classes.loader}
                            size={25}
                            thickness={4}
                          />
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container justify='center'>
                    <Grid item>
                      <p
                        onClick={() => history.push('/register')}
                        style={{ padding: '0 20px', cursor: 'pointer' }}
                      >
                        Sign Up
                      </p>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </p>
        </div>
      </Fade>
    </div>
  )
}

export default connect(null, { login })(Home)
