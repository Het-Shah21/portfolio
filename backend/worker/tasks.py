import asyncio
import sqlite3
import smtplib
from datetime import datetime
from email.message import EmailMessage
from arq.connections import RedisSettings

def save_to_db(name: str, email: str, message: str):
    conn = sqlite3.connect('contacts.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS messages
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  name TEXT,
                  email TEXT,
                  message TEXT)''')
    c.execute("INSERT INTO messages (date, name, email, message) VALUES (?, ?, ?, ?)",
              (datetime.now().isoformat(), name, email, message))
    conn.commit()
    conn.close()

async def send_contact_email(ctx, name: str, email: str, message: str):
    print(f"Processing message from {name}...")
    
    # 1. Save to SQLite Database (Permanent Record)
    save_to_db(name, email, message)
    print("Message securely saved to contacts.db")

    # 2. Send Real Email Notification (Instant Alert)
    SENDER_EMAIL = "hetshahclg@gmail.com"
    APP_PASSWORD = "hhup znva wuaz lhqt"
    RECEIVER_EMAIL = "hetshahclg@gmail.com"

    msg = EmailMessage()
    msg.set_content(f"New Portfolio Submission:\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}")
    msg['Subject'] = f"Portfolio Contact from {name}"
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    
    try:
        # Connect to Gmail's SMTP server and send the email
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(SENDER_EMAIL, APP_PASSWORD)
        server.send_message(msg)
        server.quit()
        print("Email notification successfully processed.")
    except Exception as e:
        print(f"Failed to send email: {e}")
        
    return True

class WorkerSettings:
    functions = [send_contact_email]
    redis_settings = RedisSettings(host='localhost', port=6379)
