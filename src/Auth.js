import { useState } from 'react';
import { invitedUsers } from './invitedUsers';
import './SquidGameInvitation.css';

export default function Auth({ onLogin }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError('Введите имя и фамилию');
            return;
        }

        const invitedUser = invitedUsers.find(
            guest =>
                guest.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
                guest.lastName.toLowerCase() === formData.lastName.toLowerCase()
        );

        if (invitedUser) {
            onLogin(invitedUser); // Передаём найденного пользователя со всеми данными
        } else {
            setError('Вас нет в списке приглашённых');
        }
    };

    return (
        <div className="squid-game-container">
            <div className="auth-container">
                <div className='invitation-text'>
                <h2>Проверка приглашения</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label_input_Auth'>
                            Имя:
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className='label_input_Auth'>
                            Фамилия:
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className='red-button'>Проверить</button>
                </form>
                </div>
            </div>
        </div>
    );
}