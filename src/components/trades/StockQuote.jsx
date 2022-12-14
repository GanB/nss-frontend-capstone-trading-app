import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../config.json";
import { TradeForm } from "./TradeForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontWeight: "900",
}));

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const StockQuote = ({ ticker }) => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  const [dailyQuote, setDailyQuote] = useState({});

  const previousDay = () => {
    const previousDate = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    console.log(previousDate.getDay());
    const previousDay = previousDate.getDay();

    if (previousDay === 0 || previousDay === 6) {
      return new Date(
        previousDate.valueOf() - 1000 * 60 * 60 * 24 * 2
      ).toLocaleDateString("en-CA");
    }
    return previousDate.toLocaleDateString("en-CA");
  };

  const DAILY_OPEN_CLOSE_API = `${
    api.DAILY_OPEN_CLOSE
  }${ticker?.toUpperCase()}/${previousDay()}?adjusted=true&apiKey=${
    process.env.REACT_APP_PG_API_KEY
  }`;

  useEffect(() => {
    if (ticker) {
      const fetchData = async () => {
        console.log(DAILY_OPEN_CLOSE_API);
        const response = await fetch(DAILY_OPEN_CLOSE_API);
        if (!response.ok) {
          console.log(response.status, response.statusText);
        } else {
          const tickerResultFromApi = await response.json();
          setDailyQuote(tickerResultFromApi);
        }
      };
      fetchData();
    }
  }, [ticker]);

  return (
    <Box sx={{ width: "100%", padding: "2rem", marginLeft: "10%" }}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ padding: "0.5rem" }}
        >
          <Grid item xs={2}>
            <Item>Market Date</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{dailyQuote?.from}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Ticker</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{dailyQuote?.symbol}</Item>
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ padding: "0.5rem" }}
        >
          <Grid item xs={2}>
            <Item>Open</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {currencyFormatter.format(
                isNaN(dailyQuote?.open) ? 0.0 : dailyQuote?.open
              )}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>High</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {currencyFormatter.format(
                isNaN(dailyQuote?.high) ? 0.0 : dailyQuote?.high
              )}
            </Item>
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ padding: "0.5rem" }}
        >
          <Grid item xs={2}>
            <Item>Low</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {currencyFormatter.format(
                isNaN(dailyQuote?.low) ? 0.0 : dailyQuote?.low
              )}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Close</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {currencyFormatter.format(
                isNaN(dailyQuote?.close) ? 0.0 : dailyQuote?.close
              )}
            </Item>
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ padding: "0.5rem" }}
        >
          <Grid item xs={2}>
            <Item>Volume</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{dailyQuote?.volume}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>After Hours</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {currencyFormatter.format(
                isNaN(dailyQuote?.afterHours) ? 0.0 : dailyQuote?.afterHours
              )}
            </Item>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ padding: "0.5rem" }}
        >
          <Grid item xs={2}>
            <Item>Pre Market</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {currencyFormatter.format(
                isNaN(dailyQuote?.preMarket) ? 0.0 : dailyQuote?.preMarket
              )}
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
