import { useEffect, useState } from "react";
import countryService from "../services/countries";

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      countryService
        .getCountry(name)
        .then((response) => {
          setCountry(response);
        })
        .catch(() => {
          setCountry(null);
        });
    }
  }, [name]);

  return country;
};
