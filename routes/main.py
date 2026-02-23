from flask import Blueprint, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create blueprint
main = Blueprint('main', __name__)

@main.route('/submit-contact', methods=['POST'])
def send_message():
    try:
        # Get form data
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        # Create email content
        body = f"""
        New message from your website:
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        """
        
        # Email configuration
        smtp_server = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('MAIL_PORT', 587))
        sender_email = os.getenv('MAIL_USERNAME')
        sender_password = os.getenv('MAIL_PASSWORD')
        recipient_email = os.getenv('MAIL_RECIPIENT', sender_email)
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"Website Contact: Message from {name}"
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        
        return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to send message. Please try again.'}), 500