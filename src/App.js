import React, { Component } from 'react';
import axios from 'axios';
import 'styled-components/macro';
import 'react-tabs/style/react-tabs.css';
import Token from './components/Token';
import Organization from './components/Organization';
import Button from './components/Button'
import Input from './components/Input'

const TITLE = 'Sport-Thieme Application';
// get the authentication token from local storage if it exists
const accessToken = localStorage.getItem('token');
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${accessToken}`,
  },
});
// query to fetch data
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        closedIssue: issues(last: 25, states: [CLOSED]) {
          edges {
            node {
              title
              url
              comments(last: 3) {
                edges {
                  node {
                    id
                    body
                    updatedAt
                  }
                }
              }
            }
          }
        }
        openIssue: issues(last: 25, states: [OPEN]) {
          edges {
            node {
              title
              url
              comments(last: 3) {
                edges {
                  node {
                    id
                    body
                    updatedAt
                  }
                }
              }
            }
          }
        }
        pullRequests(last: 25) {
          edges {
            node {
              id
              title
              body
              url
            }
          }
        }
      }
    }
  }
`;
//axios post request
const getIssuesOfRepository = path => {
  const [organization, repository] = path.split('/');
  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository },
  });
};
// function call to set state
const resolveIssuesQuery = queryResult => () => ({
  organization: queryResult.data.data.organization,
  errors: queryResult.data.errors,
});
class App extends Component {
  state = {
    path: 'airbnb/javascript',
    organization: null,
    errors: null,
  };
  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }
  onChange = event => {
    this.setState({ path: event.target.value });
  };
  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };
  //username/repo onSubmit function call
  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult)),
    );
  };
  render() {
    const { path, organization, errors } = this.state;
    return (
      <div css={{ color: "#19194d" }}>
        {/* check for accessToken and data */}
        {accessToken, organization ?
          <div>
            <Button css={{ float: "right", width: '10%' }} onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}>Clear token & Logout</Button>
            <h1>{TITLE}</h1>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="url">
                Enter your  <b>username/repo</b> for https://github.com/
                </label>
              <Input
                id="url"
                type="text"
                value={path}
                onChange={this.onChange}
                style={{ width: '300px' }}
              />
              <span>  </span>
              <Button css={{ width: '10%' }} type="submit">Search</Button>
            </form>
            <hr />
            <Organization organization={organization} errors={errors} />
          </div>
          : <div><Token /></div>}
      </div>
    );
  }
}

export default App;