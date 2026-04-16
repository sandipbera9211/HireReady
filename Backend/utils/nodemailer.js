import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})


export const sendInterviewBookingMail = async ({ toEmail, userName, difficulty, questionTypes }) => {
  const mailOptions = {
    from: `"Mock Interview" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "🎉 Interview Booked — Here's What Happens Next",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">You're All Set! 🎉</h1>
          <p style="color: #ddd6fe; margin: 8px 0 0; font-size: 14px;">Your 1:1 Mock Interview is Confirmed</p>
        </div>

        <!-- Welcome -->
        <div style="padding: 28px 24px 0;">
          <p style="font-size: 15px; color: #111827;">Hi <strong>${userName}</strong>,</p>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.7;">
            Welcome aboard! We're thrilled to have you book a <strong>1:1 Mock Interview</strong> with us. 
            This session is designed to help you build confidence, sharpen your answers, and walk into 
            your real interview fully prepared.
          </p>
        </div>

        <!-- Booking Details -->
        <div style="margin: 20px 24px; background: #f5f3ff; border-radius: 12px; padding: 20px;">
          <p style="font-size: 13px; color: #7c3aed; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Booking Details</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 7px 0; color: #6b7280;">👤 Role</td>
              <td style="padding: 7px 0; color: #111827; font-weight: 600;">${questionTypes}</td>
            </tr>
<p>Be ready when our team sends you the Google Meet link.</p>
            <tr>
              <td style="padding: 7px 0; color: #6b7280;">📍 Platform</td>
              <td style="padding: 7px 0; color: #111827; font-weight: 600;">Google Meet</td>
            </tr>
          </table>
        </div>

        <!-- Google Meet Notice -->
        <div style="margin: 0 24px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 8px; padding: 16px;">
          <p style="margin: 0; font-size: 14px; color: #065f46;">
            📹 <strong>The interview will be conducted on Google Meet.</strong><br/>
            <span style="color: #047857;">A meeting link will be sent to this email before the session. Make sure to join 2–3 minutes early.</span>
          </p>
        </div>

        <!-- Next Steps -->
        <div style="padding: 24px;">
          <p style="font-size: 13px; color: #7c3aed; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">What Happens Next</p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="min-width: 28px; height: 28px; background: #7c3aed; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; text-align:center; line-height:28px;">1</div>
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Confirmation Email</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">You'll receive a calendar invite with the Google Meet link within 24 hours.</p>
              </div>
            </div>


            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="min-width: 28px; height: 28px; background: #7c3aed; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; text-align:center; line-height:28px;">4</div>
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Get Your Feedback</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">After the session, a detailed feedback report with scores and improvement tips will be emailed to you.</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 13px; color: #9ca3af;">Need to reschedule? Contact us at least <strong>24 hours</strong> before the session.</p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #9ca3af;">© 2025 Mock Interview · All rights reserved</p>
        </div>

      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}