import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  clickHandler(open) {
    console.log(open)
    var array = []
    open.node.comments.edges.map(comment => {
      array = comment.node.body
    })
    console.log(array)
    this.setState({
      comments: array
    })
  }
  render() {
    if (this.props.errors) {
      return (
        <p>
          <strong>Something went wrong:</strong>
          {this.props.errors.map(error => error.message).join(' ')}
        </p>
      );
    }
    const pullRequests = this.props.organization.repository.pullRequests.edges.map(pull => (
      <li key={pull.node.id}>
        {pull.node.title}
      </li>
    ))
    const openIssue = this.props.organization.repository.openIssue.edges.map(open => (
      <li key={open.node.id}>
        <a onClick={this.clickHandler.bind(this, open)}>{open.node.title} </a>
      </li>
    ))
    const closedIssues = this.props.organization.repository.closedIssue.edges.map(issue => (
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
          {openIssue}
        </TabPanel>
        <TabPanel>
          {closedIssues}
        </TabPanel>
      </Tabs>
    );
    return (
      <div>
        <p>
          <strong> Your Organization:</strong>{this.props.organization.name}
        </p>
        <p>
          <strong>In Repository:</strong>{this.props.organization.repository.name}
        </p>
        {this.state.comments}
        <ul>
          {repositoryTab}
        </ul>
      </div>
    );
  }
}

export default Organization