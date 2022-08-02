import {
  LIST_SITES,
  LIST_AIRCRAFTS,
  ADD_AIRCRAFT,
  ADD_ITEM,
  EDIT_AIRCRAFT,
  LIST_ITEMS,
  EDIT_ITEM,
  LIST_CABINETS,
  LIST_COMPARTMENTS,
  DELETE_COMPARTMENT,
  SWITCH_SITE,
  SITE_STATS,
  DELETE_AIRCRAFT,
  DELETE_ITEM,
  ADD_COMPARTMENT,
  EDIT_COMPARTMENT,
  LIST_TASKS,
  ADD_TASK,
  LOAD_TASKS,
  EDIT_TASK,
  DELETE_TASK,
  LIST_REPORTS
} from "../actions/types";

const initialState = {
  sites: [],
  aircrafts: {},
  items: {},
  tasks: {},
  cabinets: {},
  compartments: {},
  currentSiteID: null,
  siteStats: {},
  loading: true,
  report:[]
};

export default function site(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SWITCH_SITE:
      return {
        ...state,
        currentSiteID: payload,
      };
    case LIST_SITES:
      return {
        ...state,
        sites: payload,
        loading: false,
      };
    case SITE_STATS:
      state.siteStats[payload.siteID] = payload.siteStats;
      return {
        ...state,
        loading: false,
      };
    case LIST_CABINETS:
      state.cabinets[payload.siteID] = payload.cabinets;
      return {
        ...state,
        loading: false,
      };
    case LIST_COMPARTMENTS:
      state.compartments[payload.cabinetID] = payload.compartments;
      return {
        ...state,
        loading: false,
      };
    case LIST_TASKS:
      state.tasks[payload.siteID] = payload.tasks;
      return {
        ...state,
        loading: false,
      };
    case LIST_ITEMS:
      state.items[payload.siteID] = payload.items;
      return {
        ...state,
        loading: false,
      };
    case LIST_AIRCRAFTS:
      state.aircrafts[payload.siteID] = payload.aircrafts;
      return {
        ...state,
        loading: false,
      };
    case ADD_AIRCRAFT:
      state.aircrafts[payload.siteID] = [
        payload.aircraft,
        ...state.aircrafts[payload.siteID],
      ];
      return {
        ...state,
        loading: false,
      };
    case ADD_ITEM:
      state.items[payload.siteID] = [
        payload.item,
        ...state.items[payload.siteID],
      ];
      return {
        ...state,
        loading: false,
      };
    case ADD_TASK:
      state.tasks[payload.siteID] = [
        payload.task,
        ...state.tasks[payload.siteID],
      ];
      return {
        ...state,
        loading: false,
      };
    case LOAD_TASKS:
      state.tasks[payload.siteID] = [
        ...payload.tasks,
        ...state.tasks[payload.siteID],
      ];
      return {
        ...state,
        loading: false,
      };
    case ADD_COMPARTMENT:
      state.compartments[payload.cabinetID] = [
        payload.compartment,
        ...state.compartments[payload.cabinetID],
      ];
      return {
        ...state,
        loading: false,
      };
    case EDIT_AIRCRAFT:
      state.aircrafts[payload.siteID] = state.aircrafts[
        payload.siteID
      ].map((a) =>
        a.aircraftReg === payload.aircraft.aircraftReg ? payload.aircraft : a
      );
      return {
        ...state,
        loading: false,
      };
    case EDIT_ITEM:
      state.items[payload.siteID] = state.items[payload.siteID].map((a) =>
        a.itemID === payload.item.itemID ? payload.item : a
      );
      return {
        ...state,
        loading: false,
      };
    case EDIT_TASK:
      state.tasks[payload.siteID] = state.tasks[payload.siteID].map((t) =>
        t.taskID === payload.task.id ? payload.task : t
      );
      return {
        ...state,
        loading: false,
      };
    case EDIT_COMPARTMENT:
      state.compartments[payload.cabinetID] = state.compartments[
        payload.cabinetID
      ].map((c) => (c.id === payload.compartment.id ? payload.compartment : c));
      return {
        ...state,
        loading: false,
      };
    case DELETE_AIRCRAFT:
      state.aircrafts[payload.siteID] = state.aircrafts[payload.siteID].filter(
        (a) => a.aircraftReg !== payload.reg
      );
      return {
        ...state,
        loading: false,
      };
    case DELETE_ITEM:
      state.items[payload.siteID] = state.items[payload.siteID].filter(
        (a) => a.itemID !== payload.itemID
      );
      return {
        ...state,
        loading: false,
      };
    case DELETE_COMPARTMENT:
      state.compartments[payload.cabinetID] = state.compartments[
        payload.cabinetID
      ].filter((c) => c.id !== payload.id);
      return {
        ...state,
        loading: false,
      };
    case DELETE_TASK:
      state.tasks[payload.siteID] = state.tasks[payload.siteID].filter(
        (c) => c.taskID !== payload.id
      );
      return {
        ...state,
        loading: false,
      };
      case LIST_REPORTS:
        console.log(payload,"--------")
        state.report = payload;
        return {
          ...state,
          loading: false,
        };
    default:
      return state;
  }
}
