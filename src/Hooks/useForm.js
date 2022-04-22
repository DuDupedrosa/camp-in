import React from 'react';

const types = {
  email: {
    regexp:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Utilize um email válido',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate() {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Erro: preencha todos os campos.');
      return false;
    } else if (types[type] && !types[type].regexp.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function handleChange({ target }) {
    setValue(target.value);
    if (error) validate(value);
  }

  return {
    value,
    setValue,
    handleChange,
    error,
    validate,
  };
};

export default useForm;
