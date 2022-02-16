import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Graph = () => {
  const [graphHDB, setGraphHDB] = useState([]);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const graphDates = [];

  //get turn on dates from mongodb
  const loadGraph = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/graph`);
      setGraphHDB(res.data);
      setLoadingGraph(true);
    } catch (err) {
      console.log(err);
    }
  };

  //trigger fetch data once
  useEffect(() => {
    loadGraph();
  }, []);

  //trim utc date format to yyyy-mm-dd date format, save in new array
  if (loadingGraph) {
    graphHDB.forEach((blk) => {
      let splitDate = blk.turnondate.split("T");
      let onlyDate = splitDate[0];
      graphDates.push(onlyDate);
    });
  }

  //check current month and year, then sort turn on dates across a span of 12 months
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const dateTimeNow = new Date();
  const dateNow = dateTimeNow.getDate();
  const monthNow = months[dateTimeNow.getMonth()];
  const yearNow = dateTimeNow.getFullYear();
  const dateToday = `${yearNow}-${monthNow}-${dateNow}`;
  const decDates = [];
  const novDates = [];
  const octDates = [];
  const sepDates = [];
  const augDates = [];
  const julDates = [];
  const junDates = [];
  const mayDates = [];
  const aprDates = [];
  const marDates = [];
  const febDates = [];
  const janDates = [];

  //sort turn on dates into 12 months//
  //check if current month is dec
  if (dateToday >= `${yearNow}-12-01` && dateToday <= `${yearNow}-12-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec this year
        case graphDates[i] >= `${yearNow}-12-01` &&
          graphDates[i] <= `${yearNow}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov this year
        case graphDates[i] >= `${yearNow}-11-01` &&
          graphDates[i] <= `${yearNow}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct this year
        case graphDates[i] >= `${yearNow}-10-01` &&
          graphDates[i] <= `${yearNow}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep this year
        case graphDates[i] >= `${yearNow}-09-01` &&
          graphDates[i] <= `${yearNow}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug this year
        case graphDates[i] >= `${yearNow}-08-01` &&
          graphDates[i] <= `${yearNow}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul this year
        case graphDates[i] >= `${yearNow}-07-01` &&
          graphDates[i] <= `${yearNow}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is nov
  else if (dateToday >= `${yearNow}-11-01` && dateToday <= `${yearNow}-11-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov this year
        case graphDates[i] >= `${yearNow}-11-01` &&
          graphDates[i] <= `${yearNow}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct this year
        case graphDates[i] >= `${yearNow}-10-01` &&
          graphDates[i] <= `${yearNow}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep this year
        case graphDates[i] >= `${yearNow}-09-01` &&
          graphDates[i] <= `${yearNow}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug this year
        case graphDates[i] >= `${yearNow}-08-01` &&
          graphDates[i] <= `${yearNow}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul this year
        case graphDates[i] >= `${yearNow}-07-01` &&
          graphDates[i] <= `${yearNow}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is oct
  else if (dateToday >= `${yearNow}-10-01` && dateToday <= `${yearNow}-10-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct this year
        case graphDates[i] >= `${yearNow}-10-01` &&
          graphDates[i] <= `${yearNow}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep this year
        case graphDates[i] >= `${yearNow}-09-01` &&
          graphDates[i] <= `${yearNow}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug this year
        case graphDates[i] >= `${yearNow}-08-01` &&
          graphDates[i] <= `${yearNow}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul this year
        case graphDates[i] >= `${yearNow}-07-01` &&
          graphDates[i] <= `${yearNow}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is sep
  else if (dateToday >= `${yearNow}-09-01` && dateToday <= `${yearNow}-09-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep this year
        case graphDates[i] >= `${yearNow}-09-01` &&
          graphDates[i] <= `${yearNow}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug this year
        case graphDates[i] >= `${yearNow}-08-01` &&
          graphDates[i] <= `${yearNow}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul this year
        case graphDates[i] >= `${yearNow}-07-01` &&
          graphDates[i] <= `${yearNow}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is aug
  else if (dateToday >= `${yearNow}-08-01` && dateToday <= `${yearNow}-08-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug this year
        case graphDates[i] >= `${yearNow}-08-01` &&
          graphDates[i] <= `${yearNow}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul this year
        case graphDates[i] >= `${yearNow}-07-01` &&
          graphDates[i] <= `${yearNow}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is jul
  else if (dateToday >= `${yearNow}-07-01` && dateToday <= `${yearNow}-07-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul this year
        case graphDates[i] >= `${yearNow}-07-01` &&
          graphDates[i] <= `${yearNow}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is jun
  else if (dateToday >= `${yearNow}-06-01` && dateToday <= `${yearNow}-06-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul last year
        case graphDates[i] >= `${yearNow - 1}-07-01` &&
          graphDates[i] <= `${yearNow - 1}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun this year
        case graphDates[i] >= `${yearNow}-06-01` &&
          graphDates[i] <= `${yearNow}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is may
  else if (dateToday >= `${yearNow}-05-01` && dateToday <= `${yearNow}-05-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul last year
        case graphDates[i] >= `${yearNow - 1}-07-01` &&
          graphDates[i] <= `${yearNow - 1}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun last year
        case graphDates[i] >= `${yearNow - 1}-06-01` &&
          graphDates[i] <= `${yearNow - 1}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may this year
        case graphDates[i] >= `${yearNow}-05-01` &&
          graphDates[i] <= `${yearNow}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is apr
  else if (dateToday >= `${yearNow}-04-01` && dateToday <= `${yearNow}-04-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul last year
        case graphDates[i] >= `${yearNow - 1}-07-01` &&
          graphDates[i] <= `${yearNow - 1}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun last year
        case graphDates[i] >= `${yearNow - 1}-06-01` &&
          graphDates[i] <= `${yearNow - 1}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may last year
        case graphDates[i] >= `${yearNow - 1}-05-01` &&
          graphDates[i] <= `${yearNow - 1}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr this year
        case graphDates[i] >= `${yearNow}-04-01` &&
          graphDates[i] <= `${yearNow}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is mar
  else if (dateToday >= `${yearNow}-03-01` && dateToday <= `${yearNow}-03-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul last year
        case graphDates[i] >= `${yearNow - 1}-07-01` &&
          graphDates[i] <= `${yearNow - 1}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun last year
        case graphDates[i] >= `${yearNow - 1}-06-01` &&
          graphDates[i] <= `${yearNow - 1}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may last year
        case graphDates[i] >= `${yearNow - 1}-05-01` &&
          graphDates[i] <= `${yearNow - 1}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr last year
        case graphDates[i] >= `${yearNow - 1}-04-01` &&
          graphDates[i] <= `${yearNow - 1}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar this year
        case graphDates[i] >= `${yearNow}-03-01` &&
          graphDates[i] <= `${yearNow}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is feb
  else if (dateToday >= `${yearNow}-02-01` && dateToday <= `${yearNow}-02-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul last year
        case graphDates[i] >= `${yearNow - 1}-07-01` &&
          graphDates[i] <= `${yearNow - 1}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun last year
        case graphDates[i] >= `${yearNow - 1}-06-01` &&
          graphDates[i] <= `${yearNow - 1}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may last year
        case graphDates[i] >= `${yearNow - 1}-05-01` &&
          graphDates[i] <= `${yearNow - 1}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr last year
        case graphDates[i] >= `${yearNow - 1}-04-01` &&
          graphDates[i] <= `${yearNow - 1}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar last year
        case graphDates[i] >= `${yearNow - 1}-03-01` &&
          graphDates[i] <= `${yearNow - 1}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb this year
        case graphDates[i] >= `${yearNow}-02-01` &&
          graphDates[i] <= `${yearNow}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }
  //check if current month is jan
  else if (dateToday >= `${yearNow}-01-01` && dateToday <= `${yearNow}-01-31`) {
    for (let i = 0; i < graphDates.length; i++) {
      switch (true) {
        //check if turn on date is dec last year
        case graphDates[i] >= `${yearNow - 1}-12-01` &&
          graphDates[i] <= `${yearNow - 1}-12-31`:
          decDates.push(graphDates[i]);
          break;
        //check if turn on date is nov last year
        case graphDates[i] >= `${yearNow - 1}-11-01` &&
          graphDates[i] <= `${yearNow - 1}-11-31`:
          novDates.push(graphDates[i]);
          break;
        //check if turn on date is oct last year
        case graphDates[i] >= `${yearNow - 1}-10-01` &&
          graphDates[i] <= `${yearNow - 1}-10-31`:
          octDates.push(graphDates[i]);
          break;
        //check if turn on date is sep last year
        case graphDates[i] >= `${yearNow - 1}-09-01` &&
          graphDates[i] <= `${yearNow - 1}-09-31`:
          sepDates.push(graphDates[i]);
          break;
        //check if turn on date is aug last year
        case graphDates[i] >= `${yearNow - 1}-08-01` &&
          graphDates[i] <= `${yearNow - 1}-08-31`:
          augDates.push(graphDates[i]);
          break;
        //check if turn on date is jul last year
        case graphDates[i] >= `${yearNow - 1}-07-01` &&
          graphDates[i] <= `${yearNow - 1}-07-31`:
          julDates.push(graphDates[i]);
          break;
        //check if turn on date is jun last year
        case graphDates[i] >= `${yearNow - 1}-06-01` &&
          graphDates[i] <= `${yearNow - 1}-06-31`:
          junDates.push(graphDates[i]);
          break;
        //check if turn on date is may last year
        case graphDates[i] >= `${yearNow - 1}-05-01` &&
          graphDates[i] <= `${yearNow - 1}-05-31`:
          mayDates.push(graphDates[i]);
          break;
        //check if turn on date is apr last year
        case graphDates[i] >= `${yearNow - 1}-04-01` &&
          graphDates[i] <= `${yearNow - 1}-04-31`:
          aprDates.push(graphDates[i]);
          break;
        //check if turn on date is mar last year
        case graphDates[i] >= `${yearNow - 1}-03-01` &&
          graphDates[i] <= `${yearNow - 1}-03-31`:
          marDates.push(graphDates[i]);
          break;
        //check if turn on date is feb last year
        case graphDates[i] >= `${yearNow - 1}-02-01` &&
          graphDates[i] <= `${yearNow - 1}-02-31`:
          febDates.push(graphDates[i]);
          break;
        //check if turn on date is jan this year
        case graphDates[i] >= `${yearNow}-01-01` &&
          graphDates[i] <= `${yearNow}-01-31`:
          janDates.push(graphDates[i]);
          break;
      }
    }
  }

  //find out how many turn on blocks per month
  const decBlks = decDates.length;
  const novBlks = novDates.length;
  const octBlks = octDates.length;
  const sepBlks = sepDates.length;
  const augBlks = augDates.length;
  const julBlks = julDates.length;
  const junBlks = junDates.length;
  const mayBlks = mayDates.length;
  const aprBlks = aprDates.length;
  const marBlks = marDates.length;
  const febBlks = febDates.length;
  const janBlks = janDates.length;

  //sorting data alignment by different month for graph creation
  let graphLabel = [];
  let graphData = [];
  const shortYear = yearNow.toString().substr(-2);
  if (dateToday >= `${yearNow}-12-01` && dateToday <= `${yearNow}-12-31`) {
    graphLabel = [
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
      `Jul ${shortYear}`,
      `Aug ${shortYear}`,
      `Sep ${shortYear}`,
      `Oct ${shortYear}`,
      `Nov ${shortYear}`,
      `Dec ${shortYear}`,
    ];
    graphData = [
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-11-01` &&
    dateToday <= `${yearNow}-11-31`
  ) {
    graphLabel = [
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
      `Jul ${shortYear}`,
      `Aug ${shortYear}`,
      `Sep ${shortYear}`,
      `Oct ${shortYear}`,
      `Nov ${shortYear}`,
    ];
    graphData = [
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-10-01` &&
    dateToday <= `${yearNow}-10-31`
  ) {
    graphLabel = [
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
      `Jul ${shortYear}`,
      `Aug ${shortYear}`,
      `Sep ${shortYear}`,
      `Oct ${shortYear}`,
    ];
    graphData = [
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-09-01` &&
    dateToday <= `${yearNow}-09-31`
  ) {
    graphLabel = [
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
      `Jul ${shortYear}`,
      `Aug ${shortYear}`,
      `Sep ${shortYear}`,
    ];
    graphData = [
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-08-01` &&
    dateToday <= `${yearNow}-08-31`
  ) {
    graphLabel = [
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
      `Jul ${shortYear}`,
      `Aug ${shortYear}`,
    ];
    graphData = [
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-07-01` &&
    dateToday <= `${yearNow}-07-31`
  ) {
    graphLabel = [
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
      `Jul ${shortYear}`,
    ];
    graphData = [
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-06-01` &&
    dateToday <= `${yearNow}-06-31`
  ) {
    graphLabel = [
      `Jul ${shortYear - 1}`,
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
      `Jun ${shortYear}`,
    ];
    graphData = [
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-05-01` &&
    dateToday <= `${yearNow}-05-31`
  ) {
    graphLabel = [
      `Jun ${shortYear - 1}`,
      `Jul ${shortYear - 1}`,
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
      `May ${shortYear}`,
    ];
    graphData = [
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-04-01` &&
    dateToday <= `${yearNow}-04-31`
  ) {
    graphLabel = [
      `May ${shortYear - 1}`,
      `Jun ${shortYear - 1}`,
      `Jul ${shortYear - 1}`,
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
      `Apr ${shortYear}`,
    ];
    graphData = [
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
      aprBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-03-01` &&
    dateToday <= `${yearNow}-03-31`
  ) {
    graphLabel = [
      `Apr ${shortYear - 1}`,
      `May ${shortYear - 1}`,
      `Jun ${shortYear - 1}`,
      `Jul ${shortYear - 1}`,
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
      `Mar ${shortYear}`,
    ];
    graphData = [
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
      marBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-02-01` &&
    dateToday <= `${yearNow}-02-31`
  ) {
    graphLabel = [
      `Mar ${shortYear - 1}`,
      `Apr ${shortYear - 1}`,
      `May ${shortYear - 1}`,
      `Jun ${shortYear - 1}`,
      `Jul ${shortYear - 1}`,
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
      `Feb ${shortYear}`,
    ];
    graphData = [
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
      febBlks,
    ];
  } else if (
    dateToday >= `${yearNow}-01-01` &&
    dateToday <= `${yearNow}-01-31`
  ) {
    graphLabel = [
      `Feb ${shortYear - 1}`,
      `Mar ${shortYear - 1}`,
      `Apr ${shortYear - 1}`,
      `May ${shortYear - 1}`,
      `Jun ${shortYear - 1}`,
      `Jul ${shortYear - 1}`,
      `Aug ${shortYear - 1}`,
      `Sep ${shortYear - 1}`,
      `Oct ${shortYear - 1}`,
      `Nov ${shortYear - 1}`,
      `Dec ${shortYear - 1}`,
      `Jan ${shortYear}`,
    ];
    graphData = [
      febBlks,
      marBlks,
      aprBlks,
      mayBlks,
      junBlks,
      julBlks,
      augBlks,
      sepBlks,
      octBlks,
      novBlks,
      decBlks,
      janBlks,
    ];
  }
  // console.log(graphLabel);
  // console.log(graphData);

  return (
    <div>
      <Bar
        height={400}
        width={600}
        options={{ maintainAspectRatio: false }}
        data={{
          labels: graphLabel,
          datasets: [
            {
              label: "No. of Turn On Blocks",
              data: graphData,
              backgroundColor: ["pink"],
              hoverBackgroundColor: ["red"],
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
