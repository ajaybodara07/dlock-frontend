import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  listTasks,
  loadTasks,
  registerTask,
  editTask,
  deleteTask,
  archiveTask,
} from '../../actions/site'
import MainLayout from '../layout/MainLayout'
import Spinner from '../layout/Spinner'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Table from './TasksTable'
import Modal from '../modal/Modal'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import XLSX from 'xlsx'
import { listUsers } from '../../actions/user'

const useStyles = makeStyles((theme) => ({
  nested: {
    width: '95%',
    margin: 'auto',
  },
  formControl: {
    width: '100%',
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
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      padding: theme.spacing(10, 10, 10),
    },
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

const Users = ({
  site: { currentSiteID, tasks, loading, aircrafts },
  listTasks,
  loadTasks,
  registerTask,
  editTask,
  deleteTask,
  listUsers,
  archiveTask,
  user,
}) => {
  const classes = useStyles()

  const [assignMemberModal, setAssignMemberModal] = useState(false)
  const [addUserModal, setAddUserModal] = useState(false)
  const [loadingTask, setLoadingTask] = useState(false)

  const inputRef = useRef(null)

  const lowercaseKeys = (data) => {
    return data.map((obj) => {
      var key,
        keys = Object.keys(obj)
      var n = keys.length
      var newobj = {}
      while (n--) {
        key = keys[n]
        newobj[key.toLowerCase()] = obj[key]
      }

      return newobj
    })
  }

  const loadTasksLocal = (e) => {
    console.log('Reading CSV')
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = function async(e) {
      const data = e.target.result
      const readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0] // select first Sheet
      const ws = readedData.Sheets[wsname] // ws = worksheet

      const dataParse = XLSX.utils.sheet_to_json(ws)

      const rowData = lowercaseKeys(dataParse)
      console.log(rowData, 'Rowdata')
      setLoadingTask(true)
      loadTasks({ siteID: currentSiteID, tasks: rowData }).then(() =>
        setLoadingTask(false)
      )
    }
    reader.readAsBinaryString(file)
  }
  useEffect(() => {
    currentSiteID && listUsers()
  }, [])
  useEffect(() => {
    if (!loading) {
      listTasks(currentSiteID)
    }
    // eslint-disable-next-line
  }, [loading])

  const headCells = [
    {
      id: 'taskCode',
      numeric: true,
      disablePadding: false,
      label: 'Task Code',
    },
    {
      id: 'taskNode',
      numeric: true,
      disablePadding: false,
      label: 'Task Name',
    },
    {
      id: 'aircraftReg',
      numeric: false,
      disablePadding: false,
      label: 'Aircraft Reg',
    },
    // {
    //   id: "description",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Description",
    // },
    {
      id: 'taskStatus',
      numeric: true,
      disablePadding: false,
      label: 'Task Status',
    },
  ]

  return (
    <MainLayout title='Tasks'>
      {currentSiteID ? (
        !loadingTask && !loading && tasks && tasks[currentSiteID] ? (
          <>
            <Button
              type='submit'
              onClick={() => setAddUserModal(true)}
              className={classes.button}
              variant='contained'
              color='primary'
              style={{ width: 120, marginBottom: 30 }}
            >
              Add Task
            </Button>
            <Button
              type='submit'
              onClick={() => inputRef.current.click()}
              className={classes.button}
              variant='contained'
              color='primary'
              style={{ width: 140, marginBottom: 30, marginLeft: 30 }}
            >
              Load Tasks
            </Button>
            <input
              ref={inputRef}
              type='file'
              onChange={(e) => loadTasksLocal(e)}
              style={{ display: 'none' }}
            />
            <Table
              rows={tasks[currentSiteID]}
              headCells={headCells}
              setAssignMemberModal={setAssignMemberModal}
              id={currentSiteID}
              editTask={editTask}
              deleteTask={deleteTask}
              archiveTask={archiveTask}
              user={user}
              aircrafts={aircrafts[currentSiteID]}
            />
            {/* {Object.keys(users).map((role) => {
          return (
            <Table
              title={role}
              rows={users[role]}
              headCells={headCells}
              setAssignMemberModal={setAssignMemberModal}
            />
          );
        })} */}
          </>
        ) : (
          <Spinner />
        )
      ) : (
        <p>No site selected</p>
      )}
      {/* Assign Group User Modal */}
      <Modal
        open={assignMemberModal}
        setOpen={setAssignMemberModal}
        title='Assign Group Member'
      >
        <Formik
          initialValues={{ id: '', aircraftName: '' }}
          onSubmit={(values) => {
            setTimeout(() => {
              console.log('submitted')
              setAssignMemberModal(false)
            }, 500)
            console.log(values)
          }}
        >
          {({ handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction='column'>
                <Grid item>
                  <TextField
                    name='id'
                    style={{ width: '100%' }}
                    id='filled-basic'
                    label='Aircraft ID'
                    onChange={handleChange}
                    variant='filled'
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='aircraftName'
                    style={{ width: '100%' }}
                    id='filled-basic'
                    label='Aircraft Name'
                    onChange={handleChange}
                    variant='filled'
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
                <Grid item>
                  <Button
                    onClick={() => setAssignMemberModal(false)}
                    className={classes.button}
                    variant='contained'
                    color='default'
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
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
                      'Save'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* Add User Modal */}
      <Modal
        // modalStyle={{ alignItems: "flex-start" }}
        open={addUserModal}
        setOpen={setAddUserModal}
        title='Add Task'
      >
        <Formik
          initialValues={{
            taskCode: '',
            aircraftReg: '',
            description: '',
            taskStatus: '',
            targetUserID: '',
            taskName: '',
          }}
          onSubmit={async (values) => {
            await registerTask({
              taskCode: values.taskCode,
              taskName: values.taskName,
              aircraftReg: values.aircraftReg,
              description: values.description,
              taskStatus: values.taskStatus,
              targetUserID: values.targetUserID,
              siteID: currentSiteID,
            })
            setAddUserModal(false)
          }}
        >
          {({ handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction='column'>
                <Grid item>
                  <TextField
                    name='taskCode'
                    style={{ width: '100%' }}
                    id='filled-basic'
                    label='Task Code'
                    onChange={handleChange}
                    variant='filled'
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='taskName'
                    style={{ width: '100%' }}
                    id='filled-basic'
                    label='Task Name'
                    onChange={handleChange}
                    variant='filled'
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant='filled'
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id='aircraftReg'>Aircraft Reg</InputLabel>
                    <Select
                      name='aircraftReg'
                      labelId='aircraftReg'
                      onChange={handleChange}
                      required
                    >
                      {aircrafts[currentSiteID]?.map((data) => (
                        <MenuItem value={data.aircraftReg}>
                          {data.aircraftReg}
                        </MenuItem>
                      ))}
                      <MenuItem value='Aircraft Reg name'>
                        Aircraft Reg name
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="targetUserID">Target User</InputLabel>
                    <Select
                      name="targetUserID"
                      labelId="targetUserID"
                      onChange={handleChange}
                      required
                    >
                      {user?.users.map(data=>
                          <MenuItem value={data.userID}>
                          {data.name}
                           </MenuItem>
                      )}
                    
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item>
                  <FormControl
                    variant='filled'
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id='user-role'>Task Status</InputLabel>
                    <Select
                      name='taskStatus'
                      labelId='taskStatus'
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value='complete'>Completed</MenuItem>
                      <MenuItem value='active'>Active</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify='flex-end'
              >
                <Grid item>
                  <Button
                    onClick={() => setAddUserModal(false)}
                    className={classes.button}
                    variant='contained'
                    color='default'
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
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
                      'Save'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </MainLayout>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  site: state.site,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  listTasks,
  loadTasks,
  registerTask,
  editTask,
  deleteTask,
  listUsers,
  archiveTask,
})(Users)
