import {useState} from 'react'


export default function Auth(props){
    const [showLogin, setShowLogin] = useState(true)
    const [formData, setFormdata] = useState({
        username: '',
        password: ''
    })
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            props.setUser(data.user)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            props.setUser(data.newUser)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <div>
            {
                showLogin?
                <section>
                    <h2 onClick={() => setShowLogin(!showLogin)}>Login <small>click to switch to signup</small></h2>
                    <form>
                        <input type="text" name="username" placeholder="Add Username" />
                        <input type="password" name="password" placeholder="Add Password" />
                        <input type="submit" value="Log Me In" />
                    </form>
                </section>:
                 <section>
                 <h2 onClick={() => setShowLogin(!showLogin)}>SignUp <small>click to switch to login</small></h2>
                 <form>
                     <input type="text" name="username" placeholder="Add Username" />
                     <input type="password" name="password" placeholder="Add Password" />
                     <input type="submit" value="Sign Me Up"/>
                 </form>
             </section>
            }        
        </div>
    )
}