import React, { useState } from 'react';

// Create your functional component:
function AddUser() {
  // And now you can use hooks
  // But only inside your functional component's
  // body
  const [count, setCount] = useState(0);

  const CCC = () => setCount(count + 1)

 

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={CCC}>
        Click me
      </button>
    </div>
  );
}

export default AddUser