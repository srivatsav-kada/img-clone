
import { createReducer, on } from '@ngrx/store';
import * as ApplyUploadActions from './apply-upload.actions';

export interface ApplyUploadState {
  file: File | null;
  fileUrl: string | null;
  error: any;
}

export const initialState: ApplyUploadState = {
  file: null,
  fileUrl: null,
  error: null
};

export const applyUploadReducer = createReducer(
  initialState,
  on(ApplyUploadActions.uploadFileSuccess, (state, { fileUrl }) => {
    console.log('Reducer: Upload file success, updating state:', fileUrl);
    return { ...state, fileUrl, error: null };
  }),
  on(ApplyUploadActions.uploadFileFailure, (state, { error }) => {
    console.error('Reducer: Upload file failure, updating state:', error);
    return { ...state, error };
  }),
  on(ApplyUploadActions.clearFile, state => {
    console.log('Reducer: Clear file, updating state.');
    return { ...state, file: null, fileUrl: null, error: null };
  }),
  on(ApplyUploadActions.loadFileSuccess, (state, { file, fileUrl }) => {
    console.log('Reducer: Load file success, updating state:', file, fileUrl);
    return { ...state, file, fileUrl, error: null };
  }),
  on(ApplyUploadActions.loadFileFailure, (state, { error }) => {
    console.error('Reducer: Load file failure, updating state:', error);
    return { ...state, error };
  }),
  on(ApplyUploadActions.submitFormSuccess, state => {
    console.log('Reducer: Submit form success, updating state.');
    return { ...state, error: null };
  }),
  on(ApplyUploadActions.submitFormFailure, (state, { error }) => {
    console.error('Reducer: Submit form failure, updating state:', error);
    return { ...state, error };
  })
);
