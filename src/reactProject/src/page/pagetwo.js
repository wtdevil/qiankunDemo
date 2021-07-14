import React from 'react'
import { useHistory } from 'react-router-dom'

const PageTwo = () => {
    const history = useHistory()
    const linkTo = () => {
        history.push({pathname: '/PageOne'})
    }
    return <>
        React子应用2子页面2
        <button onClick={() => linkTo()}>跳转到子应用2子页面1</button>
    </>
}

export default PageTwo