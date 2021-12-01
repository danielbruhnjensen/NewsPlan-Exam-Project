import { Grid } from "@mui/material"
import { SelectSection, SelectSource } from "./SelectFields"
import ArticleTable from "./ArticleTable"
import CalendarPopup from "./CalendarPopup"
import React, {useEffect} from "react";
import {getFinishedArticles, getUnfinishedArticles} from "../database/Articles"
import {getIdeas} from "../database/Ideas"
import { StandardButton } from "./Button.styles";

export default function ContentScheduleListView() {
  const [finishedArticles, setFinishedArticles] = React.useState();
  const [unfinishedArticles, setUnfinishedArticles] = React.useState();
  const [date, setDate] = React.useState(new Date(2021, 10, 17, 0, 0, 0, 0));
  const [section, setSection] = React.useState();

  const handleCallbackDate = (Date) => {
    setDate(Date);
  };

    //TODO handle callback is causing the input field not to update. If set to handleCallBack = () => {} then it works. 
    function handleCallBackSelection(selectedSection) {
      setSection(selectedSection.name)
      console.log(selectedSection.name)
    }

    //TODO: add error handling
    useEffect(() => {

      getIdeas()

      getFinishedArticles(date, section).then((article) => {
        setFinishedArticles(article);

      getUnfinishedArticles(date, section).then((article) => {
        setUnfinishedArticles(article)
        })
      });
      console.log(section)
    }, [date, section]);

  if (finishedArticles === undefined) {
    return <p>Loading...</p>;
  } else
    return (
      <>
        <Grid container spacing={2}>
        {/* First Line */}
            <Grid item xs={2}> <SelectSource handleCallBackSelection={handleCallBackSelection}/> </Grid>
            <Grid item xs={2}> <SelectSection handleCallBackSelection={handleCallBackSelection}/> </Grid>
            <Grid item xs={6}> <StandardButton>Filter</StandardButton></Grid>
            <Grid item xs={2} > <CalendarPopup handleCallbackDate={handleCallbackDate}/> </Grid>
            {/* Second line: headers */}
            <Grid item xs={6}><h6>Finished Articles</h6></Grid>
            <Grid item xs={6}> <h6>Unfinished Articles</h6></Grid>
            {/* Third line: tables */}
            <Grid item xs={6}> <ArticleTable articles={finishedArticles}/> </Grid>
            <Grid item xs={6}> <ArticleTable articles={unfinishedArticles}/> </Grid>
            <Grid></Grid>
        </Grid>
      </>
    );
}
