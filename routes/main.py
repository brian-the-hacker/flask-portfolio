from flask import Blueprint, request, jsonify
import os
import requests

main = Blueprint('main', __name__)

@main.route('/submit-contact', methods=['POST'])
def send_message():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        url = "https://api.brevo.com/v3/smtp/email"

        headers = {
            "accept": "application/json",
            "api-key": os.environ["BREVO_API_KEY"],
            "content-type": "application/json"
        }

        data = {
            "sender": {"email": os.environ["BREVO_SENDER"], "name": "Portfolio"},
            "to": [{"email": os.environ["BREVO_RECEIVER"]}],
            "subject": f"New Message from {name}",
            "textContent": f"""
Name: {name}
Email: {email}

Message:
{message}
"""
        }

        response = requests.post(url, json=data, headers=headers, timeout=10)

        if response.status_code in (200, 201):
            return jsonify({"status": "success"}), 200
        else:
            print(response.text)
            return jsonify({"status": "error"}), 500

    except Exception as e:
        print("BREVO ERROR:", e)
        return jsonify({"status": "error"}), 500