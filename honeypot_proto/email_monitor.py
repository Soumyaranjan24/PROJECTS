import imaplib
import email
import time
import datetime

# Email credentials
EMAIL = "fakecontact.project@gmail.com"
PASSWORD = "Fake_6569"   # Don't share in public! Use env variables in real apps.

# Connect to Gmail IMAP
def check_inbox():
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL, PASSWORD)
    mail.select("inbox")

    result, data = mail.search(None, "ALL")
    mail_ids = data[0].split()

    for num in mail_ids:
        result, msg_data = mail.fetch(num, '(RFC822)')
        raw_email = msg_data[0][1]
        msg = email.message_from_bytes(raw_email)

        subject = msg["subject"]
        from_ = msg["from"]
        date = msg["date"]

        log_email(from_, subject, date)

    mail.logout()

def log_email(sender, subject, date):
    with open("email_honeypot_log.txt", "a") as f:
        f.write(f"Time Checked: {datetime.datetime.now()}\n")
        f.write(f"From: {sender}\n")
        f.write(f"Subject: {subject}\n")
        f.write(f"Date: {date}\n")
        f.write("-" * 50 + "\n")

if __name__ == "__main__":
    while True:
        print("Checking inbox...")
        check_inbox()
        time.sleep(60)  # Check every 1 minute
