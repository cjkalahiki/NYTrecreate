import React, {FunctionComponent} from 'react';

const DisplayResults = (props) => {

    const display = (result) => {
        console.log(result);
    }


    return ( //add ternary logic to check if there is an image, display, if not then do not display
    //map over props.results, pull correct info, 
        <div>
            <button onClick={() => display(props.results)}>Click me</button>        
        </div>
    )
}

export default DisplayResults;