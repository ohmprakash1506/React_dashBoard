import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//reducer
import { fetchCards } from "../redux/cardSlice";

// Material UI
import { Grid2, Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";

const Cards = () => {
 const dispatch = useDispatch()

 const { card: cards, status, error } = useSelector((state) => state.cards)


useEffect(() => {
    if(status === 'idle'){
        dispatch(fetchCards())
    }
}, [dispatch, status])

if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <Alert severity="error">{error}</Alert>;
  }


  return (
    <Grid2 container spacing={3}>
      {cards.slice(0, 6).map((card) => (
        <Grid2 item xs={12} sm={6} md={4} key={card.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">Card {card.id}</Typography>
              <Typography>{card.title}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Cards;
