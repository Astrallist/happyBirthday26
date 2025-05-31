import { useState, useEffect } from 'react';
import Auth from './Auth';
import RSVP from './RSVP';
import { invitedUsers } from './invitedUsers';
import './App.css';
import AnimatedBackground from './AnimatedBackground';
import Info from './Info';
import './SquidGameInvitation.css';

function App() {
  const [user, setUser] = useState(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [hasDeclined, setHasDeclined] = useState(false);

  useEffect(() => {
    // Проверяем сохранённые данные при загрузке
    const savedUser = localStorage.getItem('eventGuest');
    const savedResponse = localStorage.getItem('eventResponse');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedResponse === 'confirmed') setHasConfirmed(true);
      if (savedResponse === 'declined') setHasDeclined(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('eventGuest', JSON.stringify(userData));
  };

  const handleConfirm = () => {
    setHasConfirmed(true);
    localStorage.setItem('eventResponse', 'confirmed');
  };

  const handleDecline = () => {
    setHasDeclined(true);
    localStorage.setItem('eventResponse', 'declined');
    setTimeout(() => {
      handleLogout();
    }, 3000);
  };

  const handleLogout = () => {
    setUser(null);
    setHasConfirmed(false);
    setHasDeclined(false);
    localStorage.removeItem('eventGuest');
    localStorage.removeItem('eventResponse');
  };

  return (
    <div className="App">
      <AnimatedBackground />
      {user ? (
        hasConfirmed ? (
            <div className="squid-game-container">
                <div className='invitation-text'>
            <h1>Ты в игре,<h2>{user.firstName}</h2></h1>
            <div className='game-symbols'/>
            <div className="event-details">
              <h2>Детали мероприятия:</h2>
              <p><strong>Дата:</strong> 21 июня 2025</p>
              <p><strong>Время:</strong> 12:00 - 18:00</p>
              <p><strong>Место:</strong> 50й участок, СНТ Родник, Ступинский район, Московская область</p>
              <p><strong>Дресс-код:</strong> Гаваи, можно купальник.</p>
              <p></p>
              <p>Программа расчитана на 2-3 часа, что-то инетерсное для именнинника приветсвтуется.</p>
            </div>
            <button className='black-button' onClick={handleLogout}>Выйти</button>
          </div>
          </div>
        ) : hasDeclined ? (
          <div className="declined-message">
            <h2>Очень жаль, что вы не сможете присоединиться, {user.firstName}.</h2>
            <p>Вы будете перенаправлены через 3 секунды...</p>
          </div>
        ) : (
          <RSVP 
            user={user} 
            onConfirm={handleConfirm} 
            onDecline={handleDecline} 
          />
        )
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;