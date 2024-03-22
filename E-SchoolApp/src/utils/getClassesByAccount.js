import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetClassesByAcct = (acctID) => {
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/accounts/getClassesByAccount/${acctID}`);
        setClassesList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [acctID]);

  return classesList;
};

export default useGetClassesByAcct;