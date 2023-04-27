import React, { Fragment, useEffect } from 'react';
export default function Page(props) {

  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
}
;
