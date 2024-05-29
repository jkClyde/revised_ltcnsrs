import { useState, useEffect } from 'react';
import { lengthForAgeStatus, weightForAgeStatus, weigthForLengthStatus } from 'pages/form/Data/Calculations';
import fetchChildData from 'pages/table/actions/action';

//REDUX
import { useDispatch } from 'react-redux';
import { setStats } from 'store/actions/auth';

const getLatestQuarter = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

  let quarter;

  if (currentMonth <= 3) {
    quarter = '1st Quarter';
  } else if (currentMonth <= 6) {
    quarter = '2nd Quarter';
  } else if (currentMonth <= 9) {
    quarter = '3rd Quarter';
  } else {
    quarter = '4th Quarter';
  }

  return { year: currentYear, quarter };
};

const Statistics = () => {
  const dispatch = useDispatch();
  const [lfa_severe, set_LFA_severe] = useState(0);
  const [lfa_stunted, set_LFA_stunted] = useState(0);
  const [lfa_normal, set_LFA_normal] = useState(0);
  const [lfa_tall, set_LFA_tall] = useState(0);

  const [wfa_severe, set_WFA_severe] = useState(0);
  const [wfa_underweight, set_WFA_underweight] = useState(0);
  const [wfa_normal, set_WFA_normal] = useState(0);
  const [wfa_overweight, set_WFA_overweight] = useState(0);

  const [wfl_severe, set_WFL_severe] = useState(0);
  const [wfl_wasted, set_WFL_wasted] = useState(0);
  const [wfl_normal, set_WFL_normal] = useState(0);
  const [wfl_overweight, set_WFL_overweight] = useState(0);
  const [wfl_obese, set_WFL_obese] = useState(0);

  const [data, setData] = useState(null);
  const latestQuarter = getLatestQuarter();
  const [dataProcessed, setDataProcessed] = useState(false);
  const [population, setPopulation] = useState(0);

  const [data_wfa_severe, setdata_wfa_severe] = useState([]);
  const [data_wfa_normal, setdata_wfa_normal] = useState([]);
  const [data_wfa_underweight, setdata_wfa_underweight] = useState([]);
  const [data_wfa_overweight, setdata_wfa_overweight] = useState([]);
  const [data_lfa_severe, setdata_lfa_severe] = useState([]);
  const [data_lfa_normal, setdata_lfa_normal] = useState([]);
  const [data_lfa_underweight, setdata_lfa_underweight] = useState([]);
  const [data_lfa_overweight, setdata_lfa_overweight] = useState([]);

  const [data_wfl_severe_and_wasted, setdata_wfl_severe_wasted] = useState([]);
  const [data_wfl_normal, setdata_wfl_normal] = useState([]);
  const [data_wfl_overweight, setdata_wfl_overweight] = useState([]);
  const [data_wfl_obese, setdata_wfl_obese] = useState([]);

  // Getting Barangay Stats----------------------------------------------------------------------------------------------------
  const [barangayData, setBarangayData] = useState({});
  const categoryValues = {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,

    lfa_severe: 0,
    lfa_underweight: 0,
    lfa_normal: 0,
    lfa_overweight: 0,

    wfl_severe_wasted: 0,
    wfl_normal: 0,
    wfl_overweight: 0,
    wfl_obese: 0
  };

  const updateBarangayData = (barangay, category, incrementBy) => {
    setBarangayData((prev) => {
      const currentBarangayData = prev[barangay] || { ...categoryValues };
      return {
        ...prev,
        [barangay]: {
          ...currentBarangayData,
          [category]: (currentBarangayData[category] || 0) + incrementBy
        }
      };
    });
  };

  const barangays = [
    'Alno',
    'Alapang',
    'Pico',
    'Wangal',
    'Cruz',
    'Poblacion',
    'Puguis',
    'Ambiong',
    'Balili',
    'Bahong',
    'Beckel',
    'Bineng',
    'Betag',
    'Lubas',
    'Shilan',
    'Tawang'
  ];

  useEffect(() => {
    const initializeBarangayData = () => {
      const initialData = {};
      barangays.forEach((barangay) => {
        initialData[barangay] = { ...categoryValues };
      });
      setBarangayData(initialData);
    };

    initializeBarangayData();
  }, []);

  // Fetching Data-------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChildData();
      setData(data);
    };
    fetchData();
  }, []);

  // Tallying
  useEffect(() => {
    if (data && !dataProcessed) {
      data.forEach((patient) => {
        if (patient) {
          const lfa_status = lengthForAgeStatus(patient.date_of_birth, patient.child_health.height, patient.gender);
          const wfa_status = weightForAgeStatus(patient.date_of_birth, patient.child_health.weight, patient.gender);

          const wfl_status = weigthForLengthStatus(
            patient.date_of_birth,
            patient.child_health.height,
            patient.child_health.weight,
            patient.gender
          );
          setPopulation((prev) => prev + 1);

          switch (lfa_status) {
            case 'Severely Stunted':
              set_LFA_severe((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'lfa_severe', 1);
              }
              break;
            case 'Stunted':
              set_LFA_stunted((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'lfa_underweight', 1);
              }
              break;
            case 'Normal':
              set_LFA_normal((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'lfa_normal', 1);
              }
              break;
            case 'Tall':
              set_LFA_tall((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'lfa_overweight', 1);
              }
              break;
            default:
              break;
          }

          switch (wfa_status) {
            case 'Severely Underweight':
              set_WFA_severe((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'severe', 1);
              }
              break;
            case 'Underweight':
              set_WFA_underweight((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'underweight', 1);
              }
              break;
            case 'Normal':
              set_WFA_normal((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'normal', 1);
              }
              break;
            case 'Overweight':
              set_WFA_overweight((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'overweight', 1);
              }
              break;
            default:
              break;
          }

          switch (wfl_status) {
            case 'Severely Wasted':
              set_WFL_severe((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'wfl_severe_wasted', 1);
              }
              break;
            case 'Wasted':
              set_WFL_wasted((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'wfl_severe_wasted', 1);
              }
              break;
            case 'Normal':
              set_WFL_normal((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'wfl_normal', 1);
              }
              break;
            case 'Overweight':
              set_WFL_overweight((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'wfl_overweight', 1);
              }
              break;
            case 'Obese':
              set_WFL_obese((prev) => prev + 1);
              if (patient.barangay) {
                updateBarangayData(patient.barangay, 'wfl_obese', 1);
              }
              break;
            default:
              break;
          }
        }
      });

      setDataProcessed(true);
    }
  }, [data, dataProcessed]);

  useEffect(() => {
    if (dataProcessed) {
      setdata_wfa_severe(barangays.map((barangay) => barangayData[barangay].severe));
      setdata_wfa_normal(barangays.map((barangay) => barangayData[barangay].normal));
      setdata_wfa_underweight(barangays.map((barangay) => barangayData[barangay].underweight));
      setdata_wfa_overweight(barangays.map((barangay) => barangayData[barangay].overweight));

      setdata_lfa_severe(barangays.map((barangay) => barangayData[barangay].lfa_severe));
      setdata_lfa_normal(barangays.map((barangay) => barangayData[barangay].lfa_normal));
      setdata_lfa_underweight(barangays.map((barangay) => barangayData[barangay].lfa_underweight));
      setdata_lfa_overweight(barangays.map((barangay) => barangayData[barangay].lfa_overweight));

      setdata_wfl_severe_wasted(barangays.map((barangay) => barangayData[barangay].wfl_severe_wasted));
      setdata_wfl_normal(barangays.map((barangay) => barangayData[barangay].wfl_normal));
      setdata_wfl_overweight(barangays.map((barangay) => barangayData[barangay].wfl_overweight));
      setdata_wfl_obese(barangays.map((barangay) => barangayData[barangay].wfl_obese));

      dispatch(
        setStats({
          lfa_severe,
          lfa_normal,
          lfa_stunted,
          lfa_tall,
          wfa_severe,
          wfa_underweight,
          wfa_normal,
          wfa_overweight,
          wfl_severe,
          wfl_wasted,
          wfl_normal,
          wfl_overweight,
          wfl_obese,
          population
        })
      );
    }
  }, [
    dataProcessed,
    barangayData, // Add barangayData to the dependencies
    lfa_severe,
    lfa_normal,
    lfa_stunted,
    lfa_tall,
    wfa_severe,
    wfa_underweight,
    wfa_normal,
    wfa_overweight,
    wfl_severe,
    wfl_wasted,
    wfl_normal,
    wfl_overweight,
    wfl_obese,
    population,
    dispatch
  ]);

  return {
    lfa_severe,
    lfa_stunted,
    lfa_normal,
    lfa_tall,
    wfa_severe,
    wfa_underweight,
    wfa_normal,
    wfa_overweight,
    wfl_severe,
    wfl_wasted,
    wfl_normal,
    wfl_overweight,
    wfl_obese,
    population,
    latestQuarter,
    barangayData,

    data_wfa_severe,
    data_wfa_normal,
    data_wfa_underweight,
    data_wfa_overweight,

    data_lfa_severe,
    data_lfa_normal,
    data_lfa_underweight,
    data_lfa_overweight,

    data_wfl_severe_and_wasted,
    data_wfl_normal,
    data_wfl_overweight,
    data_wfl_obese
  };
};

export default Statistics;
