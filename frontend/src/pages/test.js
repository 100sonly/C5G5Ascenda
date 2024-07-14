import { useState, Component, useEffect } from "react";
import React from "react";

const Test = () => {
    const [desc, setDesc] = useState("");

    async function testGet() {
        const req = await fetch("http://localhost:3000/hotels/hotel/rqRC");
        const txt = await req.text();
        const json = JSON.parse(txt);
        setDesc(json.description);
    }

    useEffect( () => {
        // TODO: fixme:
        testGet()
    }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'centre',
        alignItems: 'centre',
        height: '100vh'
      }}
    >
      <h1>This is a test page</h1>
      <div dangerouslySetInnerHTML={{__html: desc}} />
    </div>
  );
};

export default Test;
