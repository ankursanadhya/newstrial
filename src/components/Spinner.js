import React from 'react'
import loading from './loading.gif'

const Spinner = () =>{
// export class Spinner extends Component {  .....class based
    // render() {   .....class based
        return (
            <div className="text-center">
                <img className='my-4' src={loading} alt="loading" />
            </div>
        )
    // }
}

export default Spinner
