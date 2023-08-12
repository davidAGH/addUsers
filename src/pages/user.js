

export const User = ({ user }) => {
    if (!user) {
        return <p>Пользователь не найден.</p>;
    }

    return (
        <div className="user-info">
            <h2>Информация о пользователе</h2>
            <p>Имя: {user.title1}</p>
            <p>Электронная почта: {user.title2}</p>
            <p>Пароль: {user.title3}</p>
        </div>
    );
};
