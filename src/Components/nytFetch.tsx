import React, {Component} from 'react';
import DisplayResults from './displayResults';
import {Button, Form, Input, Label, FormGroup, Row, Col} from 'reactstrap';

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
        this.fetchResults = this.fetchResults.bind(this);
        this.inputCompiler = this.inputCompiler.bind(this);
    }

    fetchResults(e?: any) {
        e.preventDefault();

        let baseurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        let key = 'yNAfGKoT8HNTi3H6JcUFFxdwi8jeXt5e';

        let searchURL = `${baseurl}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
        
        if (this.state.startDate !== ''){
            searchURL += '&begin_date=' + this.state.startDate;
        };

        if (this.state.endDate !== ''){
            searchURL += '&end_date=' + this.state.endDate;
        };

        fetch(searchURL)
            .then((res) => res.json())
            .then((json) => {
                this.setResults(json.response.docs);
            })
        
    }

    setResults(json: any) {
        this.setState({results: json})
    }

    inputCompiler(e: any) {
        const value = e.target.value
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
    }

    componentDidUpdate({}, prevState: any) {
        if (prevState.searchTerm !== this.state.searchTerm){
            this.setState({pageNumber: 0})
        }
    }

    //async func for page number for componentDidUpdate() check if prevState.pageNumber !== this.state.pageNumber


    pageIncrementOnClick = async (e: any) =>{
        console.log(this.state.pageNumber)
        await this.setState((prevState) => ({pageNumber: prevState.pageNumber + 1}))
        console.log(this.state.pageNumber)
        this.fetchResults(e);
    }

    pageDecrementOnClick = async (e: any) => {
        console.log(this.state.pageNumber);
        if (this.state.pageNumber > 0){
            await this.setState((prevState) => ({pageNumber: prevState.pageNumber - 1}))
            this.fetchResults(e);
        } else {
            await this.setState({pageNumber: 0})
            this.fetchResults(e);
        }
    }

    render() {
        return (
            <div>
                <br/>
                <h1>New York Times Article Search</h1>
                <Row>
                  <Col>  
                    <Form onSubmit={this.fetchResults} style={{margin: "4em"}}>
                        <FormGroup>
                            <Label htmlFor='searchTerm'>Enter a SINGLE search term (required): </Label>
                            <Input name='searchTerm' placeholder='i.e. Grateful Dead'  type='text' value={this.state.searchTerm} onChange={this.inputCompiler} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='startDate'>Enter a start date (format YYYYMMDD):</Label>
                            <Input name='startDate' type='date' pattern='[0-9]{8}' value={this.state.startDate} onChange={this.inputCompiler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='endDate'>Enter an end date (format YYYYMMDD):</Label>
                            <Input name='endDate' type='date' pattern='[0-9]{8}' value={this.state.endDate} onChange={this.inputCompiler}/>
                        </FormGroup>
                        <Button type='submit'>Search</Button>
                    </Form>
                    {
                        this.state.pageNumber === 0 
                            ? <></>
                            : <Button onClick={(e) => this.pageDecrementOnClick(e)} style={{marginRight: '2em'}}>Previous Page</Button>
                    }
                    {
                        this.state.pageNumber >= 0 && this.state.results.length > 0
                        ? <Button onClick={(e) => this.pageIncrementOnClick(e)}>Next Page</Button>
                        : <></>
                    }
                    {
                        console.log(this.state.results)
                    }
                  </Col>
                  <Col>  
                  <br/>
                  <br/>
                    {this.state.results.length === 0
                        ? <h2 style={{marginRight: '1em'}}>No results.</h2>
                        : <DisplayResults results={this.state.results}/>
                    }
                  </Col>
                </Row>
            </div>
        )
    }
}