import React from 'react'
import { useHistory } from 'react-router-dom'

const PageOne = () => {
    const history = useHistory()
    const linkTo = () => {
        history.push({ pathname: '/PageTwo' })
    }
    return <>
        React子应用2子页面1
        <button onClick={() => linkTo()}>跳转到子应用2子页面2</button>
    </>
}

export default PageOne