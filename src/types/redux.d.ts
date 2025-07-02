import FMReduxStore from 'models/FMReduxStore';

declare module 'redux' {
  interface Store {
    /** Returns current state of the application. */
    getState(): FMReduxStore;
  }
}

declare module 'react-redux' {
  interface DefaultRootState extends FMReduxStore { }
}
