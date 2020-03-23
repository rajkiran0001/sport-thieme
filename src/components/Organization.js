import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Input from './Input'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      search: ''
    }
  }
  //issues onClick function call
  clickHandler(open) {
    var array = []
    open.node.comments.edges.map(comment => {
      array.push(comment.node.body)
    })
    this.setState({
      comments: array
    })
  }
  // search comment is updated in the state
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  render() {
    let property = this.props.organization.repository
    const commentsArray = this.state.comments;
    //fitering the search comment based on the user search input
    let filteredValues = commentsArray.filter(
      (result) => {
        return result.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    //map function for looping through the array
    const commentsResult = filteredValues.map(element => (
      <li>
        {element}
      </li>
    ))
    //error handling
    if (this.props.errors) {
      return (
        <p>
          <strong>Something went wrong:</strong>
          {this.props.errors.map(error => error.message).join(' ')}
        </p>
      );
    }
    //get the pull requests
    const pullRequests = property.pullRequests.edges.map(pull => (
      <li key={pull.node.id}>
        {pull.node.title}
      </li>
    ))
    //get the openIssues
    const openIssues = property.openIssue.edges.map(open => (
      <li key={open.node.id}>
        <a onClick={this.clickHandler.bind(this, open)}>{open.node.title} </a>
      </li>
    ))
    //get the closedIssues
    const closedIssues = property.closedIssue.edges.map(issue => (
      <li key={issue.node.id}>
        <a onClick={this.clickHandler.bind(this, issue)}>{issue.node.title}</a>
      </li>
    ))
    const repositoryTab = (
      <Tabs>
        <TabList>
          <Tab>Pull Request</Tab>
          <Tab>Open Issue</Tab>
          <Tab>Closed Issue</Tab>
        </TabList>
        <TabPanel>
          {pullRequests}
        </TabPanel>
        <TabPanel>
          {openIssues}
        </TabPanel>
        <TabPanel>
          {closedIssues}
        </TabPanel>
      </Tabs>
    );
    return (
      <div>
        {/* user search input */}
        Click the issue to view the comments  <Input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="search your comments"></Input>
        {commentsResult}
        <ul>
          {/* tab view  */}
          {repositoryTab}
        </ul>
      </div>
    );
  }
}

export default Organization