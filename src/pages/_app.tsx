// import React from 'react';
// import App from 'next/app';
// import "@/styles/globals.css";
// class MyApp extends App {
//   componentDidMount() {
//     const googleMapsScript = document.createElement('script');
//     googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}&libraries=places`;
//     googleMapsScript.async = true;
//     window.document.body.appendChild(googleMapsScript);
//   }

//   render() {
//     const { Component, pageProps } = this.props;
//     return <Component {...pageProps} />;
//   }
// }

// export default MyApp;


import React from 'react';
import App from 'next/app';
import "@/styles/globals.css";
class MyApp extends App {
  componentDidMount() {
    if (!window.google) {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}&libraries=places`;
      googleMapsScript.async = true;
      window.document.body.appendChild(googleMapsScript);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
