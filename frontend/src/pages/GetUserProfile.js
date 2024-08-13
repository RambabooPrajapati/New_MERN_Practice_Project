import { useState } from 'react';
import './profile.css';

const GetUserProfile = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("")

    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/get-user-profile", {
                credentials: 'include' // Ensure this is included
            });
console.log("------res-------", response)
            if (response.status !== 200) {
                console.log("Something went wrong while fetching user data");
                return;
            }

            const result = await response.json();
            setMessage(result.message)
            console.log("User data:", result);
            setData([result.user]); // Correctly setting the user data in the state
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    const handleGetData = () => {
        getUserData();
    };

    console.log("data-----", data);


    return (
        <div className='proContainer'>
            <div className='childContainer'>
                <h2>User Profile</h2>
                <div className='buttons'>
                    <button onClick={handleGetData}>profile</button>
                    <button>update</button>
                    <button>delete</button>
                </div>
                <div>
                    {data.length > 0 ? data.map((user) => (<ul>
                        <li>Username: {user.username}</li>
                        <li>Email: {user.email}</li>
                    </ul>)) : <h3>{message}</h3>}
                </div>

            </div>
        </div>
    )
}

export default GetUserProfile
