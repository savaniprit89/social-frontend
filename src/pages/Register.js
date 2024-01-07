import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector,} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { register } from '../redux/actions/authAction';
function Register() {
 
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
  if(auth.token){
    navigate("/");
  }
  }, [auth.token,navigate])
  const initialState = { 
    fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
}
const [userData, setUserData] = useState(initialState)
const { fullname, username, email, password, cf_password } = userData

const [typePass, setTypePass] = useState(false)
const [typeCfPass, setTypeCfPass] = useState(false)


const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]:value})
}

const handleSubmit = e => {
    e.preventDefault()
    dispatch(register(userData))
}
 



 

   

    return (
      <div className="auth_page">
      <form onSubmit={handleSubmit}>
          <h3 className="text-uppercase text-center mb-4">V-Network</h3>

          <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" className="form-control" id="fullname" name="fullname"
              onChange={handleChangeInput} value={fullname}
              style={{background: `${notify.fullname ? '#fd2d6a14' : ''}`}} />
              
              <small className="form-text text-danger">
                  {notify.fullname ? notify.fullname : ''}
              </small>
          </div>

          <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input type="text" className="form-control" id="username" name="username"
              onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
              style={{background: `${notify?.username ? '#fd2d6a14' : ''}`}} />
              
              <small className="form-text text-danger">
                  {notify?.username ? notify?.username : ''}
              </small>
          </div>

          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name="email"
              onChange={handleChangeInput} value={email}
              style={{background: `${notify?.email ? '#fd2d6a14' : ''}`}} />
              
              <small className="form-text text-danger">
                  {notify?.email ? notify?.email : ''}
              </small>
          </div>

          <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>

              <div className="pass">
                  
                  <input type={ typePass ? "text" : "password" } 
                  className="form-control" id="exampleInputPassword1"
                  onChange={handleChangeInput} value={password} name="password"
                  style={{background: `${notify?.password ? '#fd2d6a14' : ''}`}} />

                  <small onClick={() => setTypePass(!typePass)}>
                      {typePass ? 'Hide' : 'Show'}
                  </small>
              </div>

              <small className="form-text text-danger">
                  {notify?.password ? notify?.password : ''}
              </small>
          </div>

          <div className="form-group">
              <label htmlFor="cf_password">Confirm Password</label>

              <div className="pass">
                  
                  <input type={ typeCfPass ? "text" : "password" } 
                  className="form-control" id="cf_password"
                  onChange={handleChangeInput} value={cf_password} name="cf_password"
                  style={{background: `${notify?.cf_password ? '#fd2d6a14' : ''}`}} />

                  <small onClick={() => setTypeCfPass(!typeCfPass)}>
                      {typeCfPass ? 'Hide' : 'Show'}
                  </small>
              </div>

              <small className="form-text text-danger">
                  {notify?.cf_password ? notify?.cf_password : ''}
              </small>
          </div>

          <div className="row justify-content-between mx-0 mb-1">
              <label htmlFor="male">
                  Male: <input type="radio" id="male" name="gender"
                  value="male" defaultChecked onChange={handleChangeInput} />
              </label>

              <label htmlFor="female">
                  Female: <input type="radio" id="female" name="gender"
                  value="female" onChange={handleChangeInput} />
              </label>

              <label htmlFor="other">
                  Other: <input type="radio" id="other" name="gender"
                  value="other" onChange={handleChangeInput} />
              </label>
          </div>
          
          <button type="submit" className="btn btn-dark w-100">
              Register
          </button>

          <p className="my-2">
              Already have an account? <Link to="/" style={{color: "crimson"}}>Login Now</Link>
          </p>
      </form>
  </div>
    ) 

}

export default Register

/*

 "email":"p@gmail.com",
    "password":"123456",



    chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
*/