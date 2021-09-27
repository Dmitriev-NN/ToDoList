import React, { useReducer } from 'react';
import { firebaseReducer } from './firebaseReducer';
import { FirebaseContext } from './firebaseContext';
import axios from 'axios';
import {
  ADD_NOTE,
  REMOVE_NOTE,
  SHOW_LOADER,
  FETCH_NOTES,
  HIDE_LOADER,
} from '../types';

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);

    if (!res.data) {
      dispatch({ type: HIDE_LOADER });
    } else {
      //   console.log('res.data', res.data);
      //   console.log('Список ключей ==>', Object.keys(res.data));
      const payload = Object.keys(res.data).map((key) => {
        return { ...res.data[key], id: key };
      });
      dispatch({ type: FETCH_NOTES, payload });
      dispatch({ type: HIDE_LOADER });
      //   console.log('payload', payload);
    }
  };

  const addNote = async (title) => {
    var options = {
      day: 'numeric',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
    };
    const note = {
      title,
      date: new Date().toLocaleDateString('ru-RU', options),
    };

    try {
      const res = await axios.post(`${url}/notes.json`, note);

      const payload = { ...note, id: res.data.name };

      dispatch({ type: ADD_NOTE, payload });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({ type: REMOVE_NOTE, payload: id });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        fetchNotes,
        loading: state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
