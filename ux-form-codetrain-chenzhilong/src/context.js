import React from 'react';

export const FORMSTATUS = {
  EDITOR: 'editable',
  PREVIEW: 'preview',
};
export const initState = {
  formStatus: FORMSTATUS.EDITOR,
};

export const FormContext = React.createContext({ data: initState, operate: {} });
