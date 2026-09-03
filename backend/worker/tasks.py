import asyncio
import sqlite3
import urllib.request
import json
from datetime import datetime
from arq.connections import RedisSettings
import os

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

    # 2. Send Email via Web3Forms API (Bypasses Render SMTP Firewall)
    WEB3FORMS_ACCESS_KEY = "d85e26f1-42cd-443b-bc59-a13488d6d78a"
    
    payload = {
        "access_key": WEB3FORMS_ACCESS_KEY,
        "name": name,
        "email": email,
        "message": message,
        "subject": f"Portfolio Contact from {name}"
    }
    
    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            "https://api.web3forms.com/submit", 
            data=data, 
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            print("Web3Forms email successfully delivered!")
    except Exception as e:
        print(f"Failed to send email via Web3Forms: {e}")
        
    return True

class WorkerSettings:
    functions = [send_contact_email]
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    redis_settings = RedisSettings.from_dsn(redis_url)
