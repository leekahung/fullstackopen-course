import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (url) => {
  const [resource, setResource] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setResource(response.data);
    });
  }, [url, setResource]);

  const createNew = async (objectToAdd) => {
    const newObject = await axios.post(url, objectToAdd);
    setResource(resource.concat(newObject.data));
  };

  const service = { createNew };

  return [resource, service];
};
