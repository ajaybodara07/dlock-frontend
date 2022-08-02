import axios from 'axios'
import {
  AUTH_ERROR,
  LIST_SITES,
  LIST_AIRCRAFTS,
  ADD_AIRCRAFT,
  ADD_ITEM,
  EDIT_AIRCRAFT,
  EDIT_ITEM,
  LIST_ITEMS,
  LIST_CABINETS,
  LIST_COMPARTMENTS,
  DELETE_COMPARTMENT,
  SWITCH_SITE,
  SITE_STATS,
  DELETE_AIRCRAFT,
  DELETE_ITEM,
  EDIT_COMPARTMENT,
  LIST_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  LOAD_TASKS,
  LIST_REPORTS,
} from './types'
import { setToast } from './toast'
import { API } from 'aws-amplify'
import store from '../store'
import { v4 as uuidv4 } from 'uuid'
const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
}
export const switchSite = (siteID) => async (dispatch) => {
  console.log('switch site', siteID)
  dispatch({
    type: SWITCH_SITE,
    payload: siteID,
  })

  dispatch(listCabinets(siteID))
}

// Get Site Stats
export const getSiteStats = (siteID) => async (dispatch) => {
  // const organization = store.getState().auth.organization;
  // const res = await axios.get(
  //   `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/stats`
  // );

  dispatch({
    type: SITE_STATS,
    payload: { siteID, siteStats: {} },
  })
}

// List Sites
export const listSites = () => async (dispatch) => {
  const organization = store.getState().auth.organization

  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites`
    )

    dispatch({
      type: LIST_SITES,
      payload: res.data.data.items.sort((a, b) => b.siteName < a.siteName),
    })
  } catch (err) {
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Sites'))
    }
  }
}

// List Aircrafts
export const listAircrafts = (siteID) => async (dispatch) => {
  const organization = store.getState().auth.organization

  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/aircraft`
    )

    dispatch({
      type: LIST_AIRCRAFTS,
      payload: { siteID, aircrafts: res.data.data.items },
    })
  } catch (err) {
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Aircrafts'))
    }
  }
}

// List Items
export const listItems = (siteID) => async (dispatch) => {
  const organization = store.getState().auth.organization

  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/items`
    )

    dispatch({
      type: LIST_ITEMS,
      payload: { siteID, items: res.data.data.items },
    })
  } catch (err) {
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Items'))
    }
  }
}

// List Cabinets
export const listCabinets = (siteID) => async (dispatch) => {
  const organization = store.getState().auth.organization
  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/cabinets`
    )

    dispatch({
      type: LIST_CABINETS,
      payload: {
        siteID,
        cabinets: res.data.data.items.sort(
          (a, b) => b.cabinetName < a.cabinetName
        ),
      },
    })
  } catch (err) {
    console.log(err.message)
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Cabinets'))
    }
  }
}

// List Compartments
export const listCompartments = (siteID, cabinetID) => async (dispatch) => {
  const organization = store.getState().auth.organization

  const formatCompartmentID = (id) => {
    console.log(id, 'IDDD')
    if (id <= 20) {
      return `A${id}`
    } else if (id <= 40) {
      return `B${id - 20}`
    } else if (id <= 53) {
      return `C${id - 40}`
    } else if (id <= 66) {
      return `D${id - 53}`
    } else if (id <= 79) {
      return `E${id - 66}`
    } else if (id <= 92) {
      return `F${id - 79}`
    } else if (id <= 112) {
      return `G${id - 92}`
    } else if (id <= 132) {
      return `H${id - 112}`
    }
  }

  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/cabinets/${cabinetID}/compartments`
    )

    const items = res.data.data.items

    dispatch({
      type: LIST_COMPARTMENTS,
      payload: {
        cabinetID,
        compartments: items
          .sort(
            (a, b) =>
              a.compartmentID.substring(a.compartmentID.lastIndexOf('-') + 1) -
              b.compartmentID.substring(b.compartmentID.lastIndexOf('-') + 1)
          )
          .map((c) => {
            return {
              ...c,
              // compartmentID: formatCompartmentID(c.compartmentID.substring(c.compartmentID.lastIndexOf("-") + 1)), //
            }
          }),
      },
    })

    // if (items.length === 0) {
    //   dispatch(registerCompartment({ siteID, cabinetID }));
    //   dispatch({
    //     type: LIST_COMPARTMENTS,
    //     payload: { cabinetID, compartments: null },
    //   });
    // } else {
    //   dispatch({
    //     type: LIST_COMPARTMENTS,
    //     payload: {
    //       cabinetID,
    //       compartments: items
    //         .sort((a, b) => a.compartmentID - b.compartmentID)
    //         .map((c) => {
    //           return {
    //             ...c,
    //             compartmentID: formatCompartmentID(c.compartmentID),
    //           };
    //         }),
    //     },
    //   });
    // }
  } catch (err) {
    console.log(err.message)
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Compartments'))
    }
  }
}

// List Tasks
export const listTasks = (siteID) => async (dispatch) => {
  const organization = store.getState().auth.organization
  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks`
    )
    dispatch({
      type: LIST_TASKS,
      payload: { siteID, tasks: res?.data?.data?.items },
    })
  } catch (err) {
    console.log(err.message)
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Tasks'))
    }
  }
}

// Register Compartment
export const registerCompartment =
  ({ siteID, cabinetID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      await axios.put(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/cabinets/${cabinetID}/compartments`,
        {
          itemID: '',
          cabinetID,
          compartmentType: 'small',
          compartmentState: 'empty',
          organisationID: organization,
          siteID,
        }
      )

      console.log('done putting compartments')
      dispatch(listCompartments(siteID, cabinetID))
      dispatch(setToast('success', 'Compartments registered'))
    } catch (err) {
      console.log(err.message)
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Register Compartment'))
      }
    }
  }

// Register Aircraft
export const registerAircraft =
  ({ customer, manufacturer, model, reg, status, itemID, siteID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      const res = await axios.put(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/aircraft`,
        {
          customer,
          aircraftManufacturer: manufacturer,
          aircraftModel: model,
          aircraftReg: reg,
          aircraftStatus: status,
          organisationID: organization,
          itemID: itemID || '0',
          siteID,
        }
      )

      const item = res.data.data.item

      dispatch({
        type: ADD_AIRCRAFT,
        payload: { siteID, aircraft: item },
      })
      dispatch(setToast('success', 'Aircraft registered'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Register Aircraft'))
      }
    }
  }

// Register Task
export const registerTask =
  ({
    taskCode,
    aircraftReg,
    taskName,
    description,
    taskStatus,
    siteID,
    targetUserID,
  }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      const res = await axios.put(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks`,
        {
          id: uuidv4(),
          taskID: '0000' + taskCode.split('-').join('0000'),
          aircraftReg,
          // description,
          taskName,
          taskStatus,
          // siteID,
          itemIDs: [],
          // targetUserID
        }
      )
      console.log(res.data)
      const item = res.data.data.item
      dispatch({
        type: ADD_TASK,
        payload: { siteID, task: item },
      })
      dispatch(setToast('success', 'Task registered'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Register Task'))
      }
    }
  }

// Load Tasks
export const loadTasks =
  ({ siteID, tasks }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    console.log({ tasks })
    try {
      console.log('tasks')
      console.log(tasks)
      const tasksList = tasks.map((t) => ({
        id: uuidv4(),
        aircraftReg: t.project,
        description: t.description,
        taskStatus: t.status,
        itemIDs: [],
        taskID: '0000' + t.card_number.toString().split('-').join('0000'),
        siteID: siteID,
      }))
   let resp =   tasks.map(async (t) => {
      let res =  await axios.put(
          `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks`,
          {
            id: uuidv4(),
            // aircraftReg:"JA8088",      
            aircraftReg:t.project,      
            itemIDs: [],
            description: t.description,
            taskStatus:t.status,
            taskID: '0000' + t.card_number.toString().split('-').join('0000'),
            siteID: siteID,
          }
        )
        return res
     } )
     Promise.all(resp)
     .then(results => {
       console.log(results)
       dispatch({
        type: LOAD_TASKS,
        payload: { siteID, tasks: tasksList },
      })
      dispatch(setToast('success', 'Tasks loaded'))

       // Handle results
     })
     .catch(e => {
       console.error(e);
     })
      // const res = await axios.put(
      //   `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks/load`,
      //   {
      //     id: uuidv4(),
      //     aircraftReg: t.project,
      //     description: t.description,
      //     taskStatus: t.status,
      //     taskID: '0000' + t.card_number.toString().split('-').join('0000'),
      //     siteID: siteID,
      //   }
      // )

      // console.log('res')
      // console.log(res)

      // const item = res.data

      // dispatch({
      //   type: LOAD_TASKS,
      //   payload: { siteID, tasks: tasksList },
      // })
      // dispatch(setToast('success', 'Tasks loaded'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        console.log(err)
        dispatch(setToast('error', 'Error occured Load Tasks'))
      }
    }
  }

// Register Item
export const registerItem =
  ({ itemID, itemName, itemType, itemStatus, itemMaintenanceDate, siteID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      const res = await axios.put(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/items`,
        {
          itemID,
          itemName,
          itemType,
          itemStatus,
          itemMaintenanceDate: itemMaintenanceDate
            .split('-')
            .reverse()
            .join('/'),
          siteID,
        }
      )

      const item = res.data.data.item

      dispatch({
        type: ADD_ITEM,
        payload: { siteID, item },
      })
      dispatch(setToast('success', 'Item registered'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Item Register'))
      }
    }
  }

// Edit Aircraft
export const editAircraft =
  ({ customer, manufacturer, model, reg, status, itemID, siteID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      // console.log("reg:", reg);
      // const res = await API.get(
      //   "aircraftsApi",
      //   `/organisations/${organization}/sites/${siteID}/aircraft/object/${reg}/${siteID}`
      // );
      // console.log("get res");
      // console.log(res);
      const res = await axios.patch(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/aircraft/${reg}`,
        {
          aircraftClientName: customer,
          aircraftManufacturer: manufacturer,
          aircraftModel: model,
          aircraftStatus: status,
          itemID: itemID || '0',
          siteID,
        }
      )
      const item = res.data.data.item
      console.log(res)
      dispatch({
        type: EDIT_AIRCRAFT,
        payload: { siteID, aircraft: { aircraftReg: reg, ...item } },
      })
      dispatch(setToast('success', 'Aircraft updated'))
    } catch (err) {
      console.log(err)
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Edit Aircraft'))
      }
    }
  }

// Edit Item
export const editItem =
  ({ itemID, itemName, itemType, itemStatus, itemMaintenanceDate, siteID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      console.log('item', {
        itemName,
        itemType,
        itemStatus,
        itemMaintenanceDate,
        siteID,
      })
      const res = await axios.patch(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/items/${itemID}`,
        {
          itemName,
          itemType,
          itemStatus,
          itemMaintenanceDate: itemMaintenanceDate
            .split('-')
            .reverse()
            .join('/'),
          siteID,
        }
      )
      const item = res.data.data.item
      dispatch({
        type: EDIT_ITEM,
        payload: { siteID, item: { itemID, ...item } },
      })
      dispatch(setToast('success', 'Item updated'))
    } catch (err) {
      console.log(err)
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Edit Item'))
      }
    }
  }

// Edit Task
export const editTask =
  ({
    id,
    taskCode,
    taskName,
    aircraftReg,
    description,
    taskStatus,
    targetUser,
    siteID,
  }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      console.log('task', {
        id,
        taskID: taskCode,
        taskName,
        aircraftReg,
        description,
        taskStatus,
        siteID,
        targetUserID: targetUser,
      })

      const res = await axios.patch(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks/${taskCode}`,
        {
          taskID: taskCode,
          aircraftReg,
          description,
          taskStatus,
          siteID,
          taskName,
          itemIDs: [],
          targetUserID: targetUser,
        },
        headers
      )

      const task = res.data.data.item

      dispatch({
        type: EDIT_TASK,
        payload: { siteID, task: { id, ...task } },
      })
      dispatch(setToast('success', 'Task updated'))
    } catch (err) {
      console.log(err)
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Edit Task'))
      }
    }
  }

// Edit Compartment
export const editCompartment =
  ({ id, siteID, cabinetID, compartmentID, compartmentType }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization
    try {
      console.log({
        id,
        siteID,
        cabinetID,
        compartmentID,
        compartmentType,
      })
      // const res = await API.patch(
      //   "compartmentsApi",
      //   `/organisations/${organization}/sites/${siteID}/cabinets/${cabinetID}/compartments/${id}/${siteID}`,
      //   {
      //     body: {
      //       id,
      //       itemID: "",
      //       cabinetID,
      //       compartmentID,
      //       compartmentType,
      //       compartmentState: "empty",
      //       organisationID: organization,
      //       siteID,
      //     },
      //   }
      // );

      // const compartment = res.data;
      // console.log("compartment");
      // console.log(compartment);

      // dispatch({
      //   type: EDIT_COMPARTMENT,
      //   payload: { cabinetID, compartment },
      // });
      // dispatch(setToast("success", "Compartment updated"));
    } catch (err) {
      console.log(err)
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Edit Compartment'))
      }
    }
  }

// Delete requests

// delete Aircraft
export const deleteAircraft =
  ({ reg, siteID }) =>
  async (dispatch) => {
    console.log('kk delete')
    const organization = store.getState().auth.organization
    try {
      // await axios.delete(
      //   `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/aircraft/${reg}`
      // );
      // dispatch({
      //   type: DELETE_AIRCRAFT,
      //   payload: { siteID, reg },
      // });
      // dispatch(setToast("success", "Aircraft deleted"));
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Delete Aircraft'))
      }
    }
  }

// delete Item
export const deleteItem =
  ({ itemID, siteID }) =>
  async (dispatch) => {
    console.log('kk delete')
    const organization = store.getState().auth.organization
    try {
      await axios.delete(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/items/${itemID}`
      )
      dispatch({
        type: DELETE_ITEM,
        payload: { siteID, itemID },
      })
      dispatch(setToast('success', 'Item deleted'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Delete Item'))
      }
    }
  }

// delete Compartment
export const deleteCompartment =
  ({ cabinetID, id }) =>
  async (dispatch) => {
    console.log('kk delete compartments')
    const organization = store.getState().auth.organization
    const siteID = store.getState().site.currentSiteID
    try {
      const res = await API.del(
        'compartmentsApi',
        `/organisations/${organization}/sites/${siteID}/cabinets/${cabinetID}/compartments/object/${id}/${siteID}`,
        {
          body: {
            id,
          },
        }
      )

      console.log('res')
      console.log(res)

      dispatch({
        type: DELETE_COMPARTMENT,
        payload: { cabinetID, id },
      })
      dispatch(setToast('success', 'Compartment deleted'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Delete Compartment'))
      }
    }
  }

// delete Task
export const deleteTask =
  ({ siteID, id }) =>
  async (dispatch) => {
    console.log('kk delete task')
    const organization = store.getState().auth.organization
    try {
      await axios.delete(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks/${id}`
      )
      dispatch({
        type: DELETE_TASK,
        payload: { siteID, id },
      })
      dispatch(setToast('success', 'Task deleted'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Delete Task'))
      }
    }
  }
export const archiveTask =
  ({ siteID, task }) =>
  async (dispatch) => {
    console.log('kk delete task')
    const organization = store.getState().auth.organization
    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      Promise.all(
        task.map(async (tasks) => {
          const { aircraftReg, taskID, taskName, userID } = tasks
          const res = await axios.patch(
            `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${siteID}/tasks/${taskID}`,
            {
              taskID,
              aircraftReg,
              taskStatus: 'complete',
              siteID,
              taskName,
              itemIDs: [],
              targetUserID: userID,
            },
            headers
          )

          const task = res.data.data.item

          dispatch({
            type: EDIT_TASK,
            payload: { siteID, task: { id: taskID, ...task } },
          })
        })
      )

      dispatch(setToast('success', 'Task updated'))
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch({
          type: AUTH_ERROR,
        })
        dispatch(setToast('error', 'Session expired'))
      } else {
        dispatch(setToast('error', 'Error occured Delete Task'))
      }
    }
  }
export const getReports = async ({ siteID, task }) => {}
export const listReports = (body) => async (dispatch) => {
  console.log(body);
  const {beforeDate,afterDate,currentSiteID,user}  = body
  const organization = store.getState().auth.organization

  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${currentSiteID}/compartmentLogs?targetUserID=${user}&timestampAfter=${beforeDate}&timestampBefore=${afterDate}`,
      headers
    )
    console.log(res.data, '........!!!!res.data')
    dispatch({
      type: LIST_REPORTS,
      payload: res.data.data.items,
    })
    dispatch(setToast('success', 'Reports Loaded'))

  } catch (err) {
    if (err.message === 'Network Error') {
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch(setToast('error', 'Session expired'))
    } else {
      dispatch(setToast('error', 'Error occured List Sites'))
    }
  }
}
