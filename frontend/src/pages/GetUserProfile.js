import React from 'react'

const GetUserProfile = ({ setData, data }) => {

    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/get-user-profile", {
                credentials: 'include' // Ensure this is included
            });

            if (response.status !== 200) {
                console.log("Something went wrong while fetching user data");
                return;
            }

            const result = await response.json();
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
        <div>
            <div className='userProfile'>
                <h2 className="buttons">
                    <div className='profile'>User Profile</div>
                    <div>
                        <button onClick={handleGetData}>Profile </button>
                        <button> Update </button>
                        <button>Delete</button>
                    </div>
                    <hr className='herColor'/>
                </h2>
                <div className='displayData'>
                    {data.length > 0 ?
                        data.map(item => (
                            <ul key={item._id}>
                                <li>UserName: {item.username}</li>
                                <li>Email: {item.email}</li>
                            </ul>
                        )) : <h3 style={{ color: "red" }}>Not available user information</h3>
                    }

                </div>
            </div>
        </div>
    )
}

export default GetUserProfile
