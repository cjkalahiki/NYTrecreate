import React, {Component} from 'react';
import DisplayResults from './displayResults';
import {Button, Form, Input, Label, FormGroup} from 'reactstrap';

type Props = {

}

type State = {
    searchTerm: string,
    startDate?: string,
    endDate?: string,
    pageNumber: number,
    results: []
}

//if passing event, use type 'any'
//only sending array to display results

export default class NYTFetch extends Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            searchTerm: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
            results: []
        }
        this.fetchResults = this.fetchResults.bind(this)
    }

    fetchResults(e: any) {
        e.preventDefault();

        let baseurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        let key = 'yNAfGKoT8HNTi3H6JcUFFxdwi8jeXt5e';

        let searchURL = `${baseurl}?api-key=${key}&page=${this.state.pageNumber}`;
        
        if (this.state.startDate !== ''){
            searchURL += '&begin_date=' + this.state.startDate;
        };

        if (this.state.endDate !== ''){
            searchURL += '&end_date' + this.state.endDate;
        };

        fetch(searchURL)
            .then((res) => res.json())
            .then((json) => {
                console.log(json.response.docs);
                //this captures the array vs the entire object
                this.setResults(json);
            })
    }

    setResults(json: any) {
        this.setState({results: json.response.docs})
    }

    searchFetch(e: any){
        this.setState({
            searchTerm: e
        })
    }

    startDateFetch(e: any){
        this.setState({
            startDate: e
        })
    }

    endDateFetch(e: any){
        this.setState({
            endDate: e
        })
    }

    //async func for page number for componentDidUpdate() check if prevState.pageNumber !== this.state.pageNumber

    render() {
        return (
            <div>
                <br/>
                <h1>New York Times Article Search</h1>
                <Form onSubmit={this.fetchResults} style={{margin: "4em"}}>
                    <FormGroup>
                        <Label htmlFor='search'>Search: </Label>
                        <Input name='search' placeholder='search'  type='text' value={this.state.searchTerm} onChange={(e) => this.searchFetch(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='start-date'>Enter a start date (format YYYYMMDD):</Label>
                        <Input name='start-date' type='date' pattern='[0-9]{8}' value={this.state.startDate} onChange={(e) => this.startDateFetch(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='end-date'>Enter an end date (format YYYYMMDD):</Label>
                        <Input name='end-date' type='date' pattern='[0-9]{8}' value={this.state.endDate} onChange={(e) => this.endDateFetch(e.target.value)}/>
                    </FormGroup>
                    <Button type='submit'>Search</Button>
                </Form>
                <DisplayResults results={this.state.results}/>
            </div>
        )
    }
}