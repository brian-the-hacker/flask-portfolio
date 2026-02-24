from flask import Blueprint, request, jsonify
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

main = Blueprint('main', __name__)

@main.route('/submit-contact', methods=['POST'])
def send_message():
    try:
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # Environment variables (from Render dashboard)
        smtp_server = os.environ.get("MAIL_SERVER")
        smtp_port = int(os.environ.get("MAIL_PORT", 587))
        sender_email = os.environ.get("MAIL_USERNAME")
        sender_password = os.environ.get("MAIL_PASSWORD")
        recipient_email = os.environ.get("MAIL_RECIPIENT", sender_email)

        # Create email body
        body = f"""
New message from your website:

Name: {name}
Email: {email}

Message:
{message}
"""

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg["Subject"] = f"Website Contact: Message from {name}"
        msg.attach(MIMEText(body, "plain"))

        # 🔴 THIS PART FIXES RENDER TIMEOUT
        context = ssl.create_default_context()

        server = smtplib.SMTP(smtp_server, smtp_port, timeout=30)
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()

        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()

        return jsonify({"status": "success"}), 200

    except Exception as e:
        print("EMAIL ERROR:", str(e))
        return jsonify({"status": "error"}), 500