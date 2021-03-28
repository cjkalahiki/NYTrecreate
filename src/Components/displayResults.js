import React, {FunctionComponent} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

const DisplayResults = (props) => {
    console.log(props.results);



    return ( //add ternary logic to check if there is an image, display, if not then do not display
    //map over props.results, pull correct info, 
        <div>
            {
                props.results !== ''
                ? props.results.map(article => {
                    return (
                <Card>
                    <CardTitle>{article.headline.main}</CardTitle>
                    {article.keywords.map(keyword => {
                        return (
                            <CardSubtitle>{keyword.value}</CardSubtitle>
                        )
                    })}
                </Card>
                    )
            })
            : <div></div>
            }      
        </div>
    )
}

export default DisplayResults;