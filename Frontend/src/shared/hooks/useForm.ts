import { useState } from 'react';

export default (callback: () => any) => {
  const [fields, setFields] = useState({});
  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleFieldChange = (event: any) => {
    event.persist();
    setFields(fields => ({
      ...fields,
      [event.target.name]: event.target.value,
    }));
  };
  const initFields = (fieldValues: { [key: string]: string }) => {
    setFields(fieldValues);
  };
  return {
    initFields,
    handleSubmit,
    handleFieldChange,
    fields,
  };
};
