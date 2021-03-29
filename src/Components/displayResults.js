import React, {FunctionComponent} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

const DisplayResults = (props) => {

    return ( //add ternary logic to check if there is an image, display, if not then do not display
    //map over props.results, pull correct info, 
        <div>
            {
                props.results.map(article => {
                    return (
                <Card style={{margin: "1em", marginRight: '3em', marginLeft: '3em', textAlign: 'left'}}>
                    {article.multimedia.length > 0
                        ? <CardImg src={`https://nytimes.com/${article.multimedia[0].url}`} alt={article.headline.main} style={{maxWidth: '25%', maxHeight: '25%', alignSelf: "center", marginTop: "20px"}}/>
                        : <></>
                    }
                    <CardBody>
                        <CardTitle><a href={article.web_url} target="_blank">{article.headline.main}</a></CardTitle>
                        <CardSubtitle>{article.keywords.map(keyword => {
                            return (
                                <span style={{backgroundColor: "#ccc", padding: "5px", margin: "5px"}}>{keyword.value}</span>
                            )
                        })}</CardSubtitle>
                    </CardBody>
                </Card>
                    )
            })
            }      
        </div>
    )
}

export default DisplayResults;