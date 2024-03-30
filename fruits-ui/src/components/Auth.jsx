import {useState} from 'react'


export default function Auth(props){
    const [showLogin, setShowLogin] = useState(true)
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