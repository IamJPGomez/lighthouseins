import os
import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
from zoneinfo import ZoneInfo
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env', override=False)

router = APIRouter()

# Configuration
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "luis@lhinsur.com")
FROM_EMAIL = os.environ.get("FROM_EMAIL", "noreply@contact.lighthouseinsgroup.com")
EST_TIMEZONE = ZoneInfo("America/New_York")


class QuoteRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    insuranceType: str
    message: str = ""


def get_insurance_type_label(insurance_type: str) -> str:
    """Convert insurance type value to readable label"""
    labels = {
        "personal-auto": "Personal Auto Insurance",
        "commercial-auto": "Commercial Auto Insurance",
        "homeowners": "Homeowners Insurance",
        "other": "Other"
    }
    return labels.get(insurance_type, insurance_type)


def get_first_name(full_name: str) -> str:
    """Extract first name from full name"""
    return full_name.split()[0] if full_name else "there"


@router.post("/contact/quote")
async def submit_quote_request(request: QuoteRequest):
    """Handle quote request form submission"""
    
    # Set API key at runtime
    resend.api_key = os.environ.get("RESEND_API_KEY")
    
    if not resend.api_key:
        raise HTTPException(status_code=500, detail="Email service not configured")
    
    try:
        first_name = get_first_name(request.name)
        insurance_label = get_insurance_type_label(request.insuranceType)
        timestamp = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        # Email 1: Notification to Lighthouse Insurance
        notification_html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
                <h1 style="color: #c9a227; margin: 0;">New Quote Request</h1>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
                <p style="color: #333; font-size: 16px;">You've received a new quote request from the website.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #1e3a5f;">Name:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{request.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #1e3a5f;">Email:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:{request.email}">{request.email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #1e3a5f;">Phone:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="tel:{request.phone}">{request.phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #1e3a5f;">Insurance Type:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{insurance_label}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #1e3a5f;">Message:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{request.message or "No additional message provided"}</td>
                    </tr>
                </table>
                
                <p style="color: #666; font-size: 14px;">Submitted on {timestamp}</p>
            </div>
            <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
                <p style="color: #fff; margin: 0; font-size: 12px;">Lighthouse Insurance Agency</p>
            </div>
        </div>
        """
        
        # Email 2: Confirmation to the prospect
        confirmation_html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
                <h1 style="color: #c9a227; margin: 0;">Lighthouse Insurance</h1>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
                <p style="color: #333; font-size: 16px;">Hi {first_name},</p>
                
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                    Thank you for reaching out to Lighthouse Insurance! We've received your request for a quote and we're excited to help you find the right coverage.
                </p>
                
                <p style="color: #333; font-size: 16px; font-weight: bold;">Here's what happens next:</p>
                
                <ul style="color: #333; font-size: 16px; line-height: 1.8;">
                    <li>We'll review the information you provided</li>
                    <li>Someone from our team will call you during the same business day to discuss your specific needs</li>
                    <li>We'll work together to provide you with customized quote options that fit your situation</li>
                </ul>
                
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                    If you'd like to speak with us right away, feel free to give us a call at <a href="tel:9545843417" style="color: #c9a227; font-weight: bold;">(954) 584-3417</a>.
                </p>
                
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                    We're looking forward to connecting with you soon and helping you protect what matters most.
                </p>
                
                <p style="color: #333; font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>Luis Garcia and the Lighthouse Insurance Team</strong>
                </p>
            </div>
            <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
                <p style="color: #fff; margin: 0; font-size: 12px;">
                    Lighthouse Insurance Agency<br>
                    10242 NW 47th St Suite 10, Sunrise, FL 33331<br>
                    (954) 584-3417 | luis@lhinsur.com
                </p>
            </div>
        </div>
        """
        
        # Send notification email to Lighthouse Insurance
        notification_params = {
            "from": f"Lighthouse Insurance <{FROM_EMAIL}>",
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Quote Request from {request.name}",
            "html": notification_html,
            "reply_to": request.email
        }
        resend.Emails.send(notification_params)
        
        # Send confirmation email to the prospect
        confirmation_params = {
            "from": f"Lighthouse Insurance <{FROM_EMAIL}>",
            "to": [request.email],
            "subject": "We've received your quote request!",
            "html": confirmation_html
        }
        resend.Emails.send(confirmation_params)
        
        return {"success": True, "message": "Quote request submitted successfully"}
        
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
