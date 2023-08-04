import { useState } from "react";
import PropTypes from 'prop-types'
import { memo } from "react";
import { useForm } from "react-hook-form";

export const AddUsers = memo(() => {
    const { register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);


    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
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

    const InputChange4 = (e) => {
        setInputValue4(e.target.value);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const buttonClick = () => {
        if (!inputValue1 || !inputValue2 || !inputValue3 || !inputValue4) {
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
            setInputValue4('');
        } else {
            setList((prevList) => [
                ...prevList,
                {
                    title1: inputValue1,
                    title2: inputValue2,
                    title3: inputValue3,
                    title4: inputValue4,
                    id: prevList.length + 1
                }
            ]);
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
            setInputValue4('');
        }
    };

    const updateUser = (id) => {
        const userToUpdate = list.find((item) => item.id === id);
        if (userToUpdate) {
            setInputValue1(userToUpdate.title1);
            setInputValue2(userToUpdate.title2);
            setInputValue3(userToUpdate.title3);
            setInputValue4(userToUpdate.title4);
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
        <>
            <div className="container">
                <form className="input-button" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("title1", { required: true, maxLength: 15 })}
                        type="text"
                        placeholder="First Name"
                        value={inputValue1}
                        onChange={InputChange1}
                    />
                    <input
                        {...register("title2", { required: true, maxLength: 15 })}
                        type="text"
                        placeholder="Last Name"
                        value={inputValue2}
                        onChange={InputChange2}
                    />
                    <input
                        {...register("title3", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                        type="email"
                        placeholder="Email"
                        value={inputValue3}
                        onChange={InputChange3}
                    />
                    <input
                        {...register("title4", { required: true, maxLength: 2 })}
                        type="number"
                        placeholder="Age"
                        value={inputValue4}
                        onChange={InputChange4}
                    />
                    <button onClick={buttonClick} type="submit">ADD</button>
                </form>
                <div className="table-content">
                    <table>
                        <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Employee Age</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {list.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title1}</td>
                                    <td>{item.title2}</td>
                                    <td>{item.title3}</td>
                                    <td>{item.title4}</td>
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
                        <p>Age: {viewedUser.title4}</p>
                        <button onClick={() => setViewedUser(null)}>Close</button>
                    </div>
                )}
            </div>
        </>
    );
})

AddUsers.propTypes = {
    inputValue1: PropTypes.number.isRequired,
    inputValue2: PropTypes.string.isRequired,
    inputValue3: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    updateUserId: PropTypes.number,
    viewedUser: PropTypes.shape({
        title1: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        title3: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }),
    InputChange1: PropTypes.func.isRequired,
    InputChange2: PropTypes.func.isRequired,
    InputChange3: PropTypes.func.isRequired,
    isValidEmail: PropTypes.func.isRequired,
    buttonClick: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    viewUser: PropTypes.func.isRequired,
};