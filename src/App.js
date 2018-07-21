import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import GithubCorner from "react-github-corner";
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: `https://w5xlvm3vzz.lp.gql.zone/graphql`
});

// Fetch GraphQL data with a Query component
const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

    return (<div style={{ margin: 'auto', width: '300px' }}>
    <table style={{ width: '100%' }}>
    <tbody>
    {
      data.rates.map(({ currency, rate }) => (
        <tr key={currency}>
          <td>{currency}</td>
          <td>{rate}</td>
        </tr>
      ))
    }
    </tbody>
    </table>
    </div>);
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Apollo <span role="img" aria-label="space ship">🚀</span></h2>
        <h4>Exchanges Rates</h4>
      </div>
      <ExchangeRates />
      <GithubCorner
        href={'https://github.com/jbastias/graphql-apollo-example'}
        bannerColor="#70B7FD"
        octoColor="#fff"
        size={80}
        direction="right"
      />
    </div>
  </ApolloProvider>
);

export default App;