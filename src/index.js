import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, put } from 'redux-saga/effects';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

function* getPets() {
  const petList = yield axios.get(`/pets`);
  yield put({ type: 'SET_PETS', payload: petList.data });
}

function* getOwners() {
  const ownerList = yield axios.get(`/owners`);
  yield put({ type: 'SET_OWNERS', payload: ownerList.data });
}

function* newPet(name) {
  console.log("We are here in new pet POST saga", name.payload);
  try {
    const newPet = yield axios.post(`/pets/${name.payload}`);
    console.log('returning from new pet with', newPet);
    yield put({ type: 'GET_PETS', payload: newPet.data[0] });
  } catch (error) {
    console.log('error in saga new pet:', error);
  }
}

function* newOwner(name) {
  console.log("We are here in new OWner POST saga", name.payload);
  try {
    const newOwner = yield axios.post(`/owners/${name.payload}`);
    console.log('returning from new owner with', newOwner);
    yield put({ type: 'GET_OWNERS', payload: newOwner.data[0] });
  } catch (error) {
    console.log('error in saga new owner:', error);
  }
}

function* deletePet(action) {
  try {
    yield axios.delete(`/pets/${action.payload}`);
  } catch (error) {
    console.log("Error in delete pet generator function ", error);
  }
}

function* deleteOwner(action) {
  try {
    yield axios.delete(`/owners/${action.payload}`);
  } catch (error) {
    console.log("Error in delete owner generator function ", error);
  }
}

const ownerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PETS':
      return action.payload;
    default:
      return state;
  }
}

const petReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWNERS':
      return action.payload;
    default:
      return state;
  }
}
const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
    ownerReducer,
    petReducer
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);



sagaMiddleware.run(rootSaga);

function* rootSaga() {
  yield takeEvery('GET_PETS', getPets);
  yield takeEvery('GET_OWNERS', getOwners);
  yield takeEvery('NEW_OWNER', newOwner);
  yield takeEvery('NEW_PET', newPet);
  yield takeEvery('DELETE_PET', deletePet);
  yield takeEvery('DELETE_OWNER', deleteOwner);
}

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root'),
);