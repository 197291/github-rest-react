import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import api from 'api/api';
const devToolsExtension = 'devToolsExtension';

const devtools = window[devToolsExtension] ? window[devToolsExtension]() : (f) => f;
const middleware = applyMiddleware(thunk.withExtraArgument(api));
const store =  middleware(devtools(createStore))(reducer);

api.store = store;

export default store;
