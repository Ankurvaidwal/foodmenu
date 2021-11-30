import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import Form from '../Form/Form'
import Posts from '../Posts/posts'
import { getPosts } from '../../actions/posts'
import makeStyles from '../../styles';
import { useDispatch } from 'react-redux'


export default function Home() {
    const [currentId, setcurrentId] = useState(0);
    const classes = makeStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setcurrentId={setcurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setcurrentId={setcurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
