import { useState } from "react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { User } from "./user";

export const AddUsers = memo(() => {
    const { register, handleSubmit, reset } = useForm();
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [list, setList] = useState([]);
    const [updateUserId, setUpdateUserId] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showSign, setShowSign] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [inputLogin1, setLogin1] = useState('')
    const [inputLogin2, setLogin2] = useState('')

    const InputChange1 = (e) => {
        setInputValue1(e.target.value);
    };

    const InputChange2 = (e) => {
        setInputValue2(e.target.value);
    };

    const InputChange3 = (e) => {
        setInputValue3(e.target.value);
    };

	const loginChange1 = (e) => {
        setLogin1(e.target.value);
	}

	const loginChange2 = (e) => {
		setLogin2(e.target.value);
	}

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const buttonClick = () => {
        if (!inputValue1 || !inputValue2 || !inputValue3) {
            alert("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(inputValue2)) {
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
                            title2: inputValue2,
                            title3: inputValue3,
                        }
                        : user
                )
            );

            setUpdateUserId(null);
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
            setShowList(false);
        } else {
            const newUser = {
                title1: inputValue1,
                title2: inputValue2,
                title3: inputValue3,
                id: list.length + 1,
            };

            setList((prevList) => [...prevList, newUser]);
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
        }
    };

	const updateUser = (id) => {
        alert("to update user go back in sign up")
		const userToUpdate = list.find((item) => item.id === id);
		if (userToUpdate) {
			setInputValue1(userToUpdate.title1);
			setInputValue2(userToUpdate.title2);
			setInputValue3(userToUpdate.title3);
			setUpdateUserId(id);
		}
	};

    const deleteUser = (id) => {
        const userIndex = list.findIndex((item) => item.id === id);

        if (userIndex !== -1) {
            const updatedList = [...list.slice(0, userIndex), ...list.slice(userIndex + 1)];
            setList(updatedList);
        }
    };

    const handleCheckboxChange = () => {
        setShowLogin(!showLogin);
    };

    const handleFormSubmit = (data) => {
        const { title1, title2, title3 } = data;

        if (!title1 || !title2 || !title3) {
            alert("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(title2)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (updateUserId) {
            setList((prevList) =>
                prevList.map((user) =>
                    user.id === updateUserId
                        ? {
                            ...user,
                            title1,
                            title2,
                            title3,
                        }
                        : user
                )
            );

            setUpdateUserId(null);
            reset();
        } else {
            const newUser = {
                title1,
                title2,
                title3,
                id: list.length + 1,
            };

            setList((prevList) => [...prevList, newUser]);
            reset();
        }
    };


    const loginButton = () => {
        if (!inputLogin1 || !inputLogin2) {
            alert("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(inputLogin1)) {
            alert("Please enter a valid email address.");
            return;
        }

        const loggedInUser = list.find(user => user.title2 === inputLogin1 && user.title3 === inputLogin2);
    
        if (loggedInUser) {
            setIsLoggedIn(true);
        } else {
            alert("Invalid credentials. Please check your email and password.");
        }
    };


	console.log(list)

    return (
        <>
            {showSign && (
				<div className="Bigconteiner">
					<div className="main">
						<input type="checkbox" id="chk" aria-hidden="true" onChange={handleCheckboxChange} />

						<div className="signup">
							<form className="input-button" onSubmit={handleSubmit(handleFormSubmit)}>
								<label htmlFor="chk" aria-hidden="true">Sign up / Login</label>
								<input
									{...register("title1", { required: true, maxLength: 15 })}
									type="text"
									placeholder="First Name"
									value={inputValue1}
									onChange={InputChange1}
								/>
								<input
									{...register("title2", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
									type="email"
									placeholder="Email"
									value={inputValue2}
									onChange={InputChange2}
								/>
								<input 
									{...register("title3", { required: true })}
									type="password" 
									name="txt" 
									placeholder="Password" 
									value={inputValue3}
									required 
									onChange={InputChange3}
								/>
								<button onClick={buttonClick} type="submit">ADD</button>
								<button onClick={() => { setShowList(true); setShowSign(false); }}>Show List</button>
							</form>
						</div>

						<div className={`login ${showLogin ? 'slide-in' : ''}`}>
							<form onSubmit={handleSubmit()}>
								<label htmlFor="chk" aria-hidden="true" className="login-label">Login</label>
								<input type="email" name="email" placeholder="Email" required onChange={loginChange1}/>
								<input type="password" name="txt" placeholder="Password" required onChange={loginChange2}/>
								<button onClick={loginButton} type="submit">Login</button>
							</form>
						</div>
					</div>
				</div>
            )}

            {showList && (
                <div className="container">
                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Employee First Name</th>
                                    <th>Employee Email Id</th>
                                    <th>Employee Password</th>
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
							<button className="buttonList" onClick={() => { setShowList(false); setShowSign(true); }}>Show List</button>
                        </table>
                    </div>
                </div>
            )}

            {isLoggedIn && <User />}
            {/* chi ashxadi */}
        </>
    );
});


