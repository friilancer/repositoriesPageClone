import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from} from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error'
import './App.css';
import Nav from './components/nav/nav';
import SecondaryNav from './components/nav/secondary_nav';
import Main from './components/main/main';
import Footer from './components/footer/footer';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if(graphQLErrors){
    graphQLErrors.map(({message}) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const httpLink  = createHttpLink({
  uri: `https://api.github.com/graphql`
})

const authHeader = setContext((_, {headers}) => ({
  headers: {
    ...headers,
    "authorization": `Bearer ${process.env.REACT_APP_GIT_PUBLIC_KEY}`
  }
}))
const link =  from([
  errorLink,
  authHeader.concat(httpLink)
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})


function App() {
  return (
    <ApolloProvider client={client}>
        <Nav />
        <SecondaryNav display={'display_lg'}/>
        <Main />
        <Footer />
    </ApolloProvider>
  );
}

export default App;
