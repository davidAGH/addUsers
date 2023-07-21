import { useState } from "react";

export function AddUsers() {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [list, setList] = useState([]);
    const [updateUserId, setUpdateUserId] = useState(null);
    const [viewedUser, setViewedUser] = useState(null);

    const InputChange1 = (e) => {
        setInputValue1(e.target.value);
    };

    const InputChange2 = (e) => {
        setInputValue2(e.target.value);
    };

    const InputChange3 = (e) => {
        setInputValue3(e.target.value);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const buttonClick = () => {
        if (!inputValue1 || !inputValue2 || !inputValue3) {
            alert("Please fill in all fields.");
            return;
        }
      
        if (!isValidEmail(inputValue3)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (updateUserId) {
            setList((prevList) =>
                prevList.map((user) =>
                    user.id === updateUserId
                        ? {
                            ...user,
                            title1: inputValue1,
                            title2: inputValue2
                        }
                        : user
                )
            );

            setUpdateUserId(null);
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
        } else {
            setList((prevList) => [
                ...prevList,
                {
                    title1: inputValue1,
                    title2: inputValue2,
                    title3: inputValue3,
                    id: prevList.length + 1
                }
            ]);
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
        }
    };

    const updateUser = (id) => {
        const userToUpdate = list.find((item) => item.id === id);
        if (userToUpdate) {
            setInputValue1(userToUpdate.title1);
            setInputValue2(userToUpdate.title2);
            setInputValue3(userToUpdate.title3);
            setUpdateUserId(id);
        }
    }

    const deleteUser = (id) => {
        const userIndex = list.findIndex((item) => item.id === id);

        if (userIndex !== -1) {
            const updatedList = [...list.slice(0, userIndex), ...list.slice(userIndex + 1)];
            setList(updatedList);
        }
    }

    const viewUser = (id) => {
        const userToView = list.find((item) => item.id === id);
        if (userToView) {
            setViewedUser(userToView);
        }
    }

    return (
        <div className="container">
            <div className="input-button">
                <input
                    type="text"
                    placeholder="First Name"
                    value={inputValue1}
                    onChange={InputChange1}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={inputValue2}
                    onChange={InputChange2}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={inputValue3}
                    onChange={InputChange3}
                />
                <button onClick={buttonClick}>ADD</button>
            </div>
            <div className="table-content">
                <table>
                    <thead>
                    <tr>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title1}</td>
                                <td>{item.title2}</td>
                                <td>{item.title3}</td>
                                <td>
                                    <button className="update" onClick={() => updateUser(item.id)}>Update</button>
                                    <button className="delete" onClick={() => deleteUser(item.id)}>Delete</button>
                                    <button className="view" onClick={() => viewUser(item.id)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewedUser && (
                <div className="user-details">
                    <h2>User View</h2>
                    <p>Name: {viewedUser.title1}</p>
                    <p>Last Name: {viewedUser.title2}</p>
                    <p>Email: {viewedUser.title3}</p>
                    <button onClick={() => setViewedUser(null)}>Close</button>
                </div>
            )}
        </div>
    );
}
