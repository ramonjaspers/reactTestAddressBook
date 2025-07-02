declare const APP_SETTINGS: {
  envName: string;
  apiUrl: string;
  googleGtmId: string;
  googleGtmIdWhiteLabel: string;
  googleOptimiseId: string;
  sentryDSN: string;
  sentrySampleRate: string;
};

interface Window {
  App: any;
  ga: any;
  dataLayer: any[];
  google_tag_manager: any;
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

interface Document {
  documentMode: any;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

type Time = {
  seconds: number; // Number of seconds remaining (can be negative).
  time: string; // A value like "2019-03-31T12:53:34" (UTC).
  title: string; // A value like "14:10" or "2:10 PM" if the given time is somewhere today. A value like "Friday 14:10" or "Friday 2:10 PM" if the given time is somewhere in the next 6 days. A value like "Friday 29 August" otherwise.
};

type List = {
  [key: string]: string[];
};
