import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from '../components/AppLayout';
// import { wrapper } from '../redux/index';
import { Provider } from 'react-redux';
import store from "../redux/index";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

// export default wrapper.withRedux(App);
export default App;
