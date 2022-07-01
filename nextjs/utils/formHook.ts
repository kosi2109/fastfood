import React, { useState, SetStateAction } from "react";

export const useHandleChange = (
  initialState: any,
  setState: React.SetStateAction<any>,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setState({
    ...initialState,
    [event.target.name]: event.target.value,
  });
};
