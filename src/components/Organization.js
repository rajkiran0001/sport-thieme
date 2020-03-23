import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      search: ''
    }
  }
  clickHandler(open) {
    console.log(open)
    var array = []
    open.node.comments.edges.map(comment => {
      array.push(comment.node.body)
    })
    console.log(array)
    this.setState({
      comments: array
    })
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  render() {
    let property = this.props.organization.repository
    const commentsArray = this.state.comments;
    let filteredValues = commentsArray.filter(
      (result) => {
          return result.indexOf(this.state.search) !== -1;
        }
    );
    // const elements = this.state.comments
    const commentsResult = filteredValues.map(element => (
      <li>
        {element}
      </li>
    ))

    if (this.props.errors) {
      return (
        <p>
          <strong>Something went wrong:</strong>
          {this.props.errors.map(error => error.message).join(' ')}
        </p>
      );
    }
    const pullRequests = property.pullRequests.edges.map(pull => (
      <li key={pull.node.id}>
        {pull.node.title}
      </li>
    ))
    const openIssues = property.openIssue.edges.map(open => (
      <li key={open.node.id}>
        <a onClick={this.clickHandler.bind(this, open)}>{open.node.title} </a>
      </li>
    ))
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
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
        <p>
          <strong> Your Organization:</strong>{this.props.organization.name}
        </p>
        <p>
          <strong>In Repository:</strong>{this.props.organization.repository.name}
        </p>
        {commentsResult}
        {/* <li>{this.state.comments}</li> */}
        <ul>
          {repositoryTab}
        </ul>
      </div>
    );
  }
}

export default Organization