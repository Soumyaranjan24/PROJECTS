from flask import Flask, request, render_template
import datetime

app = Flask(__name__)

def log_attempt(ip, email, password, message):
    with open("honeypot_log.txt", "a") as log:
        log.write(f"Time: {datetime.datetime.now()}\n")
        log.write(f"IP Address: {ip}\n")
        log.write(f"Email Provided: {email}\n")
        log.write(f"Password Provided: {password}\n")  # New log entry
        log.write(f"Message: {message}\n")
        log.write("-" * 50 + "\n")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    email = request.form['email']
    password = request.form['password']  # Collect the password from form
    message = request.form['message']
    ip = request.remote_addr

    log_attempt(ip, email, password, message)
    return "Thank you! We will contact you soon."

if __name__ == "__main__":
    app.run(debug=True)
