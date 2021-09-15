import React, { useState } from 'react'
import axios from 'axios';

const FormData = require('form-data');

export const Details = () => {

    const [data, setData] = useState({ name: "", email: "", password: "", image: "" })
    const onChange = e => setData({ ...data, [e.target.name]: e.target.value });
    const file = e => setData({ ...data, image: e.target.files })
    console.log(data);

    const [mainData, setMainData] = useState()
    const onSubmit = async e => {
        e.preventDefault()

        const { name, email, password, image } = data

        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', password)
        formData.append('image', image[0])


        const res = await axios.post("http://localhost:5000/details", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        setMainData(res.data)


    }

    return (
        <>
            <form enctype="multipart/form-data" onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                    <input type="name" className="form-control" placeholder="Name" name="name" onChange={e => onChange(e)} required />
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={e => onChange(e)} required />
                    <input type="phone" className="form-control" placeholder="Number" name="password" onChange={e => onChange(e)} required />
                    <input type="file" className="form-control-file" name="image" onChange={e => file(e)} required />


                    <input type="submit" value="Get me the stats!" className="btn btn-default" />
                </div>
            </form>
            {mainData ? <ul className="list-group list-group-horizontal">
                <li className="list-group-item">{mainData.name}</li>
                <li className="list-group-item">{mainData.email}</li>
                <li className="list-group-item">{mainData.phone}</li>
                <img className="list-group-item" style={{ "width": "10%" }} src={mainData.image} />
            </ul>
                : null
            }


        </>
    )
}
