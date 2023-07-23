import { useState } from 'react'
 
export default function Commands({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      {children}
      {/* {count} */}
    </div>
  )
}