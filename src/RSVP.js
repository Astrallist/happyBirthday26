import { useState } from 'react';
import './SquidGameInvitation.css';

export default function RSVP({ user, onConfirm, onDecline }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleConfirm = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formsubmit.co/el/gomibo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _subject: 'Новое подтверждение участия',
                    name: `${user.firstName} ${user.lastName}`,
                    message: `${user.firstName} подтвердил(а) участие в вашем мероприятии!`,
                    _captcha: 'false' // Отключает капчу (по желанию)
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                onConfirm();
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Ошибка:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDecline = () => {
        setIsSubmitting(true);
        onDecline();
    };

    return (
        <div className="squid-game-container">
            <div className="game-symbols">
            </div>

            {/*<h1 className="invitation-title">
        ВЫ ПРИГЛАШЕНЫ НА ИГРУ
      </h1>*/}

            <div className="invitation-text">
                <h2>
                    {user.sex === 'мужской' ? "Дорогой" : "Дорогая"} {user.firstName} {user.lastName},
                </h2>
                <p>Приглашаю тебя на свой 26й день рождения, который состоятся 21 июня 2025 года в Подмосковье (до 2х часов от Павелецкого вокзала, или 70км от Мск).</p>
                <p>Официальная часть с 12 до 18, это отличное время чтобы добраться домой до наступления ночи,  а утром успеть выспаться.
                    Около дома есть место , где ты можешь припарковать свой автомобиль.
                </p>

            </div>

            <div className="confirmation-buttons">
                <button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="red-button"
                >
                    Подтверждаю участие
                </button>

                <button
                    onClick={handleDecline}
                    disabled={isSubmitting}
                    className="black-button"
                >
                    Отклоняю (рискованно)
                </button>
            </div>
            {submitStatus === 'success' && (
                <div className="email-status success">
                    Уведомление отправлено организатору!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="email-status error">
                    Ошибка отправки, но ответ сохранён
                </div>
            )}
        </div>
    );
}